<template>
  <div class="Flower">
    <lazy-img :src="src" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'src/components/lazyImg.vue'
export default defineComponent({
  name: 'Flower',
  components: {
    LazyImg
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>

@keyframes flowerAnimation {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(30deg);
  }
  75% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.Flower {
  /* page > 1920 */
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  animation: flowerAnimation 4s infinite ease;
  :deep(.lazy-img) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {
  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
  }
}
</style>
