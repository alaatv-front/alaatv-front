<template>
  <div class="services-widget"
       :style="options.style">
    <div class="services row q-col-gutter-md q-mt-md justify-center">
      <div v-for="(service, index) in options.services"
           :key="index"
           class="col-xs-4 col-sm-3 col-md-2">
        <div class="service">
          <div v-if="service.link">
            <a class="service"
               :href="service.link"
               :title="service.title"
               target="_self">
              <div class="service-image">
                <q-img :src="service.icon" />
              </div>
              <p class="service-title">{{ service.title }}</p>
              <p class="service-subtitle">{{ service.subTitle }}</p>
            </a>
          </div>
          <div v-else-if="service.scrollTo"
               class="cursor-pointer"
               @click="scrollToElement(service.scrollTo)">
            <div class="service-image">
              <q-img :src="service.icon" />
            </div>
            <p class="service-title">{{ service.title }}</p>
            <p class="service-subtitle">{{ service.subTitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'Services',
  mixins: [mixinWidget],
  props: {
    data: {
      type: [Array, Object],
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      defaultOptions: {
        className: '',
        style: {},
        services: []
      }
    }
  },
  methods: {
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 100
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    goToLink(service) {
      if (service.link[0] === '#') {
        return { name: 'Public.Home', hash: '.banner-header-8' }
      } else {
        return { path: service.link }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.services-widget {
  background: white;
  display: flex;
  justify-content: center;
  border-radius: 10px;

  .services {
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #000000;
      text-align: center;
      &:hover, &:focus {
        .service-image {
          .q-img {
            transform: scale(.9);
          }
          &:after {
            transform: rotate(135deg);
          }

        }
      }
      .service-image {
        width: 92px;
        height: 92px;
        display: block;
        position: relative;
        margin: 0 auto;

        .q-img {
          margin: 20px;
          transition: transform .4s ease;
          -webkit-transition: transform .4s ease;
          -moz-transition: transform .4s ease;
          width: 52px;
        }

        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #e4e4e4;
          border-radius: 50%;
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #ffc107;
          border-radius: 50%;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(-45deg);
          transition: transform .4s ease;
          -webkit-transition: transform .4s ease;
          -moz-transition: transform .4s ease;
        }

        @media screen and (max-width: 599px) {
          width: 70px;
          height: 70px;
          .q-img {
            width: 40px;
            margin-top: 15px;
          }
        }
      }
      .service-title {
        font-weight: bold;
      }
      .service-subtitle {
        font-size: 12px;
        color: var(--alaa-TextSecondary);
      }
    }
  }
}
</style>
