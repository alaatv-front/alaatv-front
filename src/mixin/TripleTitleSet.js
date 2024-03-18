import { User } from 'src/models/User.js'
import { Event } from 'src/models/Event.js'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'

const mixinTripleTitleSet = {
  data () {
    return {
      sample: ['z', 'a / b / c', 'a / b / d / g', 'a / c / f', 'b / c / d', 'b / f / g', 'b / n / g', 'c / d / f', 'q / e / w', 'q / e / s', 'q / a / v', 'q / a / s', 'q / e / r', 'c / g'],
      mounted: false,
      user: new User(),
      event: new Event(),
      isUserLogin: false,
      isVideoWatched: false
    }
  },
  mounted () {
    this.mounted = true
    this.updateLeftDrawer()
    this.$bus.on('onLoggedIn', () => {
      this.$store.commit('AppLayout/updateLoginDialog', false)
      this.setEvent()
    })
    this.loadAuthData()
    if (this.isUserLogin) {
      setTimeout(() => {
        this.setEvent()
      }, 500)
    }
  },
  methods: {
    buildTree (arr) {
      const root = { title: '', children: [] }

      arr.forEach(item => {
        const parts = item.split(' / ')
        let currentNode = root

        for (let i = 0; i < parts.length; i++) {
          const existingNode = currentNode.children.find(node => node.title === parts[i])

          if (existingNode) {
            currentNode = existingNode
          } else {
            const newNode = { title: parts[i], children: [] }
            currentNode.children.push(newNode)
            currentNode = newNode
          }
        }
      })

      return root.children
    },
    method () {
      this.sample.forEach(string => {
        if (string.includes(' / ')) {
          const splitted = string.split(' / ')
          const index = this.result.findIndex(obj => obj.title === splitted[0])
          if (index !== -1) {
            this.addToArray(this.result[index].children, 'title', splitted[1])
          } else {
            this.addToArray(this.result, 'title', splitted[0])
          }
        } else {
          this.addToArray(this.result, 'title', string)
        }
      })
    },
    addToArray (array, key, value) {
      array.push({
        [key]: value,
        children: []
      })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    afterSetEvent () {},
    setEvent () {
      if (!this.$route.params.eventName) {
        return
      }
      APIGateway.events.getEventInfoByName(this.$route.params.eventName)
        .then(event => {
          this.event = new Event(JSON.parse(JSON.stringify(event)))
          this.afterSetEvent()
        })
        .catch(() => {
          // this.$router.push({ name: 'NotFound' })
          this.$q.notify({
            type: 'negative',
            message: 'رویداد یافت نشد'
          })
          this.$router.push({ name: 'Public.Home' })
        })
    },
    syncwatchingContentWithContentInList () {
      const targetContentIndex = this.contents.list.indexOf(item => item.id === this.watchingContent.id)
      if (!targetContentIndex) {
        return false
      }

      this.contents.list[targetContentIndex] = new Content(this.watchingContent)
    },
    toggleFavor (value) {
      this.watchingContent.is_favored = value
    },
    videoIsWatched (secondsWatched) {
      return new Promise((resolve, reject) => {
        if (this.isVideoWatched) {
          resolve()
          return
        }

        this.isVideoWatched = true
        this.contentLoading = true
        this.watchingContent.loading = true
        const sendData = {
          completely_watched: 1,
          studyevent_id: this.event.id,
          watchable_id: this.watchingContent.id
        }

        if (secondsWatched) {
          sendData.seconds_watched = Math.floor(secondsWatched)
          sendData.completely_watched = 0
        }
        APIGateway.content.setVideoWatched(sendData)
          .then(() => {
            if (sendData.completely_watched) {
              this.isVideoWatched = true
              this.watchingContent.has_watched = true
              this.storeSelectedSet(this.$route.params.setId)
            }
            resolve()
          })
          .catch(() => {
            this.isVideoWatched = false
            reject()
          })
          .finally(() => {
            this.contentLoading = false
            this.watchingContent.loading = false
          })
      })
    },
    updateVideoStatus (data) {
      const hasWatch = data || this.watchingContent.has_watched
      hasWatch ? this.setVideoStatusToUnwatched() : this.videoIsWatched()
    },
    setVideoStatusToUnwatched () {
      this.watchingContent.loading = true
      APIGateway.content.setVideoUnWatched({
        watchable_id: this.watchingContent.id,
        watchable_type: 'content'
      })
        .then(() => {
          this.isVideoWatched = false
          this.watchingContent.has_watched = false
          this.storeSelectedSet(this.$route.params.setId)
        })
        .catch(() => {
        })
        .finally(() => {
          this.watchingContent.loading = false
        })
    },
    async setFavored () {
      try {
        await this.$apiGateway.content.favored(this.watchingContent.id)
        this.watchingContent.is_favored = true
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async setUnfavored () {
      try {
        await this.$apiGateway.content.unfavored(this.watchingContent.id)
        this.watchingContent.is_favored = false
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async updateComment (comment) {
      try {
        this.commentLoading = true
        const updateCommentResponse = await this.$apiGateway.content.updateComment({
          id: this.watchingContent.comments[0].id,
          data: {
            comment,
            _method: 'PUT'
          }
        })
        this.watchingContent.comments[0].comment = updateCommentResponse.comment
        this.comment = this.watchingContent.comments[0].comment
        this.commentLoading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.commentLoading = false
      }
    },
    async saveNewComment (comment) {
      try {
        this.commentLoading = true
        const savedComment = await this.$apiGateway.content.saveComment({
          commentable_id: this.watchingContent.id,
          commentable_type: 'content',
          comment
        })
        this.watchingContent.comments.push({
          id: savedComment.id,
          comment: savedComment.comment
        })
        this.comment = this.watchingContent.comments[0].comment
        this.commentLoading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.commentLoading = false
      }
    },
    saveComment (comment) {
      this.watchingContent.comments[0] ? this.updateComment(comment) : this.saveNewComment(comment)
    },
    async bookmarkPostIsFavored (timeStampData) {
      try {
        let postStatus = 'unfavored'
        if (timeStampData.isFavored) {
          postStatus = 'favored'
        }
        await this.$apiGateway.content.setBookmarkTimepointFavoredStatus({
          id: parseInt(timeStampData.id),
          status: postStatus
        })
        this.watchingContent.timepoints.list.forEach(item => {
          if (parseInt(item.id) === parseInt(timeStampData.id)) {
            item.loading = false
            if (postStatus === 'favored') {
              this.watchingContent.timepoints.list[timeStampData.numberOfTimestamp].isFavored = true
            } else if (postStatus === 'unfavored') {
              this.watchingContent.timepoints.list[timeStampData.numberOfTimestamp].isFavored = false
            }
          }
        })

        this.syncwatchingContentWithContentInList()
      } catch {
      }
    },
    updateLeftDrawer () {
      if (!this.mounted) {
        return
      }
      this.isDesktop = !this.$q.screen.lt.md
      const isIframe = window.self !== window.top
      if (this.$q.screen.gt.sm && !isIframe) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 100)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', true)
      } else {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 350)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
        if (this.isEwanoUser) {
          setTimeout(() => {
            this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 350)
            this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
          }, 10)
        }
      }
    }
  }
}

export default mixinTripleTitleSet
