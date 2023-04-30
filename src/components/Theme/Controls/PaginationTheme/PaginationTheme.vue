<template>
  <div class="slider-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="slider-title">
          Slider & Range
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-4 flex flex-center">Desktop</div>
      <div class="col-md-4 flex flex-center">Mobile</div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-4 flex flex-center q-pa-md">
        <q-pagination v-model="current"
                      :max="10"
                      :max-pages="6"
                      icon-prev="west"
                      icon-next="east"
                      boundary-numbers
                      direction-links />
      </div>
      <div class="col-md-4 flex flex-center q-pa-md">
        <q-pagination v-model="current"
                      :max="10"
                      :max-pages="6"
                      icon-prev="west"
                      icon-next="east"
                      boundary-numbers
                      direction-links />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ToggleTheme',
  data() {
    return {
      current: 1
    }
  }
})
</script>

<style lang="scss" scoped>
  .slider-container {
    padding: 40px;

    .slider-title {
      font-size: 28px;
    }
  }
</style>
