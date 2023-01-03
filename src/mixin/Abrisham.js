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
      this.watchingContent.is_favored ? this.setUnfavored() : this.setFavored()
    },
    updateVideoStatus() {
      this.watchingContent.loading = true
      this.watchingContent.has_watched ? this.setVideoStatusToUnwatched() : this.setVideoStatusToWatched()
    },
    async setVideoStatusToWatched() {
      try {
        await this.$apiGateway.abrisham.setVideoWatched({
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
    async setVideoStatusToUnwatched() {
      try {
        await this.$apiGateway.abrisham.setVideoUnWatched({
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
        await this.$apiGateway.abrisham.setVideoFavored(this.watchingContent.id)
        this.watchingContent.is_favored = true
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async setUnfavored() {
      try {
        await this.$apiGateway.abrisham.setVideoUnFavored(this.watchingContent.id)
        this.watchingContent.is_favored = false
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async updateComment(comment) {
      try {
        const response = await this.$apiGateway.abrisham.updateComment(this.watchingContent.comments[0].id, {
          comment,
          _method: 'PUT'
        })
        this.watchingContent.comments[0].comment = response.data.data.comment
        this.comment = this.watchingContent.comments[0].comment
        this.syncwatchingContentWithContentInList()
      } catch {

      }
    },
    async saveNewComment(comment) {
      try {
        const response = await this.$apiGateway.abrisham.saveComment({
          commentable_id: this.watchingContent.id,
          commentable_type: 'content',
          comment
        })
        this.watchingContent.comments.push({
          id: response.data.data.id,
          comment: response.data.data.comment
        })
        this.comment = this.watchingContent.comments[0].comment
        this.syncwatchingContentWithContentInList()
      } catch {

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
        await this.$apiGateway.abrisham.bookmarkPostIsFavored(parseInt(timeStampData.id), postStatus)
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
