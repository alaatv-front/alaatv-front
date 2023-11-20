<template>
  <div class="slider-container new-theme ">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="slider-title">
          Slider & Range
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-4 flex flex-center">Range</div>
      <div class="col-md-4 flex flex-center">Slider</div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-4 flex flex-center q-pa-md">
        <q-range v-model="value1"
                 :min="0"
                 :max="1000"
                 label-always
                 switch-label-side
                 left-label-color="transparent"
                 left-label-text-color="dark"
                 right-label-color="transparent"
                 right-label-text-color="dark"
                 track-size="8px"
                 thumb-size="35px"
                 :left-label-value="value1.min + 'هزار تومان'"
                 :right-label-value="value1.max + 'هزار تومان'"
                 color="primary" />
      </div>
      <div class="col-md-4 flex flex-center q-pa-md">
        <q-slider v-model="value2"
                  :min="0"
                  :max="100"
                  track-size="8px"
                  thumb-size="35px"
                  label
                  label-always
                  color="primary" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ToggleTheme',
  data () {
    return {
      value1: {
        min: 250,
        max: 850
      },
      value2: 85
    }
  }
})
</script>

<style lang="scss" scoped>
  .slider-container {
    padding: 40px;
    background: #fff;

    .slider-title {
      font-size: 28px;
    }
  }
</style>
