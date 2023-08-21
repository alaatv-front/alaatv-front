<template>
  <div v-if="localOptions.sliderItems"
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
          <q-card class="scroll-item-card">
            <q-img :src="slide.image"
                   width="160px"
                   height="160px"
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
              <div class="student-name ellipsis-2-lines">{{ slide.first_name + ' ' + slide.last_name }}</div>
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

      <div v-if="!$q.screen.lt.md"
           class="arrow-left text-right">
        <q-btn :icon="localOptions.navigation.goToLeft.icon"
               :rounded="localOptions.navigation.goToLeft.rounded"
               class="arrow-left-btn "
               :size="localOptions.navigation.goToLeft.size"
               @click="$refs.vueCarousel.next()" />
      </div>
      <div v-if="!$q.screen.lt.md"
           class="arrow-right">
        <q-btn :icon="localOptions.navigation.goToRight.icon"
               :rounded="localOptions.navigation.goToRight.rounded"
               class="arrow-right-btn"
               :size="localOptions.navigation.goToRight.size"
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
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'PersonSlider',
  components: {
    Carousel,
    Slide,
    Pagination
  },
  mixins: [mixinWidget],
  data() {
    return {
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
        personType: 'student',
        pagination: false,
        navigation: {
          goToLeft: {
            icon: 'chevron_left',
            textColor: '#FF944A',
            color: '#FFE8D8',
            rounded: true,
            size: 'lg'
          },
          goToRight: {
            icon: 'chevron_right',
            textColor: '#FF944A',
            color: '#FFE8D8',
            rounded: true,
            size: 'lg'
          }
        }
      },
      scrollIndex: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onVirtualScroll({ index }) {
      this.scrollIndex = index
    },
    goToRight() {
      if (this.scrollIndex > 0) {
        this.scrollIndex -= 1
        this.$refs.virtualScroll.scrollTo(this.scrollIndex)
      }
    },
    goToLeft() {
      if (this.scrollIndex < this.localOptions.sliderItems.length) {
        this.scrollIndex += 1
        this.$refs.virtualScroll.scrollTo(this.scrollIndex)
      }
    },
    init() {
      if (this.$refs.virtualScroll) {
        setInterval(() => {
          this.scrollIndex += 1
          if (this.scrollIndex > this.localOptions.sliderItems.length) {
            this.scrollIndex = 0
          }
          this.$refs.virtualScroll.scrollTo(this.scrollIndex)
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-item-card {
  width: 200px;
  height: 320px;
  max-height: 350px;
  border-radius: 20px;
  margin: 0 10px 20px;
  padding: 20px 20px 8px;
  box-shadow: 0 20px 20px 0 rgb(0 0 0 / 5%);
  background-color: #fff;

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
    padding-bottom: 0;
    .student-name {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
      min-height: 40px;
    }
  }

 .person-info-card-section{
  padding-top: 0;
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
      font-size: 28px;
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
  right: 0;
  top: 33%;
  z-index: 9999;

  @media screen and (max-width: 600px){
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
  top: 33%;
  z-index: 9999;

  @media screen and (max-width: 600px){
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
}

.carousel__slide--next {
}

.carousel__slide--active {
}
</style>
