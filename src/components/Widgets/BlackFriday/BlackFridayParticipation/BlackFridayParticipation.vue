<template>
  <div class="BlackFridayParticipation">
    <video-section class="show-video-section"
                   @click="showDialog" />
    <step-section class="step-section" />
    <q-dialog v-model="dialog">
      <inside-dialog state="watch-video-0" />
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import StepSection from './components/StepSection.vue'
import VideoSection from './components/VideoSection.vue'
import InsideDialog from './components/InsideDialog.vue'

export default defineComponent({
  name: 'BlackFridayParticipation',
  components: { VideoSection, StepSection, InsideDialog },
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    this.getRewards()
  },
  methods: {
    showDialog () {
      this.dialog = true
    },
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
    margin-bottom: 10px;
    @media screen and (max-width: 1023px) {
      margin-bottom: 0;
    }
  }
}
</style>
