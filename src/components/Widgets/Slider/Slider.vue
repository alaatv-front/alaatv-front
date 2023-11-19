<template>
  <q-carousel ref="SliderCarousel"
              v-model="slide"
              :arrows="localOptions.controlNavigation.arrows"
              :prev-icon="localOptions.controlNavigation.prevIcon"
              :next-icon="localOptions.controlNavigation.nextIcon"
              :navigation="localOptions.controlNavigation.navigation"
              :navigation-position="localOptions.controlNavigation.navigationPosition"
              :navigation-icon="localOptions.controlNavigation.navigationIcon"
              :navigation-active-icon="localOptions.controlNavigation.navigationActiveIcon"
              :thumbnails="localOptions.controlNavigation.thumbnails"
              :control-color="localOptions.controlNavigation.controlColor"
              :control-text-color="localOptions.controlNavigation.controlTextColor"
              :control-type="localOptions.controlNavigation.controlType"
              :animated="localOptions.transition.animated"
              :infinite="localOptions.transition.infinite"
              :swipeable="localOptions.transition.swipeable"
              :autoplay="localOptions.transition.autoplay"
              :transition-prev="localOptions.transition.transitionPrev"
              :transition-next="localOptions.transition.transitionNext"
              :transition-duration="localOptions.transition.transitionDuration"
              :height="localOptions.styles.height ? localOptions.styles.height : 'auto'"
              :class="localOptions.styles.classes"
              class="slider-widget">
    <q-carousel-slide v-for="(slide, index) in options.list"
                      :key="index"
                      :ref="'slider' + index"
                      :name="index"
                      @click="takeAction(slide)">
      <component :is="parentComponent"
                 :to="slide.link"
                 :href="slide.link"
                 class="slider-parent">
        <template v-if="hasPhoto(slide) && !hasVideo(slide)">
          <lazy-img v-if="slide.photo.src !== ''"
                    :height="slide.photo.height"
                    :width="slide.photo.width"
                    :src="slide.photo.src"
                    :alt="slide.title"
                    class="slider-image" />
          <lazy-img v-else
                    :height="responsiveFeaturesForPhoto(slide.features).height"
                    :width="responsiveFeaturesForPhoto(slide.features).width"
                    :src="responsiveFeaturesForPhoto(slide.features).src"
                    :alt="slide.title"
                    class="slider-image" />
        </template>
        <template v-if="hasVideo(slide)">
          <video :key="videoKey + '-' + index"
                 autoplay
                 loop
                 muted
                 class="full-width">
            <source :src="slide.video?.src || responsiveFeaturesForVideo(slide.features).videoSrc">
            Your browser does not support the video tag.
          </video>

          <!--          <q-video v-if="!!slide.video?.src"-->
          <!--                   :ratio="slide.video?.width / video?.height"-->
          <!--                   :src="slide.video?.src"-->
          <!--                   :alt="slide.title"-->
          <!--                   class="slider-image" />-->
          <!--          <q-video v-else-->
          <!--                   :ratio="getVideoRatio(responsiveFeaturesForVideo(slide.features))"-->
          <!--                   :src="responsiveFeaturesForVideo(slide.features).videoSrc"-->
          <!--                   :alt="slide.title"-->
          <!--                   class="slider-image" />-->
        </template>
        <q-tooltip v-if="slide.title"
                   :offset="[18, 18]">
          {{ slide.title }}
        </q-tooltip>
      </component>
    </q-carousel-slide>
    <template v-slot:control>
      <q-carousel-control :position="localOptions.control.position"
                          :offset="localOptions.control.offset"
                          :class="localOptions.control.class">
        <slot name="controls-content" />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script>
import { ref } from 'vue'
import { Banner, BannerList } from 'src/models/Banner.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import lazyImg from 'components/lazyImg.vue'
import { AEE } from 'assets/js/AEE/AnalyticsEnhancedEcommerce'
import { openURL } from 'quasar'

