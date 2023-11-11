<template>
  <div class="BlackFridayParticipation">
    <q-spinner v-if="blackFridayCampaignData.loading"
               color="primary"
               size="3em"
               :thickness="10" />
    <template v-else>
      <video-section class="show-video-section"
                     :video="currentVideo"
                     @ended="onEnded"
                     @prev="onPrev"
                     @next="onNext" />
      <step-section :black-friday-campaign-data="blackFridayCampaignData"
                    class="step-section" />
      <q-dialog v-model="dialog">
        <inside-dialog :state="videoDialogState" />
      </q-dialog>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
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
    }
  },
  mounted () {
    this.getBlackFridayCampaignData()
  },
  methods: {
    onEnded () {
      this.showVideoDialog()
    },
    onPrev () {
      this.$emit('prev')
    },
    onNext () {
      this.$emit('next')
    },
    showVideoDialog (state) {
      this.videoDialogState = state
      this.showDialog()
    },
    getVideoDialogState () {

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
