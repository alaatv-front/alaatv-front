import { Content } from 'src/models/Content'

const mixinAbrisham = {
  methods: {
    syncwatchingContentWithContentInList () {
      const targetContentIndex = this.contents.list.findIndex(item => item.id.toString() === this.watchingContent.id.toString())
      if (typeof targetContentIndex === 'undefined' || targetContentIndex === -1) {
        return false
      }

      this.contents.list[targetContentIndex] = new Content(this.watchingContent)
    },
    toggleFavor (value) {
      this.watchingContent.is_favored = value
      this.syncwatchingContentWithContentInList()
    },
    updateVideoStatus (data) {
      const hasWatch = data || this.watchingContent.has_watched
      this.watchingContent.loading = true
      hasWatch ? this.setVideoStatusToUnwatched() : this.setVideoStatusToWatched()
    },
    async setVideoStatusToWatched () {
      try {
        await this.$apiGateway.content.setVideoWatched({
          watchable_id: this.watchingContent.id,
          watchable_type: 'content'
        })
        this.watchingContent.has_watched = true
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async setVideoStatusToUnwatched () {
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
    async updateComment (comment) {
      try {
        const updateCommentResponse = await this.$apiGateway.content.updateComment({
          id: this.watchingContent.comments[0].id,
          data: {
            comment,
            _method: 'PUT'
          }
        })
        this.watchingContent.comments[0].comment = updateCommentResponse.comment
        this.comment = this.watchingContent.comments[0].comment
        this.syncwatchingContentWithContentInList()
      } catch {

      }
    },
    async saveNewComment (comment) {
      try {
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
        this.syncwatchingContentWithContentInList()
      } catch {

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

export default mixinAbrisham
