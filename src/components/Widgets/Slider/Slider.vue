<template>
  <div class="slider-widget">
    <q-carousel
      v-model="slide"
      :arrows="controlNavigation.arrows"
      :prev-icon="controlNavigation.prevIcon"
      :next-icon="controlNavigation.nextIcon"
      :navigation="controlNavigation.navigation"
      :navigation-position="controlNavigation.navigationPosition"
      :navigation-icon="controlNavigation.navigationIcon"
      :navigation-active-icon="controlNavigation.navigationActiveIcon"
      :thumbnails="controlNavigation.thumbnails"
      :control-color="controlNavigation.controlColor"
      :control-text-color="controlNavigation.controlTextColor"
      :control-type="controlNavigation.controlType"
      :animated="transition.animated"
      :infinite="transition.infinite"
      :swipeable="transition.swipeable"
      :autoplay="transition.autoplay"
      :transition-prev="transition.transitionPrev"
      :transition-next="transition.transitionNext"
      :transition-duration="transition.transitionDuration"
      :height="styles.height ? styles.height : 'auto'"
      :class="styles.classes"
    >
      <q-carousel-slide
        v-for="(slide, index) in slides.list"
        :key="index"
        :name="slide.id"
        :class="slide.class"
        @click="redirectToBannerEvent(slide.link)"
      >
        <q-img
          :src="responsiveFeatures(slide.features).src"
          :width="responsiveFeatures(slide.features).width ? responsiveFeatures(slide.features).width : '100%'"
          :height="responsiveFeatures(slide.features).width ? responsiveFeatures(slide.features).height : '100%'"
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
          :position="control.position"
          :offset="control.offset"
          :class="control.class"
        >
          <slot name="controls-content"></slot>
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { BannerList } from 'src/models/Banner'

export default {
  name: 'Slider',
  props: {
    slides: {
      type: BannerList,
      default () {
        return new BannerList()
      }
    },
    control: {
      type: Object,
      default () {
        return {
          position: 'bottom',
          offset: [18, 18],
          class: ''
        }
      }
    },
    styles: {
      type: Object,
      default () {
        return { classes: '', height: '' }
      }
    },
    controlNavigation: {
      type: Object,
      default () {
        return {
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
        }
      }
    },
    transition: {
      type: Object,
      default () {
        return {
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
  setup () {
    return {
      slide: ref(1),
      fullscreen: ref(false)
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
  :deep(.q-carousel__slide) {
    padding: 0;
  }
}
</style>
