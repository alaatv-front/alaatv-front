<template>
  <div v-if="loaded"
       class="person-slider-container">
    <div v-if="localOptions.sliderItems.length > 0"
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
                  :autoplay="3500"
                  :breakpoints="localOptions.breakpoints"
                  :wrapAround="true"
                  :transition="500">
          <slide v-for="slide in localOptions.sliderItems"
                 :key="slide">
            <q-card class="scroll-item-card"
                    :class="{'teacher': localOptions.personType === 'teacher' }">
              <q-img :src="slide.image"
                     :width="localOptions.slideItemImageWidth"
                     :height="localOptions.slideItemImageHeight"
                     spinner-color="primary"
                     class="student-img"
                     spinner-size="82px">
                <div v-if="localOptions.personType === 'student'"
                     class="student-major"
                     :class="{'riazi': slide.major === 'ریاضی', 'tajrobi': slide.major === 'تجربی'}">
                  {{ slide.major }}
                </div>
              </q-img>
              <q-card-section class="person-name-card-section">
                <div class="student-name ellipsis-2-lines"
                     :class="{'teacher': localOptions.personType === 'teacher' }">{{ slide.first_name + ' ' + slide.last_name }}</div>
              </q-card-section>
              <q-card-section class="person-info-card-section">
                <div v-if="localOptions.personType === 'student'"
                     class="student-info">
                  <div class="rank">
                    {{ slide.rank }}
                  </div>
                  <div class="region">
                    {{ slide.distraction === '1' ? 'منطقه یک' : slide.distraction === '2' ? 'منطقه دو' : slide.distraction === '3' ? 'منطقه سه' : slide.distraction}}
                  </div>
                </div>
                <div v-if="localOptions.personType === 'teacher'"
                     class="teacher-info">
                  <div class="major">
                    {{ slide.major }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </slide>

          <template #addons>
            <pagination v-if="localOptions.pagination" />
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
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'PersonSlider',
  components: {
    Carousel,
    Slide,
    Pagination
  },
  mixins: [mixinWidget],
  data() {
    return {
      loaded: false,
      defaultOptions: {
        settings: {
          autoplay: 3500,
          dir: 'rtl',
          itemsToShow: 6,
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
            itemsToShow: 3,
            snapAlign: 'center'
          },
          1024: {
            itemsToShow: 5,
            snapAlign: 'center'
          },
          1440: {
            itemsToShow: 5,
            snapAlign: 'center'
          }
        },
        sliderItems: [],
        slidItemBackgroundImage: '',
        slidItemBackgroundColor: '#ffffff',
        slidItemBackgroundPosition: 'center',
        slidItemBackgroundRepeat: 'no-repeat',
        slidItemBackgroundSize: '',
        slideItemImageWidth: '160px',
        slideItemImageHeight: '160px',
        personType: 'student',
        pagination: false,
        carouselPadding: '0 25px',
        navigation: {
          goToLeft: {
            icon: 'chevron_left',
            textColor: '#9E9E9E',
            color: '#FFFFFF',
            rounded: true,
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
            textColor: '#9E9E9E',
            color: '#FFFFFF',
            rounded: true,
            size: {
              xs: 'md',
              sm: 'md',
              md: 'lg',
              lg: 'lg',
              xl: 'lg'
            }
          }
        }
      },
      scrollIndex: 0
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
  mounted() {
    this.loaded = true
  }
})
</script>

<style lang="scss" scoped>
.scroll-item-card {
  width: 200px;
  height: 325px;
  max-height: 350px;
  border-radius: 20px;
  margin: 0 10px 20px;
  padding: 20px 20px 8px;
  box-shadow: 0 20px 20px 0 rgb(0 0 0 / 5%);
  background-color: v-bind('localOptions.slidItemBackgroundColor');
  background-image: v-bind('localOptions.slidItemBackgroundImage');
  background-position: v-bind('localOptions.slidItemBackgroundPosition');
  background-repeat: v-bind('localOptions.slidItemBackgroundRepeat');
  background-size: v-bind('localOptions.slidItemBackgroundSize');

  &.teacher {
    padding-top: 0;
  }

  .student-img {
    position: relative;
    border-radius: 10px;

    .student-major {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 2;
      color: white;
      font-size: 16px;
      font-weight: bold;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.riazi {
        background: rgba($color: #75b9ea, $alpha: .5);
      }
      &.tajrobi {
        background: rgba($color: #63a869, $alpha: .5);
      }
    }
  }

  .person-name-card-section {
    padding: 0;
    .student-name {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
      min-height: 40px;

      &.teacher {
        min-height: 20px;
        margin-top: 14px;
      }
    }
  }

 .person-info-card-section{
  padding-top: 0;
  padding-right: 0;
  padding-left: 0;
  .student-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .rank {
      font-size: 28px;
      font-weight: 800;
      color: #35427a;
      text-align: center;
    }

    .region {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
    }
  }

  .teacher-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .major {
      margin-top: 4px;
      font-size: 14px;
      font-weight: 800;
      color: #FF8518;
      text-align: center;
    }
  }
 }
}

.arrow-left {
  align-self: center;
  position: absolute;
  right: -15px;
  top: 40%;
  z-index: 2;

  @media screen and (max-width: 1440px){
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
  left: -15px;
  top: 40%;
  z-index: 2;

  @media screen and (max-width: 1440px){
    left: 0;
  }

  .arrow-right-btn {
    background: v-bind('localOptions.navigation.goToRight.color');
    color: v-bind('localOptions.navigation.goToRight.textColor');
  }
}

.carousel {
  padding: v-bind('localOptions.carouselPadding');;
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
}

.carousel__slide--next {
}

.carousel__slide--active {
}
</style>
