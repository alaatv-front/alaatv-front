<template>
  <div class="WebmPlayer">
    <video v-if="mounted"
           ref="WebmPlayer"
           :autoplay="autoplay"
           :loop="loop"
           muted
           class="full-width"
           @ended="onPlayerEnded"
           @click="onClickElement"
           @loadedmetadata="onLoadedmetadata">
      <source :src="responsiveSrcPath">
      Your browser does not support the video tag.
    </video>
    <q-inner-loading :showing="!loadedmetadata"
                     label="کمی صبر کنید..." />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WebmPlayer',
  props: {
    responsiveSrc: {
      type: Object,
      default: () => {
        return {
          xs: {
            src: ''
          },
          sm: {
            src: ''
          },
          md: {
            src: ''
          },
          lg: {
            src: ''
          },
          xl: {
            src: ''
          }
        }
      }
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  emits: ['complete', 'loadedmetadata'],
  data () {
    return {
      windowWidth: 0,
      mounted: false,
      loadedmetadata: false
    }
  },
  computed: {
    responsiveSrcPath () {
      return this.getFeatureFromSizeCheckByKey(this.responsiveSrc, 'src')?.src
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    onClickElement () {
      this.$refs.WebmPlayer.play()
    },
    onLoadedmetadata () {
      this.loadedmetadata = true
      this.$emit('loadedmetadata')
    },
    onPlayerEnded () {
      this.$emit('complete')
    },
    getFeatureFromSizeCheckByKey (features, key) {
      const sizeToNumberMap = {
        xs: 0,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4
      }
      function getNameBySize (size) {
        return Object.keys(sizeToNumberMap).find(item => sizeToNumberMap[item] === size)
      }
      function getFeatureSizeOfLTSize (features, key, sizeName) {
        return getFeatureSizeWithCallback(features, key, sizeName, (pageSize) => pageSize - 1)
      }

      function getFeatureSizeOfGTSize (features, key, sizeName) {
        return getFeatureSizeWithCallback(features, key, sizeName, (pageSize) => pageSize + 1)
      }

      function getFeatureSizeWithCallback (features, key, sizeName, cb) {
        if (features[sizeName] && features[sizeName][key]) {
          return features[sizeName]
        }
        const pageSize = sizeToNumberMap[sizeName]

        const cbPageSize = cb(pageSize)
        const screenName = getNameBySize(cbPageSize)
        if (!screenName) {
          return null
        }

        return getFeatureSizeWithCallback(features, key, screenName, cb)
      }

      const keyOfLTSize = getFeatureSizeOfLTSize(features, key, this.$q.screen.name)
      if (keyOfLTSize) {
        return keyOfLTSize
      }

      return getFeatureSizeOfGTSize(features, key, this.$q.screen.name)
    }
  }
})
</script>

<style lang="scss" scoped>
.WebmPlayer {
  /* page > 1920 */
  width: 100%;
  height: 100%;
  :deep(.q-inner-loading) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    //background: #fff !important;
    background: rgba(255, 255, 255, 1);
  }
  .bm {
    width: 100%;
    height: 100%;
  }
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