export default {
  name: 'Slider',
  components: { lazyImg },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return new BannerList()
      }
    }
  },
  data () {
    return {
      sliderRef: 'slider' + Date.now(),
      slide: ref(null),
      fullscreen: ref(false),
      selectedSlide: new Banner(),
      windowWidth: 0,
      videoKey: Date.now(),
      defaultOptions: {
        list: [],
        control: {
          position: 'bottom',
          offset: [18, 18],
          class: ''
        },
        styles: {
          classes: '',
          height: ''
        },
        controlNavigation: {
          arrows: true,
          prevIcon: '',
          nextIcon: '',
          navigation: true,
          navigationPosition: 'bottom',
          navigationIcon: '',
          navigationActiveIcon: '',
          thumbnails: false,
          controlColor: 'primary',
          controlTextColor: '',
          controlType: 'flat'
        },
        transition: {
          animated: true,
          infinite: true,
          swipeable: true,
          autoplay: 5000, // true - false - time intervals (in milliseconds)
          transitionPrev: 'fade',
          transitionNext: 'fade',
          transitionDuration: 300
        }
      }
    }
  },
  computed: {
    parentComponent () {
      if (this.selectedSlide.link) {
        if (this.isExternal(this.selectedSlide.link)) {
          return 'a'
        } else {
          return 'router-link'
        }
      }
      return 'div'
    }
  },
  watch: {
    slide (newVal) {
      this.selectedSlide = new Banner(this.localOptions.list[newVal])
      this.$nextTick(() => {
        this.setAEEEvent(newVal)
      })
    }
  },
  mounted () {
    if (this.options && this.options.list && this.options.list.length > 0) {
      this.slide = 0
    }

    window.addEventListener('resize', this.onResize)
    this.windowWidth = window.innerWidth
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    isExternal (url) {
      if (typeof window === 'undefined') {
        return true
      }
      return (url.indexOf('http://') > -1 || url.indexOf('https://') > -1)
    },
    setSliderIntersectionObserver (sliderIndex) {
      const slideRef = 'slider' + sliderIndex
      const element = this.$refs[slideRef][0].$el
      const observer = new IntersectionObserver(this.handleIntersection)
      observer.observe(element)
    },
    handleIntersection (entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.slideViewed()
          observer.unobserve(entry.target)
        }
      })
    },
    getAEEKey () {
      let AEEKey
      Object.values(this.selectedSlide.AEEEventBody).forEach(item => {
        AEEKey += item
      })
      return AEEKey
    },
    slideViewed () {
      AEE.promotionView([this.selectedSlide.AEEEventBody], {
        TTl: 1000,
        key: this.getAEEKey()
      })
    },
    pushClickedEvent (slide) {
      AEE.promotionClick([slide.AEEEventBody], {
        TTl: 1000,
        key: this.getAEEKey()
      })
    },
    setAEEEvent (sliderIndex) {
      if (!this.selectedSlide.useAEEEvent) {
        return
      }
      this.setSliderIntersectionObserver(sliderIndex)
    },
    onResize () {
      if (typeof window === 'undefined') {
        return
      }
      this.windowWidth = window.innerWidth
      this.videoKey = Date.now()
    },
    responsiveFeaturesForPhoto (features) {
      const defaultResult = {
        src: '',
        width: '0',
        height: '0'
      }
      const result = this.getFeatureFromSizeCheckByKey(features, 'src')
      return Object.assign(defaultResult, result)
    },
    responsiveFeaturesForVideo (features) {
      const defaultResult = {
        videoSrc: '',
        videoWidth: 16,
        videoHeight: 9
      }
      const result = this.getFeatureFromSizeCheckByKey(features, 'videoSrc')
      return Object.assign(defaultResult, result)
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
    },
    takeAction (slide) {
      if (slide.useAEEEvent) {
        this.pushClickedEvent(slide)
      }
      if (this.parentComponent === 'a') {
        openURL(slide.link)
      } else if (this.parentComponent === 'router-link') {
        this.$router.push(slide.link)
      }
    },
    hasVideo (slide) {
      const hasSimpleVideo = !!slide.video?.src
      const hasResponsiveVideo = this.responsiveFeaturesForVideo(slide.features)?.videoSrc
      return !!(hasSimpleVideo || hasResponsiveVideo)
    },
    hasPhoto (slide) {
      const hasSimplePhoto = !!slide.photo?.src
      const hasResponsivePhoto = this.responsiveFeaturesForPhoto(slide.features)?.src

      return !!(hasResponsivePhoto || hasSimplePhoto)
    },
    getVideoRatio (featureSize) {
      const width = featureSize?.videoWidth || 0
      const height = featureSize?.videoHeight || 1
      return width / height
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/Theme/spacing';
@import 'src/css/Theme/Controls/button';

.slider-widget {
  width: 100%;
  background-color: transparent;
  display: block;

  &:deep(.q-carousel__slide) {
    padding: 0;

    .slider-parent{
      display: block;
      background: transparent;
      pointer-events: none !important;
      cursor: pointer;
    }

    .slider-image {
      width: 100%;
      pointer-events: none !important;
    }
  }

  &:deep(.q-carousel__control) {
    .q-btn{
      @include btn-handle-square-padding('xs')
    }
  }

  //.image {
  //  width: 100%;
  //}
  @media screen and (width <= 600px){
    &:deep(.q-carousel__navigation){
      bottom: 3px;

      .q-btn {
        margin: 0;
        padding: 0;
      }
    }

    &:deep(.q-carousel__next-arrow) {
      right: 0;
    }

    &:deep(.q-carousel__prev-arrow) {
      left: 0;
    }
  }
}
</style>
