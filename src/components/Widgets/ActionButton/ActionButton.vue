<template>
  <q-btn :color="color"
         :icon="icon"
         :label="label"
         :flat="flat"
         :class="customClass"
         :style="options.style"
         class="action-btn"
         @click="takeAction">
    <img v-if="imageSource"
         :src="imageSource"
         alt="actionBtn">
  </q-btn>
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
      callBack: null,
      imageSource: '',
      customClass: ''
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
      this.imageSource = this.options.imageSource
      this.customClass = this.options.customClass
      if (this.options.imageSource) {
        this.flat = true
        this.customClass = this.options.customClass + ' img-btn'
      }
    },
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    takeAction() {
      if (this.callBack) {
        this.callBack()
      } else if (this.options.action && this.options.action === 'scroll') {
        this.scrollToElement(this.options.scrollTo)
      } else if (this.options.action && this.options.action === 'link') {
        this.router.push(this.options.route)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.action-btn {
  &.img-btn{
    &:deep(.q-btn__content){
      margin: 0;
    }
    &:deep(.q-focus-helper) {
      display: none;
    }
  }
}
</style>
