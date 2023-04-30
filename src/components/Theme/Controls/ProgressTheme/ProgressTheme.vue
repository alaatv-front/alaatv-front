<template>
  <div class="progress-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="progress-title">
          Progress
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-3 flex flex-center">Linear</div>
      <div class="col-md-3 flex flex-center">Circular 1</div>
      <div class="col-md-3 flex flex-center">Circular 2</div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-3">
        <q-linear-progress :value="value1"
                           rounded
                           size="15px"
                           class="q-mt-md" />
      </div>
      <div class="col-md-3 flex flex-center">
        <q-circular-progress :value="value2"
                             size="150px"
                             :thickness="0.22"
                             show-value
                             color="primary"
                             track-color="white"
                             class="q-ma-md" />
      </div>
      <div class="col-md-3 flex flex-center">
        <circular-progress2 :value="21"
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
import CircularProgress2 from './CircularProgress2.vue'

export default defineComponent({
  name: 'ProgressTheme',
  components: {
    CircularProgress2
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
