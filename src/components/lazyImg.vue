<template>
  <div :class="customClass">
    <q-resize-observer @resize="onresize" />
    <q-img v-if="qImage && width && height"
           ref="LazyImage"
           :alt="alt"
           :src="lazyImageSrc"
           :width="computedWidth+'px'"
           :height="computedHeight+'px'"
           :ratio="ratio"
           fit="contain"
           class="full-width img"
           position="0 0"
    >
      <slot />
    </q-img>
    <img v-else-if="!qImage && width && height"
         ref="LazyImage"
         :alt="alt"
         :src="lazyImageSrc"
         class="full-width img"
         :style="{height: computedHeight+'px', width: computedWidth+'px'}"
    />
    <q-img v-else-if="qImage && (!width || !height)"
           :src="src"
           :alt="alt"
    >
      <slot />
    </q-img>
    <img v-else-if="!qImage && (!width || !height)"
         :src="src"
         :alt="alt"
         class="full-width"
    />
  </div>
</template>

<script>
export default {
  name: 'lazyImg',
  props: {
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    qImage: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      lazyImageSrc: '',
      computedWidth: 0,
      computedHeight: 0
    }
  },
  computed: {
    customClass () {
      return this.class
    },
    normalizedSizeWithPx () {
      return {
        w: this.normalizedSizeInNumber.w + 'px',
        h: this.normalizedSizeInNumber.h + 'px'
      }
    },
    normalizedSizeInNumber () {
      if (!this.width || !this.height) {
        return {
          w: 0,
          h: 0
        }
      }
      const wContain = this.width.search('px') !== -1 ? 'px' : this.width.search('%') ? '%' : ''
      const HContain = this.height.search('px') !== -1 ? 'px' : this.height.search('%') ? '%' : ''
      return {
        w: this.width.replace(wContain, ''),
        h: this.height.replace(HContain, '')
      }
    },
    ratio () {
      return this.normalizedSizeInNumber.w + '/' + this.normalizedSizeInNumber.h
    }
  },
  watch: {
    src () {
      this.updateLazyImageSrc()
    }
  },
  mounted() {
    this.updateLazyImageSrc()
  },
  methods: {
    onresize () {
      this.updateLazyImageSrc()
    },
    updateLazyImageSrc () {
      this.computedWidth = Math.floor(this.getOffsetWidth())
      this.computedHeight = Math.floor(this.getOffsetHeight())
      if (this.normalizedSizeInNumber.w !== null && this.normalizedSizeInNumber.h !== null && !isNaN(parseInt(this.normalizedSizeInNumber.w)) && !isNaN(parseInt(this.normalizedSizeInNumber.h))) {
        this.computedHeight = Math.floor((parseInt(this.normalizedSizeInNumber.h) * this.computedWidth) / parseInt(this.normalizedSizeInNumber.w))
      }
      this.lazyImageSrc = this.src
      if (!isNaN(this.computedWidth) && this.computedWidth > 0 && !isNaN(this.computedHeight) && this.computedHeight > 0) {
        this.lazyImageSrc += '?w=' + this.computedWidth + '&h=' + this.computedHeight
      }
    },
    getImageElement () {
      if (!this.$refs.LazyImage) {
        return {
          offsetWidth: null,
          offsetHeight: null
        }
      }
      if (this.$refs.LazyImage.$el) {
        return this.$refs.LazyImage.$el
      }
      if (this.$refs.LazyImage) {
        return this.$refs.LazyImage
      }
    },
    getOffsetWidth () {
      const imageElement = this.getImageElement()
      if (!imageElement) {
        return 0
      }
      return imageElement.offsetWidth
    },
    getOffsetHeight () {
      const imageElement = this.getImageElement()
      if (!imageElement) {
        return 0
      }
      return imageElement.offsetHeight
    }
  }
}
</script>

<style>
.img{
  border-radius: inherit;
}
</style>
