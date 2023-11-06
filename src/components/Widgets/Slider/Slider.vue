<template>
  <q-carousel v-model="slide"
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
                      :name="index">
      <component :is="parentComponent"
                 :to="slide.link"
                 :href="slide.link"
                 class="slider-parent"
                 @click="takeAction(slide)">
        <lazy-img v-if="slide.photo.src !== ''"
                  :height="slide.photo.height"
                  :width="slide.photo.width"
                  :src="slide.photo.src"
                  :alt="slide.title"
                  class="slider-image" />
        <lazy-img v-else
                  :height="responsiveFeatures(slide.features).height"
                  :width="responsiveFeatures(slide.features).width"
                  :src="responsiveFeatures(slide.features).src"
                  :alt="slide.title"
                  class="slider-image" />
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
          autoplay: false,
          transitionPrev: 'fade',
          transitionNext: 'fade',
          transitionDuration: 300
        }
      }
    }
  },
  computed: {
    parentComponent() {
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
    slide(newVal) {
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
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    isExternal(url) {
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
    handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.slideViewed()
          observer.unobserve(entry.target)
        }
      })
    },
    getAEEKey() {
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
    onResize() {
      if (typeof window === 'undefined') {
        return
      }
      this.windowWidth = window.innerWidth
    },
    responsiveFeatures (features) {
      const defaultResult = {
        src: '',
        width: '0',
        height: '0'
      }
      let result = {}
      if (this.windowWidth >= 1920) {
        result = features.xl.src !== '' ? features.xl : features.lg.src !== '' ? features.lg : features.sm.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        result = features.lg.src !== '' ? features.lg : features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        result = features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
        result = features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 599) {
        result = features.xs.src !== '' ? features.xs : features.sm.src !== '' ? features.sm : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      }

      return Object.assign(defaultResult, result)
    },
    takeAction(slide) {
      if (slide.useAEEEvent) {
        this.pushClickedEvent(slide)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/Theme/spacing.scss';
@import 'src/css/Theme/Controls/button.scss';

.slider-widget {
  width: 100%;
  &:deep(.q-carousel__slide) {
    padding: 0;
    display: block;
    background: transparent;

    .slider-parent{
      cursor: pointer;
      display: block;
      background: transparent;
    }
    .slider-image {
      width: 100%;
    }
  }
  &:deep(.q-carousel__control) {
    .q-btn{
      @include q-btn-square($space-2);
    }
  }
  //.image {
  //  width: 100%;
  //}
  @media screen and (max-width: 600px){
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
