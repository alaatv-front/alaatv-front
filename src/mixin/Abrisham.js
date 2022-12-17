import { Content } from 'src/models/Content'

const mixinAbrisham = {
  methods: {
    syncwatchingContentWithContentInList() {
      const targetContentIndex = this.contents.list.indexOf(item => item.id === this.watchingContent.id)
      if (!targetContentIndex) {
        return false
      }

      this.contents.list[targetContentIndex] = new Content(this.watchingContent)
    },
    toggleFavor() {
      this.watchingContent.loading = true
      if (this.watchingContent.is_favored) {
        this.setUnfavored()
      } else {
        this.setFavored()
      }
    },
    watched() {
      this.watchingContent.loading = true
      if (!this.watchingContent.has_watched) {
        this.$axios.post('/api/v2/watched', {
          watchable_id: this.watchingContent.id,
          watchable_type: 'content'
        })
          .then(() => {
            this.watchingContent.has_watched = true
            this.watchingContent.loading = false
            this.syncwatchingContentWithContentInList()
            this.purgeWatchingContentCaches()
          })
          .catch(() => {
            this.watchingContent.loading = false
          })
      } else {
        this.$axios.post('/api/v2/unwatched', {
          watchable_id: this.watchingContent.id,
          watchable_type: 'content'
        })
          .then(() => {
            this.watchingContent.has_watched = false
            this.watchingContent.loading = false
            this.syncwatchingContentWithContentInList()
            this.purgeWatchingContentCaches()
          })
          .catch(() => {
            this.watchingContent.loading = false
          })
      }
    },
    setFavored() {
      this.$axios.post('/api/v2/c/' + this.watchingContent.id + '/favored')
        .then(() => {
          this.watchingContent.is_favored = true
          this.watchingContent.loading = false
          this.syncwatchingContentWithContentInList()
          this.purgeWatchingContentCaches()
        })
        .catch(() => {
          this.watchingContent.loading = false
        })
    },
    setUnfavored() {
      this.$axios.post('/api/v2/c/' + this.watchingContent.id + '/unfavored')
        .then(() => {
          this.watchingContent.is_favored = false
          this.watchingContent.loading = false
          this.syncwatchingContentWithContentInList()
          this.purgeWatchingContentCaches()
        })
        .catch(() => {
          this.watchingContent.loading = false
        })
    },
    updateComment(comment) {
      this.$axios.post('/api/v2/comment/' + this.watchingContent.comments[0].id, {
        comment,
        _method: 'PUT'
      })
        .then(response => {
          this.watchingContent.comments[0].comment = response.data.data.comment
          this.comment = this.watchingContent.comments[0].comment
          this.syncwatchingContentWithContentInList()
          this.purgeWatchingContentCaches()
        })
    },

    saveNewComment(comment) {
      this.$axios.post('/api/v2/comment', {
        commentable_id: this.watchingContent.id,
        commentable_type: 'content',
        comment
      })
        .then(response => {
          this.watchingContent.comments.push({
            id: response.data.data.id,
            comment: response.data.data.comment
          })
          this.comment = this.watchingContent.comments[0].comment
          this.syncwatchingContentWithContentInList()
          this.purgeWatchingContentCaches()
        })
    },
    saveComment(comment) {
      this.watchingContent.comments[0] ? this.updateComment(comment) : this.saveNewComment(comment)
    },
    purgeWatchingContentCaches() {
      // Assist.purgeAjaxCaches(cacheKey)
    },

    // toggleBookmarkFavorite(id , event){
    //     let that = this
    //     this.timePoints.forEach( function (item) {
    //         if (parseInt(item.id) === parseInt(id)) {
    //             item.loading = true
    //             item.isFavored = !!!item.isFavored
    //             that.bookmarkPostIsFavored({
    //                 'id' : item.id,
    //                 'isFavored' : item.isFavored
    //             } )
    //         }
    //     })
    //     var requiredElement = document.querySelector('.video-js')
    //     requiredElement.focus()
    // },
    bookmarkPostIsFavored(timeStampData) {
      let postStatus = 'unfavored'
      const that = this
      if (timeStampData.isFavored) {
        postStatus = 'favored'
      }
      // /api/v2/timepoint/{timepoint_id}/favored
      this.$axios.post('/api/v2/c/timepoint/' + parseInt(timeStampData.id) + '/' + postStatus)
        .then(response => {
          if (response.status === 200) {
            this.watchingContent.timepoints.list.forEach(function (item) {
              if (parseInt(item.id) === parseInt(timeStampData.id)) {
                item.loading = false
                if (postStatus === 'favored') {
                  that.watchingContent.timepoints.list[timeStampData.numberOfTimestamp].isFavored = true
                } else if (postStatus === 'unfavored') {
                  that.watchingContent.timepoints.list[timeStampData.numberOfTimestamp].isFavored = false
                }
              }
            })

            this.syncwatchingContentWithContentInList()
          }
        })
        .catch(err => console.error(err))
    }
  }
}

export default mixinAbrisham
