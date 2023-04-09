<template>
  <q-img :src="getImageSource(options)"
         spinner-color="primary"
         :width="getImageWidth(options)"
         :height="getImageHeight(options)"
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
      ratio: '',
      windowWidth: 0,
      xs: {
        height: '',
        width: '',
        src: ''
      },
      sm: {
        height: '',
        width: '',
        src: ''
      },
      md: {
        height: '',
        width: '',
        src: ''
      },
      lg: {
        height: '',
        width: '',
        src: ''
      },
      xl: {
        height: '',
        width: '',
        src: ''
      }
    }
  },
  computed: {

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
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    loadConfig() {
      this.imageSource = this.options.imageSource
      this.windowWidth = window.innerWidth
      this.xs = this.options.xs
      this.sm = this.options.sm
      this.md = this.options.md
      this.lg = this.options.lg
      this.xl = this.options.xl
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    getImageSource (options) {
      if (options.imageSource) {
        return options.imageSource
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.src ? options.xl.src : options.lg?.src ? options.lg.src : options.sm?.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg.src ? options.lg.src : options.md?.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs?.src : options.xl?.src
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm.src ? options.sm.src : options.xs?.src ? options.xs.src : options.md?.src ? options.md.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else if (this.windowWidth <= 599) {
        return options.xs?.src ? options.xs.src : options.sm?.src ? options.sm.src : options.md?.src ? options.md.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else {
        return ''
      }
    },
    getImageHeight (options) {
      if (options.height) {
        return options.height
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.height ? options.xl.height : options.lg?.height ? options.lg.height : options.sm?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg?.height ? options.lg.height : options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.xl?.height
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.md?.height ? options.md.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else if (this.windowWidth <= 599) {
        return options.xs?.height ? options.xs.height : options.sm?.height ? options.sm.height : options.md?.height ? options.md.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else {
        return ''
      }
    },
    getImageWidth (options) {
      if (options.width) {
        return options.width
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.width ? options.xl.width : options.lg?.width ? options.lg.width : options.sm?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg?.width ? options.lg.width : options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.xl?.width
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 599) {
        return options.xs?.width ? options.xs.width : options.sm?.width ? options.sm.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else {
        return ''
      }
    }
  }
}
</script>
