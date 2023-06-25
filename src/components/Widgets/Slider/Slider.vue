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
                      :name="index">
      <a :href="slide.link">
        <lazy-img v-if="slide.photo.src !== ''"
                  q-image="true"
                  height="524px"
                  width="1362px"
                  :src="slide.photo.src"
                  :alt="slide.title" />
        <lazy-img v-else
                  qImage="true"
                  height="524px"
                  width="1362px"
                  :src="responsiveFeatures(slide.features).src"
                  :alt="slide.title" />
        <q-tooltip v-if="slide.title"
                   :offset="[18, 18]">
          {{ slide.title }}
        </q-tooltip>
      </a>
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
import { BannerList } from 'src/models/Banner.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import lazyImg from '../../../components/lazyImg.vue'

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
      slide: ref(null),
      fullscreen: ref(false),
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
    onResize() {
      this.windowWidth = window.innerWidth
    },
    responsiveFeatures (features) {
      if (this.windowWidth >= 1920) {
        return features.xl.src !== '' ? features.xl : features.lg.src !== '' ? features.lg : features.sm.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return features.lg.src !== '' ? features.lg : features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 599) {
        return features.xs.src !== '' ? features.xs : features.sm.src !== '' ? features.sm : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-widget {
  width: 100%;
  &:deep(.q-carousel__slide) {
    padding: 0;
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
