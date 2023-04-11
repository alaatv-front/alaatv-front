<template>
  <q-btn :color="options.color"
         :icon="options.icon"
         :label="options.label"
         :flat="options.flat"
         :class="className"
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
      color: null,
      icon: null,
      label: null,
      flat: false,
      callBack: null,
      imageSource: null,
      className: null,
      fixed: false,
      fixedPosition: null,
      eventArgs: null
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
      this.eventArgs = this.options.eventArgs
      this.imageSource = this.options.imageSource
      this.className = this.options.className
      this.fixed = this.options.fixed
      this.fixedPosition = this.options.fixedPosition
      if (this.options.imageSource) {
        this.flat = true
        this.className = this.options.className + ' img-btn'
      }
      if (this.fixed) {
        this.className = this.options.className + ' fixed-btn' + ` ${this.fixedPosition}`
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
      } else if (this.options.action && this.options.action === 'event') {
        this.$bus.emit(this.options.eventName, this.eventArgs)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.action-btn {

  &.fixed-btn {
    position: fixed;
    z-index: 1;

    &.top-right {
      top: 0;
      right: 0;
    }
    &.top-left {
      top: 0;
      left: 0;
    }
    &.bottom-right {
      bottom: 0;
      right: 0;
    }
    &.bottom-left {
      bottom: 0;
      left: 0;
    }
  }
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
