<template>
  <div class="services-widget"
       :style="options.style">
    <div class="services">
      <a v-for="(service, index) in options.services"
         :key="index"
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
    margin: 20px;
    max-width: 1600px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width: 600px){
      margin: 20px 5px;
      justify-content: center
    }
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 170px;
      color: #000000;
      text-align: center;

      @media screen and (max-width: 600px){
        width: 150px;
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
    .service {
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

    }
  }
}
</style>
