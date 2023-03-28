<template>
  <div class="action-button-widget-container"
       :style="options.style"
       :class="options.customClass">
    <q-btn :color="color"
           :icon="icon"
           :label="label"
           :flat="flat"
           @click="takeAction" />
  </div>
</template>

<script>

export default {
  name: 'ActionButton',
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
      color: '',
      icon: '',
      label: '',
      flat: false,
      callBack: null
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
      this.color = this.options.color
      this.icon = this.options.icon
      this.label = this.options.label
      this.flat = this.options.flat
      this.callBack = this.options.callBack
    },
    takeAction() {
      this.callBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.action-button-widget-container {
}
</style>
