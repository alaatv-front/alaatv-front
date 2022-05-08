<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      swipeable
      arrows
      height="300px"
      class="text-purple rounded-borders"
    >
      <q-carousel-slide
        v-for="(slide, index) in slides"
        :key="index"
        :name="slide.name"
        :img-src="slide.imageUrl"
      />
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Slider',
  props: {
    slides: {
      type: Array,
      default () {
        return [{ title: '', name: '', imageUrl: '', icon: '', tooltip: '' }]
      }
    }
  },
  created () {
    console.log(this.slides)
  },

  setup () {
    return {
      slide: ref(1),
      fullscreen: ref(false)
    }
  }
}
</script>

<style scoped>

</style>
