<template>
  <div class="q-pa-md">
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
      :height="styles.height ? styles.height : '300px'"
      :class="styles.classes"
    >
        <q-carousel-slide
          v-for="(slide, index) in slides.list"
          :key="index"
          :name="slide.id"
          :img-src="slide.photo"
          :class="slide.class"
          @click="redirectToBannerEvent(slide.link)"
        >
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
          position: 'bottom-right',
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
          arrows: false,
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
          autoplay: 2500,
          transitionPrev: 'fade',
          transitionNext: 'fade',
          transitionDuration: 300
        }
      }
    }
  },
  created () {
    console.log('slides', this.slides)
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
    }
  }
}
</script>

<style scoped>

</style>
