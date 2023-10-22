import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'

const mixinTripleTitleSet = {
  data: () => {
    return {
      isVideoWatched: false,
      event: {
        id: null,
        logo: null,
        studyEventId: null
      }
    }
  },
  created() {
    this.setEvent()
  },
  mounted() {
    this.$bus.on('onLoggedIn', () => {
      this.$store.commit('AppLayout/updateLoginDialog', false)
      this.afterAuthenticate()
    })
  },
  methods: {
    afterAuthenticate () {
    },
    setEvent() {
      if (!this.$route.params.eventName) {
        return
      }
      APIGateway.events.getEventInfoByName(this.$route.params.eventName)
        .then(event => {
          this.event = JSON.parse(JSON.stringify(event))
        })
        .catch(() => {
          this.$router.push({ name: 'NotFound' })
        })
    },
    syncwatchingContentWithContentInList() {
      const targetContentIndex = this.contents.list.indexOf(item => item.id === this.watchingContent.id)
      if (!targetContentIndex) {
        return false
      }

      this.contents.list[targetContentIndex] = new Content(this.watchingContent)
    },
    toggleFavor(value) {
      this.watchingContent.is_favored = value
    },
    videoIsWatched(secondsWatched) {
      return new Promise((resolve, reject) => {
        if (!this.isVideoWatched) {
          this.isVideoWatched = true
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
              if (secondsWatched) {
                this.watchingContent.has_watched = true
                this.syncwatchingContentWithContentInList()
              }
              this.watchingContent.loading = false
              resolve()
            })
            .catch(() => {
              this.watchingContent.loading = false
              this.isVideoWatched = false
              reject()
            })
        } else {
          resolve()
        }
      })
    },
    updateVideoStatus(data) {
      const hasWatch = data || this.watchingContent.has_watched
      this.watchingContent.loading = true
      hasWatch ? this.setVideoStatusToUnwatched() : this.videoIsWatched()
    },
    async setVideoStatusToUnwatched() {
      try {
        await this.$apiGateway.content.setVideoUnWatched({
          watchable_id: this.watchingContent.id,
          watchable_type: 'content'
        })
        this.watchingContent.has_watched = false
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async setFavored() {
      try {
        await this.$apiGateway.content.favored(this.watchingContent.id)
        this.watchingContent.is_favored = true
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async setUnfavored() {
      try {
        await this.$apiGateway.content.unfavored(this.watchingContent.id)
        this.watchingContent.is_favored = false
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async updateComment(comment) {
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
    async saveNewComment(comment) {
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
    saveComment(comment) {
      this.watchingContent.comments[0] ? this.updateComment(comment) : this.saveNewComment(comment)
    },
    async bookmarkPostIsFavored(timeStampData) {
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
    }
  }
}

export default mixinTripleTitleSet
