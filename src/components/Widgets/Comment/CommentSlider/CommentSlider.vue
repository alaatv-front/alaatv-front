<template>
  <div v-if="localOptions.sliderItems"
       :class="localOptions.className"
       :style="localOptions.style"
       class="row">
    <div class="col-12">
      <carousel ref="vueCarousel"
                v-bind="localOptions.settings"
                :i18n="{
                  'ariaNextSlide': 'رفتن به اسلاید بعدی',
                  'ariaPreviousSlide': 'رفتن به اسلاید فبلی',
                  'iconArrowRight': 'قبلی',
                  'iconArrowLeft': 'بعدی',
                }"
                :breakpoints="localOptions.breakpoints">
        <slide v-for="slide in localOptions.sliderItems"
               :key="slide">
          <comment-item class="carousel__item"
                        :options="localOptions.commentOptionPanel"
                        :comment="slide" />
        </slide>

        <template v-if="localOptions.pagination"
                  #addons>
          <pagination />
        </template>
      </carousel>

      <div class="arrow-left text-right">
        <q-btn :icon="localOptions.navigation.goToLeft.icon"
               :round="localOptions.navigation.goToLeft.rounded"
               class="arrow-left-btn "
               :size="leftNavigationSize"
               @click="$refs.vueCarousel.next()" />
      </div>
      <div class="arrow-right">
        <q-btn :icon="localOptions.navigation.goToRight.icon"
               :round="localOptions.navigation.goToRight.rounded"
               class="arrow-right-btn"
               :size="rightNavigationSize"
               @click="$refs.vueCarousel.prev()" />
      </div>

    </div>

  </div>
  <div v-else
       class="loading">
    ...
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import CommentItem from 'src/components/Widgets/Comment/CommentItem/CommentItem.vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'PersonSlider',
  components: {
    CommentItem,
    Carousel,
    Slide,
    Pagination
  },
  mixins: [mixinWidget],
  data() {
    return {
      settings: {
        itemsToShow: 3,
        snapAlign: 'center',
        dir: 'rtl'
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 350 and up
        200: {
          itemsToShow: 1,
          snapAlign: 'center'
        },
        // 350 and up
        350: {
          itemsToShow: 1,
          snapAlign: 'center'
        },
        // 650 and up
        650: {
          itemsToShow: 1,
          snapAlign: 'center'
        },
        // 1200 and up
        1200: {
          itemsToShow: 3,
          snapAlign: 'center'
        }
      },
      defaultOptions: {
        settings: {
          autoplay: 3500,
          dir: 'rtl',
          itemsToShow: 3,
          snapAlign: 'center',
          transition: 500,
          pauseAutoplayOnHover: false,
          itemsToScroll: 1,
          wrapAround: true
        },
        breakpoints: {
          200: {
            itemsToShow: 1,
            snapAlign: 'center'
          },
          350: {
            itemsToShow: 1,
            snapAlign: 'center'
          },
          600: {
            itemsToShow: 1,
            snapAlign: 'center'
          },
          1024: {
            itemsToShow: 3,
            snapAlign: 'center'
          },
          1440: {
            itemsToShow: 3,
            snapAlign: 'center'
          }
        },
        sliderItems: [],
        commentOptionPanel: {},
        pagination: false,
        navigation: {
          goToLeft: {
            icon: 'chevron_left',
            textColor: '#FF944A',
            color: '#FFE8D8',
            rounded: false,
            size: {
              xs: 'md',
              sm: 'md',
              md: 'lg',
              lg: 'lg',
              xl: 'lg'
            }
          },
          goToRight: {
            icon: 'chevron_right',
            textColor: '#FF944A',
            color: '#FFE8D8',
            rounded: false,
            size: {
              xs: 'md',
              sm: 'md',
              md: 'lg',
              lg: 'lg',
              xl: 'lg'
            }
          }
        }
      }
    }
  },
  computed: {
    leftNavigationSize() {
      return this.localOptions.navigation.goToLeft.size[this.$q.screen.name]
    },
    rightNavigationSize() {
      return this.localOptions.navigation.goToRight.size[this.$q.screen.name]
    }
  },
  methods: {
    getOptions(item) {
      const comment = {
        comment: item
      }
      const options = Object.assign({}, this.localOptions.commentItemOptionPanel, comment)
      return options
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow-left {
  align-self: center;
  position: absolute;
  right: 0;
  top: 40%;
  z-index: 2;

  @media screen and (width <= 600px){
    right: 0;
  }

  .arrow-left-btn {
    background: v-bind('localOptions.navigation.goToLeft.color');
    color: v-bind('localOptions.navigation.goToLeft.textColor');
  }
}

.arrow-right {
  align-self: center;
  position: absolute;
  left: 0;
  top: 40%;
  z-index: 2;

  @media screen and (width <= 600px){
    left: 0;
  }

  .arrow-right-btn {
    background: v-bind('localOptions.navigation.goToRight.color');
    color: v-bind('localOptions.navigation.goToRight.textColor');
  }
}

.carousel__slide {
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
}

.carousel__slide--active ~ .carousel__slide {

}

.carousel__prev {
  left: 0;
  right: auto;
  background: v-bind('localOptions.navigation.goToRight.color');
  color: v-bind('localOptions.navigation.goToRight.textColor');
}

.carousel__next {
  left: auto;
  right: 0;
  background: v-bind('localOptions.navigation.goToLeft.color');
  color: v-bind('localOptions.navigation.goToLeft.textColor');
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.05);
}
</style>
