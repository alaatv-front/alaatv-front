<template>
  <div class="product-introduction row">
    <div class="intro-features col-lg-6 col-md-7 col-12">
      <div class="title">
        ویژگی های این محصول
      </div>

      <div class="product-info-box row">
        <div
          v-for="(info, index) in information"
          :key="index"
          class="product-info-container col-sm-3 col-xs-6"
        >
          <div class="product-info q-ma-sm">
            <div class="info-header ">
              <q-img :src="info.src" class="info-image"/>
              <p class="info-title">
                {{info.title}}
              </p>
            </div>
            <div class="info-content">
              <div
                v-for="(value , i) in info.value"
                class="info-value col-6"
                :key="i"
              >
                <span v-if="value">{{ value }}</span>
                <span v-else>
                <q-skeleton width="100px"/>
              </span>

              </div>
            </div>
          </div>


        </div>
      </div>

      <div v-if="givenData.price" class="product-price">
        <div class="price-section">
          <span v-if="givenData.price.discountInPercent()" class="discount-percent">
            <div class="percent">{{ '%' + givenData.price.discountInPercent() }}</div>
            <div class="discount-title">تخفیف</div>
          </span>
          <span class="price">
            <span
              v-if="givenData.price.toman('base', null)"
              class="product-base-price"
            >
              {{ givenData.price.toman('base', null) }}
            </span>

            <sapn
              v-if="givenData.price.toman('final', null)"
              class="product-final-price"
            >
              {{ givenData.price.toman('final', null) }}
            </sapn>

            <div class="product-price-title"> تومان</div>
          </span>
        </div>

        <div class="action">
          <q-btn
            v-if="givenData.has_instalment_option"
            class="purchase-button pay-later"
            label="خرید اقساطی"
            text-color="white"
            icon="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png"
          />
          <q-btn
            class="purchase-button"
            label="خرید نقدی"
            text-color="white"
            icon="img:https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png"
          />
        </div>
      </div>
    </div>
    <div v-if="givenData.intro" class="intro-video col-lg-6 col-md-5 col-12">
      <video-player :poster="givenData.intro.photo" :sources="givenData.intro.video"/>
    </div>
    <div v-else class="intro-video-skeleton col-lg-6 col-md-5 col-12">
      <q-skeleton class="video-skeleton"/>
    </div>
  </div>
</template>

<script>
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'productIntroduction',
  components: { VideoPlayer },
  mixins:[mixinWidget],
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      information: [
        {
          key: 'teacher',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-teacher.png\n',
          title: 'مدرس',
          value: []
        },
        {
          key: 'production_year',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-calendar.png\n',
          title: 'سال تولید',
          value: []
        },
        {
          key: 'major',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-book.png\n',
          title: 'رشته',
          value: []
        },
        {
          key: 'shipping_method',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-document-download.png\n',
          title: 'مدل دریافت',
          value: []
        },
      ],
      givenData: {
        intro: null,
        attributes: null,
        price: null,
        has_instalment_option: false
      }
    }
  },
  created () {
    this.setInformation()
  },
  watch: {
    data:{
      deep: true,
      handler(newValue) {
        const sources = []
        Object.assign(this.givenData,newValue)
        if(this.givenData.intro && this.givenData.intro.video) {
          this.givenData.intro.video = sources.push(this.givenData.intro.video)
        }
        this.setInformation()
      }
    }
  },
  methods: {
    setInformation () {

      if(!this.givenData.attributes) {
        return
      }
      const attributesInfoKeys = Object.keys(this.givenData.attributes.info)
      this.information.forEach(info => {
        const targetInfo = info.key
        const findingAttribute = attributesInfoKeys.find(attribute => (attribute === targetInfo))

        if (findingAttribute) {
          info.value = this.givenData.attributes.info[findingAttribute]
        }
      })
    },
    addToCart (hasInstallment) {
      this.$emit('addToCart', {
        product: this.product.eec.getData(),
        ...(typeof hasInstallment === 'boolean' && { hasInstallment: hasInstallment })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.product-introduction {
  .intro-features {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 599px){
      padding: 0;
    }
    .title {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        margin-right: 10px;

        &::before {
          content: ".";
          color: #BAD9FB;
          font-size: 50px;
          font-weight: bold;
          line-height: 10px;
        }
    }
    .product-info-box {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .product-info-container {
        justify-content: center;
        display: flex;
        .product-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 156px;
          width: 130px;
          background: #FFFFFF;
          box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
          border-radius: 15px;
          .info-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #EEF5FC;
            border-radius: 15px 15px 0 0;
            height: 110px;
            .info-image {
              width: 46px;
              height: 46px;
              margin-bottom: 8px;
            }
          }
          .info-content {
            display: flex;
            padding: 10px;
            .info-value {
              text-align: center;
              &:after {
                content: '-';
                padding: 0 2px;
              }
              &:last-child {
                &:after {
                  display: none;
                }
              }
            }
          }
        }
      }

    }
    .product-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      height: 70px;
      border-radius: 20px;
      @media screen and (max-width: 1479px){
        max-width: 560px;
        width: 100%;
      }
      @media screen and (max-width: 599px){
        //max-width: 100;
      }
      .price-section {
        display: flex;
        .discount-percent {
          width: 120px;
          height: 70px;
          background-color: #E05555;
          color: #ffffff;
          border-radius: 20px 0 0 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          .percent {
            margin-right: 5px;
          }
        }
        .price {
          display: flex;
          align-items: center;
          margin: 0 30px;
          .product-base-price {
            text-decoration: line-through;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            margin-left: 18px;
            color: #E05555;
            margin-right: 10px;
          }
          .product-final-price {
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 31px;
            letter-spacing: -0.05em;
            margin-left: 5px;
            margin-right: 10px;
          }
          .product-price-title {
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
            line-height: 17px;
          }
        }
      }
      .purchase-button {
        display: flex;
        width: 117px;
        height: 40px;
        background-color: #4CAF50;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        &.pay-later {
          background-color: #75B7FF;
        }
      }

    }
  }
  .intro-video {
    &:deep(.vjs-error-display) {
      border-radius: 20px;
    }
    &:deep(.video-js) {
      border-radius: 20px;
    }
    &:deep(.vjs-poster) {
      border-radius: 20px;
    }
  }
  .intro-video-skeleton {
    .video-skeleton {
      border-radius: 20px;
      height: 100%;
    }
  }

  //vjs-error-display video-js
}
</style>

