<template>
  <div class="services-widget"
       :style="options.style">
    <div class="services row q-col-gutter-md q-mt-md justify-center">
      <div v-for="(service, index) in options.services"
           :key="index"
           class="col-xs-4 col-sm-3 col-md-1">
        <a v-if="service.action === 'link'"
           class="service"
           :href="service.link"
           :title="service.title"
           target="_self">
          <div class="service-image">
            <q-img :src="service.icon" />
          </div>
          <p class="service-title">{{ service.title }}</p>
          <p class="service-subtitle">{{ service.subTitle }}</p>
        </a>
        <div v-else
             class="service cursor-pointer"
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
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'Services',
  mixins: [mixinWidget],
  data () {
    return {
    }
  },
  methods: {
    scrollToElement(id) {
      const el = document.getElementById(id)
      const headerOffset = 150
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.services-widget {
  background: white;
  border-radius: 10px;

  .services {
    justify-content: space-around;
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
