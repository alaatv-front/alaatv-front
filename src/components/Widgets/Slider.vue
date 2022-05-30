<template>
  <q-carousel
    v-model="slide"
    :arrows="defaultOptions.controlNavigation.arrows"
    :prev-icon="defaultOptions.controlNavigation.prevIcon"
    :next-icon="defaultOptions.controlNavigation.nextIcon"
    :navigation="defaultOptions.controlNavigation.navigation"
    :navigation-position="defaultOptions.controlNavigation.navigationPosition"
    :navigation-icon="defaultOptions.controlNavigation.navigationIcon"
    :navigation-active-icon="defaultOptions.controlNavigation.navigationActiveIcon"
    :thumbnails="defaultOptions.controlNavigation.thumbnails"
    :control-color="defaultOptions.controlNavigation.controlColor"
    :control-text-color="defaultOptions.controlNavigation.controlTextColor"
    :control-type="defaultOptions.controlNavigation.controlType"
    :animated="defaultOptions.transition.animated"
    :infinite="defaultOptions.transition.infinite"
    :swipeable="defaultOptions.transition.swipeable"
    :autoplay="defaultOptions.transition.autoplay"
    :transition-prev="defaultOptions.transition.transitionPrev"
    :transition-next="defaultOptions.transition.transitionNext"
    :transition-duration="defaultOptions.transition.transitionDuration"
    :height="defaultOptions.styles.height ? defaultOptions.styles.height : 'auto'"
    :class="defaultOptions.styles.classes"
    class="slider-widget"
  >
    <q-carousel-slide
      v-for="(slide, index) in data.slides.list"
      :key="index"
      :name="slide.id"
      @click="redirectToBannerEvent(slide.link)"
    >
      <q-img
        :src="responsiveFeatures(slide.features).src"
        :width="responsiveFeatures(slide.features).width ? responsiveFeatures(slide.features).width : '100%'"
        :height="responsiveFeatures(slide.features).width ? responsiveFeatures(slide.features).height : 'auto'"
        :ratio="slide.ratio"
      />
      <q-tooltip
        v-if="slide.title"
        :offset="[18, 18]"
      >
        {{ slide.title }}
      </q-tooltip>
    </q-carousel-slide>
    <template v-slot:control>
      <q-carousel-control
        :position="defaultOptions.control.position"
        :offset="defaultOptions.control.offset"
        :class="defaultOptions.control.class"
      >
        <slot name="controls-content"></slot>
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script>
import { ref } from 'vue'
import { BannerList } from 'src/models/Banner'

export default {
  name: 'Slider',
  props: {
    data: {
      type: Object,
      default () {
        return {
          slides: new BannerList()
        }
      }
    }
  },
  data () {
    return {
      slide: ref(1),
      fullscreen: ref(false),
      defaultOptions: {
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
  methods: {
    redirectToBannerEvent (link) {
      window.location.href = link
    },
    responsiveFeatures (features) {
      console.log(features)
      const windowSize = this.$store.getters['AppLayout/windowSize']
      if (windowSize.x >= 1920) {
        return features.xl
      } else if (windowSize.x <= 1919 && windowSize.x > 1440) {
        return features.lg
      } else if (windowSize.x <= 1439 && windowSize.x > 1024) {
        return features.md
      } else if (windowSize.x <= 1023 && windowSize.x > 600) {
        return features.s
      } else if (windowSize.x <= 599) {
        return features.xs
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-widget {
  &:deep(.q-carousel__slide) {
    padding: 0;
  }
}
</style>
