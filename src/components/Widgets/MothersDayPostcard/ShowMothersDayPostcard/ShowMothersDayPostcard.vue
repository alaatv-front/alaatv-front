<template>
  <div class="ShowMothersDayPostcard">
    <postcard-preview />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PostcardPreview from './components/PostcardPreview.vue'
export default defineComponent({
  name: 'ShowMothersDayPostcard',
  components: { PostcardPreview }
})
</script>

<style lang="scss" scoped>
.ShowMothersDayPostcard {
  /* page > 1920 */
  display: flex;
  justify-content: center;
  align-items: center;
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
