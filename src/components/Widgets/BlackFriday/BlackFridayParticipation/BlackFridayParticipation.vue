<template>
  <div class="BlackFridayParticipation">
    <video-section class="show-video-section" />
    <step-section class="step-section" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import StepSection from './components/StepSection.vue'
import VideoSection from './components/VideoSection.vue'

export default defineComponent({
  name: 'BlackFridayParticipation',
  components: { VideoSection, StepSection },
  data () {
    return {

    }
  },
  mounted () {
    this.getRewards()
  },
  methods: {
    getRewards () {
      APIGateway.blackFriday.getRewards()
        .then(() => {

        })
        .catch(() => {

        })
    }
  }
})

</script>

<style scoped lang="scss">
.BlackFridayParticipation {
  .show-video-section {
    margin-bottom: 60px;
  }
}
</style>
