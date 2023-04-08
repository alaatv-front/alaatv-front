<template>
  <q-img :src="options.imageSource"
         spinner-color="primary"
         spinner-size="82px"
         :style="options.style"
         :class="options.className" />
</template>

<script>
export default {
  name: 'ImageWidget',
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
      imageSource: '',
      ratio: ''
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
      this.imageSource = this.options.imageSource
      this.ratio = this.options.ratio
    }
  }
}
</script>
