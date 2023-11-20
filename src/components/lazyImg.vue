<template>
  <template v-if="qImage">
    <q-img v-if="width && height"
           ref="LazyImage"
           :class="customClass"
           class="lazy-img"
           :alt="alt"
           :src="lazyImageSrc"
           :width="computedWidth+'px'"
           :height="computedHeight+'px'"
           :ratio="ratio"
           fit="contain"
           position="0 0"
           @click="onClick">
      <slot />
    </q-img>
    <q-img v-else
           ref="LazyImage"
           :class="customClass"
           class="lazy-img"
           :src="computedSrc"
           :alt="alt"
           @click="onClick">
      <slot />
    </q-img>
  </template>
  <template v-else>
    <img v-if="width && height"
         ref="LazyImage"
         :class="customClass"
         class="lazy-img"
         :alt="alt"
         :src="lazyImageSrc"
         :width="computedWidth"
         :height="computedHeight"
         :style="{height: computedHeightForStyle, width: computedWidthForStyle}"
         @click="onClick">
    <!--    :style="{height: computedHeightForStyle, width: computedWidthForStyle}"-->
    <!--    :style="{height: computedHeightForStyle, width: computedWidthForStyle}"-->
    <img v-else
         ref="LazyImage"
         :class="customClass"
         class="lazy-img"
         :src="computedSrc"
         :alt="alt"
         @click="onClick">
  </template>
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
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['click'],
  data () {
    return {
      visible: false,
      // png;base64 from -> https://png-pixel.com
      lazyImageSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mMsrWfACxhHFYABAIGaCJ524rGEAAAAAElFTkSuQmCC',
      computedWidth: 0,
      computedHeight: 0
    }
  },
  computed: {
    computedSrc () {
      if (!this.visible) {
        return this.lazyImageSrc
      }
      if (!this.$env?.APP_ENV !== 'production' && this.src) {
        return this.src.replace('https://stage-minio.alaatv.com', 'https://nodes.alaatv.com')
      }
      return this.src
    },
    customClass () {
      return this.class
    },
    computedWidthForStyle () {
      if (this.visible || !this.computedWidth) {
        return null
      }

      return this.computedWidth + 'px'
    },
    computedHeightForStyle () {
      if (this.visible || !this.computedHeight) {
        return null
      }

      return this.computedHeight + 'px'
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
      const width = this.width.toString()
      const height = this.height.toString()
      const wContain = width.search('px') !== -1 ? 'px' : width.search('%') ? '%' : ''
      const HContain = height.search('px') !== -1 ? 'px' : height.search('%') ? '%' : ''
      return {
        w: width.replace(wContain, ''),
        h: height.replace(HContain, '')
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
  mounted () {
    this.updateLazyImageSrc()
    this.observeImageIntersection()
    window.addEventListener('resize', this.onresize)
  },
  methods: {
    observeImageIntersection () {
      const image = this.$refs.LazyImage
      if (!image) {
        return
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is in view
            this.visible = true
            this.updateLazyImageSrc()
            observer.unobserve(image)
          }
        })
      })
      observer.observe(image)
    },
    onClick () {
      this.$emit('click')
    },
    onresize () {
      if (!this.visible) {
        return
      }
      this.updateLazyImageSrc()
    },
    onIntersection (entry) {
      if (!entry.isIntersecting) {
        return
      }
      this.visible = true
      this.updateLazyImageSrc()
    },
    isBase64Image (imageData) {
      return imageData.toString().indexOf('data:image/png;base64') === 0
    },
    updateLazyImageSrc () {
      this.computedWidth = Math.floor(this.getOffsetWidth())
      this.computedHeight = Math.floor(this.getOffsetHeight())
      if (this.normalizedSizeInNumber.w !== null && this.normalizedSizeInNumber.h !== null && !isNaN(parseInt(this.normalizedSizeInNumber.w)) && !isNaN(parseInt(this.normalizedSizeInNumber.h))) {
        this.computedHeight = Math.floor((parseInt(this.normalizedSizeInNumber.h) * this.computedWidth) / parseInt(this.normalizedSizeInNumber.w))
      }
      this.lazyImageSrc = this.computedSrc
      if (this.lazyImageSrc && !this.isBase64Image(this.lazyImageSrc) && !isNaN(this.computedWidth) && this.computedWidth > 0 && !isNaN(this.computedHeight) && this.computedHeight > 0) {
        this.lazyImageSrc += '?w=' + this.computedWidth + '&h=' + this.computedHeight
      }

      if (!this.lazyImageSrc) {
        this.lazyImageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpSKVDhYRcchQnSyIijpqFYpQIdQKrTqYXPohNGlIUlwcBdeCgx+LVQcXZ10dXAVB8APE1cVJ0UVK/F9SaBHjwXE/3t173L0DhHqZaVbHKKDptplOJsRsbkUMvUJABCH0YUpmljErSSn4jq97BPh6F+dZ/uf+HD1q3mJAQCSeYYZpE68TT27aBud94igrySrxOfGISRckfuS64vEb56LLAs+Mmpn0HHGUWCy2sdLGrGRqxBPEMVXTKV/Ieqxy3uKslauseU/+wnBeX17iOs1BJLGARUgQoaCKDZRhI06rToqFNO0nfPwDrl8il0KuDTByzKMCDbLrB/+D391ahfExLymcADpfHOdjCAjtAo2a43wfO07jBAg+A1d6y1+pA9OfpNdaWuwIiGwDF9ctTdkDLneA/idDNmVXCtIUCgXg/Yy+KQf03gLdq15vzX2cPgAZ6ip1AxwcAsNFyl7zeXdXe2//nmn29wNtt3Klb/Gn/QAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+cCDwcZJTB9qXYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12P4P4EBAAQhAZCbA9mPAAAAAElFTkSuQmCC'
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

<style lang="scss" scoped>
.resize-observer {
  min-width: 100%;
  max-width: 100%;
}

.lazy-img {
  font-size: 0;

  //min-width: 100%;
  //max-width: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: transparent;
  display: block;
  height: auto;
}
</style>
