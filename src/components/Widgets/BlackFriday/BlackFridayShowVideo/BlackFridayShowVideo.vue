<template>
  <div class="BlackFridayParticipation">
    <q-spinner v-if="blackFridayCampaignData.loading"
               color="primary"
               size="3em"
               :thickness="10" />
    <template v-else>
      <video-section class="show-video-section"
                     :video="selectedVideo"
                     @watched="onWatched"
                     @play="onPlay"
                     @ended="onEnded"
                     @prev="onPrev"
                     @next="onNext" />
      <step-section :black-friday-campaign-data="blackFridayCampaignData"
                    class="step-section"
                    @onSelectStep="onSelectStep" />
      <q-dialog v-model="dialog">
        <inside-dialog :state="videoDialogState"
                       :coupon-title="watchedVideoCoupon.discount_in_letters"
                       :coupon-code="watchedVideoCoupon.code" />
      </q-dialog>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Coupon } from 'src/models/Coupon.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import StepSection from './components/StepSection.vue'
import VideoSection from './components/VideoSection.vue'
import InsideDialog from './components/InsideDialog.vue'
import { BlackFridayVideo } from 'src/models/BlackFridayVideo.js'
import { BlackFridayCampaignData } from 'src/models/BlackFridayCampaignData.js'

export default defineComponent({
  name: 'BlackFridayParticipation',
  components: { VideoSection, StepSection, InsideDialog },
  data () {
    return {
      dialog: false,
      currentVideoWatched: false,
      watchedVideoCoupon: new Coupon(),
      videoDialogState: null,
      blackFridayCampaignData: new BlackFridayCampaignData()
    }
  },
  computed: {
    currentVideo () {
      if (this.blackFridayCampaignData.videos.list.length === 0) {
        return new BlackFridayVideo()
      }

      return this.blackFridayCampaignData.videos.list.find((video, videoIndex) => this.isCurrent(videoIndex))
    },
    selectedVideoIndex () {
      if (this.blackFridayCampaignData.videos.list.length === 0) {
        return null
      }

      const selectedVideoIndex = this.blackFridayCampaignData.videos.list.findIndex(video => video.selected)
      if (selectedVideoIndex !== -1) {
        return selectedVideoIndex
      }

      return this.getLastActiveIndex()
    },
    selectedVideo () {
      if (this.blackFridayCampaignData.videos.list.length === 0) {
        return new BlackFridayVideo()
      }

      const selectedVideo = this.blackFridayCampaignData.videos.list[this.selectedVideoIndex]
      return selectedVideo || this.currentVideo
    }
  },
  mounted () {
    this.getBlackFridayCampaignData()
  },
  methods: {
    onSelectStep (videoIndex) {
      if (!this.isVideoActive(videoIndex)) {
        return
      }
      this.setVideoSelected(videoIndex)
    },
    async onWatched () {
      const bcrypt = dcodeIO.bcrypt
      const contentId = this.selectedVideo.id
      const hashPass = 'XLfqzfD8n5qHbu6w'.concat('userMobile', contentId)
      const token = await bcrypt.hash(hashPass, 1)

      // this.watchedVideoCoupon.loading = true
      // APIGateway.blackFriday.getCouponByWatchVideo({
      //   content_id: contentId,
      //   token
      // })
      //   .then((coupon) => {
      //     this.currentVideoWatched = true
      //     this.watchedVideoCoupon = new Coupon(coupon)
      //     this.watchedVideoCoupon.loading = false
      //   })
      //   .catch(() => {
      //     this.watchedVideoCoupon.loading = false
      //   })
    },
    onPlay () {
      if (this.selectedVideo.has_played) {
        return
      }
      const contentId = this.selectedVideo.id
      APIGateway.content.setVideoWatched({
        completely_watched: 0,
        watchable_id: contentId,
        watchable_type: 'content'
      })
        .then(() => {
        })
        .catch(() => {
        })
    },
    onEnded () {
      this.beforeChangeSelectedVideo()
    },
    onPrev () {
      this.beforeChangeSelectedVideo()
      const prevIndex = this.getPrevIndex()
      if (!this.isVideoActive(prevIndex)) {
        return
      }
      this.setVideoSelected(prevIndex)
    },
    onNext () {
      this.beforeChangeSelectedVideo()
      const nextIndex = this.getNextIndex()
      if (!this.isVideoActive(nextIndex)) {
        return
      }
      this.setVideoSelected(nextIndex)
    },
    isVideoActive (videoIndex) {
      if (!this.blackFridayCampaignData.videos.list[videoIndex]) {
        return false
      }

      return !!this.blackFridayCampaignData.videos.list[videoIndex].is_actice
    },
    beforeChangeSelectedVideo () {
      if (this.currentVideoWatched) {
        const videoDialogState = this.getVideoDialogState()
        this.showVideoDialog(videoDialogState)
      }
      this.currentVideoWatched = false
    },
    getNextIndex () {
      if (this.blackFridayCampaignData.videos.list[this.selectedVideoIndex + 1]) {
        return this.selectedVideoIndex + 1
      }

      return this.selectedVideoIndex
    },
    getPrevIndex () {
      if (this.blackFridayCampaignData.videos.list[this.selectedVideoIndex - 1]) {
        return this.selectedVideoIndex - 1
      }

      return this.selectedVideoIndex
    },
    setVideoSelected (videoIndex) {
      this.blackFridayCampaignData.videos.list.forEach((item, itemIndex) => {
        item.selected = videoIndex === itemIndex
      })
    },
    showVideoDialog (state) {
      this.videoDialogState = state
      this.showDialog()
    },
    getVideoDialogState () {
      return 'watch-video-' + this.selectedVideoIndex
    },
    showDialog () {
      this.dialog = true
    },
    getBlackFridayCampaignData () {
      this.blackFridayCampaignData.loading = true
      APIGateway.blackFriday.getCampaignData()
        .then((blackFridayCampaignData) => {
          this.blackFridayCampaignData = new BlackFridayCampaignData(blackFridayCampaignData)
          this.blackFridayCampaignData.loading = false
        })
        .catch(() => {
          this.blackFridayCampaignData.loading = false
        })
    },
    isCurrent (videoIndex) {
      if (this.blackFridayCampaignData.videos.list.length === 0) {
        return false
      }

      const lastActiveIndex = this.getLastActiveIndex()

      return videoIndex === lastActiveIndex
    },
    getLastActiveIndex () {
      let activeIndex = 0
      this.blackFridayCampaignData.videos.list.forEach((video, videoIndex) => {
        if (video.is_actice && activeIndex < videoIndex) {
          activeIndex = videoIndex
        }
      })

      return activeIndex
    }
  }
})

</script>

<style scoped lang="scss">
.BlackFridayParticipation {
  .show-video-section {
    margin-bottom: 10px;
    @media screen and (max-width: 1023px) {
      margin-bottom: 0;
    }
  }
}
</style>
