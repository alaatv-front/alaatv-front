<template>
  <div class="progress-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="progress-title">
          Progress
        </div>
      </div>
    </div>
    <div class="row flex justify-center items-start">
      <div class="col-md-3  flex column items-center justify-center">
        <div class="title q-my-md">Linear</div>
        <q-linear-progress :value="value1"
                           rounded
                           track-color="white"
                           size="15px"
                           class="q-mt-md" />
      </div>
      <div class="col-md-3 flex column flex-center">
        <div class="title q-my-md">Circular 1</div>
        <q-circular-progress :value="value2"
                             size="150px"
                             :thickness="0.22"
                             show-value
                             color="primary"
                             track-color="white"
                             class="q-ma-md" />
      </div>
      <div class="col-md-3 flex column flex-center">
        <div class="title q-my-md">Circular 2</div>
        <half-circular-progress :value="21"
                                :min="0"
                                :max="50"
                                :size="200"
                                :showValue="true"
                                :icon="'dew_point'"
                                :fontSize="'24px'" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HalfCircularProgress from './HalfCircularProgress.vue'

export default defineComponent({
  name: 'ProgressTheme',
  components: {
    HalfCircularProgress
  },
  data() {
    return {
      value1: 0.7,
      value2: 74
    }
  }
})
</script>

<style lang="scss" scoped>
.progress-container {
  padding: 40px 0;

  .progress-title {
    font-size: 28px;
  }
}
</style>
