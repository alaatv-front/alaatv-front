<template>
  <div
    class="sticky"
    ref="sticky"
    :top-gap="topGap"
    :bottom-gap="bottomGap"
  >
    <q-scroll-observer @scroll="updateScroll" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'StickyBothSides',
  props: {
    topGap: {
      type: Number,
      default: 100
    },
    bottomGap: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      currentPosition: 0
    }
  },
  mounted() {
    this.currentPosition = this.getScrollY()
    this.updateStickyElementPosition(this.topGap + 'px')
  },
  computed: {
    stickyElement() {
      return this.$refs.sticky
    }
  },
  methods: {
    getFinalStickyElementTop() {
      return window.innerHeight - this.stickyElement.offsetHeight - this.bottomGap
    },
    getScrollY() {
      return window.scrollY
    },
    getNewStickyElementPosition(stickyElementTop) {
      return (stickyElementTop + this.currentPosition - this.getScrollY()) + 'px'
    },
    updateStickyElementPosition(newPosition) {
      this.stickyElement.style.top = newPosition
    },
    stickyElementToTop(stickyElementTop) {
      if (stickyElementTop === this.topGap) {
        return
      }
      if (stickyElementTop < this.topGap) {
        this.updateStickyElementPosition(this.getNewStickyElementPosition(stickyElementTop))
      } else {
        this.updateStickyElementPosition(this.topGap + 'px')
      }
    },
    stickyElementToBottom(stickyElementTop) {
      const finalStickyElementTop = this.getFinalStickyElementTop()
      if (stickyElementTop === finalStickyElementTop) {
        return
      }
      if (stickyElementTop > finalStickyElementTop) {
        this.updateStickyElementPosition(this.getNewStickyElementPosition(stickyElementTop))
      } else {
        this.updateStickyElementPosition(finalStickyElementTop + 'px')
      }
    },
    updateScroll(info) {
      const stickyElementTop = parseInt(this.stickyElement.style.top.replace('px', ''))
      if (info.direction === 'up') {
        this.stickyElementToTop(stickyElementTop)
      } else {
        this.stickyElementToBottom(stickyElementTop)
      }
      this.currentPosition = this.getScrollY()
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  height: fit-content;
}

</style>
