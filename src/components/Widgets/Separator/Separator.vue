<template>
  <div v-if="options.image"
       class="separator-image-wrapper"
       :style="options.style"
       :class="options.className">
    <q-img :src="image"
           class="separator-image"
           alt="separator"
           :height="options.height"
           :width="options.width"
           :style="options.ImageStyle"
           :class="options.ImageClassName" /></div>
  <q-separator v-else
               :style="options.style"
               :class="options.className"
               :spaced="spaced"
               :dark="dark"
               :inset="inset"
               :vertical="vertical" />
</template>

<script>
export default {
  name: 'Separator',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      spaced: false,
      dark: false,
      inset: false,
      vertical: false,
      image: null
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.spaced = this.options.spaced
      this.dark = this.options.dark
      this.inset = this.options.inset
      this.vertical = this.options.vertical
      this.image = this.options.image
    }
  }
}
</script>

<style lang="scss" scoped>
.separator-image-wrapper {
  width: 100%;

  .separator-image {
    width: 100%;
  }
}
</style>
