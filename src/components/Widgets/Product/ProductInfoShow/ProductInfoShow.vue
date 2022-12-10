<template>
  <div :style="options.style">
    <div class="show-product-introduction">
      <div class="product-introduction row">
        <div class="intro-features col-md-6 col-12">
          <div class="title">
            ویژگی های این محصول
          </div>
          <div class="product-info-box row">
            <div
              v-for="(info, index) in information"
              :key="index"
              class="product-info col-sm-3 col-xs-6"
            >
              <div class="product-info-inside q-ma-sm">
                <div class="info-header ">
                  <q-img :src="info.src"
                         class="info-image img"></q-img>
                  <p class="info-title">
                    {{info.title}}
                  </p>
                </div>
                <div class="info-content">
                  <div
                    v-for="(value , i) in info.value"
                    :key="i"
                    class="info-value col-6"
                  >
                    <span v-if="value">{{ value }}</span>
                    <span v-else>
                      <q-skeleton width="100px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="product.price"
               class="product-price">
            <div v-if="product.price.discountInPercent()"
                 class="discount-percent">
              <div class="percent">{{ '%' + product.price.discountInPercent() }}</div>
              <div class="discount-title">تخفیف</div>
            </div>

            <div class="price">
              <div
                v-if="product.price.toman('base', null)"
                class="product-base-price"
              >
                {{ product.price.toman('base', null) }}
              </div>

              <sapn
                v-if="product.price.toman('final', null)"
                class="product-final-price"
              >
                {{ product.price.toman('final', null) }}
              </sapn>

              <div class="product-price-title"> تومان</div>
            </div>

            <div class="action">
              <q-btn
                v-if="product.has_instalment_option"
                unelevated
                class="purchase-button pay-later"
                label="خرید اقساطی"
                text-color="white"
                icon="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png"
              />
              <q-btn
                unelevated
                class="purchase-button"
                label="خرید نقدی"
                text-color="white"
                icon="img:https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png"
                @click="addToCart"
              />
            </div>
          </div>
        </div>
        <div
          v-if="product.intro"
          class="intro-video col-md-6 col-12"
        >
          <video-player :poster="product.intro.photo"
                        :sources="videoSource()" />
        </div>
      </div>
    </div>
    <div class="show-product-demos">
      <div class="row product-demos-widget">
        <div
          class="sample-videos-pamphlet-box"
        >
          <div v-if="product.blocks && product.blocks[0] && product.blocks[0].contents"
               class="sample-videos-box">
            <p class="title-style">
              نمونه فیلم‌ها
            </p>
            <q-card
              class="sample-videos sample-cart-style"
            >
              <div
                v-if="product.loading"
                class="sample-container">
                <div
                  v-for="video in 3"
                  :key="video"
                  class="video-item"
                >
                  <q-skeleton
                    class="player"
                    min-width="100%"
                    type="card"
                  />
                </div>
              </div>
              <div
                v-else-if="product.blocks && product.blocks[0] && product.blocks[0].contents"
                class="sample-container">
                <div
                  v-for="(video, index) in product.blocks[0].contents"
                  :key="index"
                  class="video-item"
                >
                  <a :href="video.url.web"
                     target="_blank">
                    <div class="player">
                      <q-img
                        class="img"
                        :src="video.photo"
                        alt="video-poster"></q-img>
                    </div>
                  </a>
                  <p class="player-title text-center">
                    {{ video.title }}
                  </p>
                </div>
              </div>
            </q-card>
          </div>
          <div v-if="product.sample_photos.length> 0"
               class="pamphlet-box">
            <p class="title-style">
              نمونه جزوه‌ها
            </p>
            <q-card
              class="pamphlets sample-cart-style"
            >
              <div
                v-if="product.loading"
                class="sample-container">
                <div
                  v-for="item in 5"
                  :key="item"
                  class="pamphlet-item"
                >
                  <q-skeleton
                    class="pamphlet-item"
                    min-width="100%"
                    type="image"
                  />
                </div>
              </div>
              <div
                v-else-if="product.sample_photos.length> 0"
                class="sample-container">
                <light-gallery
                  :images="product.sample_photos.map( item => { return { title: item.title, url: item.photo}})"
                  :index="samplePhotosIndex"
                  :disable-scroll="true"
                  dir="ltr"
                  @close="samplePhotosIndex = null"
                />
                <div
                  v-for="(item, index) in product.sample_photos"
                  :key="index"
                  class="pamphlet-item"
                >
                  <q-img
                    :src="item.photo"
                    class="img"
                    alt="pamphlet-photo"
                    @click="samplePhotosIndex = index"
                  >
                  </q-img>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
      <!--    <product-demos :data="demo" />-->
    </div>
    <div class="show-product-review">
      <div class="product-description">
        <div
          class="description-container"
        >
          <p class="title-style">
            بررسی محصول
          </p>
          <q-skeleton
            v-if="product.loading"
            class="description-text"
            min-width="100%"
            type="article"
          />
          <q-card
            v-else
            class="description-text"
            v-html="product.description && product.description.long"
          >
          </q-card>
        </div>
      </div>
      <!--    <product-review :data="review" />-->
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins'
import { LightGallery } from 'vue-light-gallery'
import VideoPlayer from 'components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource'
import { API_Gateway } from 'src/api/APIGateway'

export default {
  name: 'ProductInfoShow',
  components: {
    VideoPlayer,
    LightGallery
  },
  mixins: [mixinWidget],
  props: {
    data: {
      type: [String, Number, Object, Product],
      default: new Product()
    },
    getData: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      samplePhotosIndex: null,
      product: new Product(),
      introduction: {
        intro: null,
        attributes: null,
        price: null,
        has_instalment_option: false
      },
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
        }
      ],
      demo: {
        contents: [],
        sample_photos: []
      },
      review: {
        long: '',
        short: '',
        slogan: ''
      }
    }
  },
  created () {
    this.loadProduct()
  },
  methods: {
    videoSource() {
      return new PlayerSourceList([{ link: this.product.intro.video }])
    },
    getProductId () {
      if (this.options.productId) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return null
    },
    loadProduct () {
      const productId = this.getProductId()
      if (!productId) {
        return
      }

      this.getProduct(productId)
    },
    getProduct (productId) {
      this.product.loading = true
      API_Gateway.product.get(productId)
        .then(product => {
          this.product = product
          this.product.loading = false
          this.setInformation()
        })
        .catch(() => {
          this.product.loading = false
        })
    },

    async addToCart() {
      const data = {
        product: {
          id: this.product.id
        }
      }
      try {
        await this.$store.dispatch('Cart/addToCart', data)
        this.$router.push({ name: 'User.Checkout.Review' })
      } catch (e) {
      }
    },

    setInformation () {
      if (!this.product.attributes) {
        return
      }
      const attributesInfoKeys = Object.keys(this.product.attributes.info)
      this.information.forEach(info => {
        const targetInfo = info.key
        const findingAttribute = attributesInfoKeys.find(attribute => (attribute === targetInfo))

        if (findingAttribute) {
          info.value = this.product.attributes.info[findingAttribute]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0 !important;
  color: #333333;
  letter-spacing: -0.03em;
}

.hide {
  display: none;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  padding-left: 15px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #BAD9FB;
  border-radius: 30px;
}

.title-text {
  font-weight: 500;
  font-size: 20px;
  line-height: 35px;
  text-align: center;
}

.product-introduction {
  .intro-features {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    align-items: center;
    @media screen and(max-width: 599px) {
      padding: 0 ;
    }

    .title {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      margin-right: 10px;
      margin-bottom: 20px;
      align-self: start;

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
      margin-bottom: 20px;
      .product-info {
        display: flex;
        justify-content: center;
        .product-info-inside {
          margin: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 120px;
          height: 156px;
          background: #FFFFFF;
          box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
          border-radius: 15px;
          @media only screen and (max-width: 1439px) {
            width: 108px;
            height: 135px;
          }
          @media only screen and (max-width: 1023px) {
            width: 100px;
            height: 102px;
          }
          @media only screen and (max-width: 599px) {
            width: 120px;
          }
          .info-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #EEF5FC;
            border-radius: 15px 15px 0 0;
            height: 110px;
            @media only screen and (max-width: 1023px) {
              height: 65px;
            }

            .info-image {
              width: 46px;
              height: 46px;
              margin: 8px 0;
              @media only screen and (max-width: 1023px) {
                width: 20px;
                height: 20px;
                margin: 4px 0;
              }
            }
          }
          .info-content {
            display: flex;
            flex-wrap: wrap;
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
              @media only screen and (max-width: 1023px) {
                font-size: 12px;
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
      width: 524px;
      padding-right: 20px;
      margin-bottom: 20px;
      @media only screen and (max-width: 1439px) {
        width: 472px;
      }
      @media only screen and (max-width: 1023px) {
        max-width: 440px;
        width: 100%;
        padding-right: 10px;
      }
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
        margin: 0 20px;
        @media only screen and (max-width: 1023px) {
          margin: 0 10px;
        }
        @media only screen and (max-width: 1023px) {
          flex-direction: column;
        }
        .product-base-price {
          text-decoration: line-through;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 24px;
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
      .purchase-button {
        display: flex;
        width: 117px;
        height: 40px;
        background-color: #4CAF50;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
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
    &:deep(.vjs-tech) {
      border-radius: 20px;
    }
    &:deep(.vjs-poster) {
      border-radius: 20px;
    }
  }

  //vjs-error-display video-js
}

.product-demos-widget {
  display: flex;
  justify-content: space-between;

  .section-title {
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

  .contents-block {
    display: flex;
    overflow: auto;
    padding: 10px 0 0 0;
    background: #ffffff;
    margin-right: 20px;
    border-radius: 20px;

    .pamphlet-image {
      min-width: 157px;
      height: 223px;
      background-color: #F2F2F2;
      color: #fdeded;
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(54 90 145 / 5%);
      border-radius: 16px;
      margin: 10px 0 19px 16px;
      cursor: pointer;

      &:deep(.q-img__image) {
        border-radius: 10px;
      }
    }
  }
}

.show-product-introduction {
  margin-bottom: 30px;
  margin-top: 30px;
}

.title-style {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;

  &::before {
    content: ".";
    color: #BAD9FB;
    font-size: 50px;
    font-weight: bold;
    line-height: 10px;
  }
}

.show-product-demos {
  margin-bottom: 30px;
}

.show-product-review {
  margin-bottom: 100px;

}

.sample-videos-pamphlet-box {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  .sample-container {
    display: flex;
    overflow: auto;
    scrollbar-color: #BAD9FB transparent;
    border-radius: 0;
    padding-bottom: 10px;
  }

  .sample-cart-style {
    background-color: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
    border-radius: 20px;
    margin-top: 20px;
    padding: 20px 20px 10px 0;
  }

  .sample-videos-box {

    .sample-videos {
      width: 655px;
      margin-right: 24px;

      .video-item {
        margin-right: 16px;

        .player {
          width: 240px;
          height: 135px;
          background-color: #C4C4C4;
          border-radius: 16px;
          margin-bottom: 10px;

          .img {
            width: 100%;
            height: 100%;
            border-radius: inherit;

          }
        }

        .player-title {
          height: 44px;
          font-weight: 500;
          font-size: 12px;
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;

        }
      }
    }
  }

  .pamphlet-box {
    .pamphlets {
      width: 461px;

      .pamphlet-item {
        min-width: 112px;
        height: 160px;
        background-color: #F2F2F2;
        color: #fdeded;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
        border-radius: 16px;
        margin: 10px 0 19px 16px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
        }
      }
    }
  }
}

.product-description {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;

  .description-container {
    width: 1140px;

    .description-text {
      background-color: #FFFFFF;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
      border-radius: 20px;
      margin-top: 20px;
      padding: 10px 20px;
    }
  }
}

@media screen and (max-width: 1199px){
  .sample-videos-pamphlet-box {
    .sample-videos-box {
      .sample-videos {
        width: 520px;
      }
    }

    .pamphlet-box {
      .pamphlets {
        width: 364px;
      }
    }
  }

  .product-description {
    .description-container {
      width: 908px;

      .description-text {

      }
    }

  }
}
@media screen and (max-width: 991px){
  .sample-videos-pamphlet-box {
    margin-bottom: 30px;

    .sample-videos-box {
      width: 392px;
      margin-left: 16px;
    }

    .pamphlet-box {
      width: 276px;
    }
  }

  .product-description {
    .description-container {
      width: 684px;
    }
  }
}
@media screen and (max-width: 767px){
  .title-style {
    width: 100%;
  }

  .sample-videos-pamphlet-box {
    flex-direction: column;
    margin-right: 30px;

    .sample-videos-box {
      width: 100%;
      margin-bottom: 40px;

      .sample-videos {
        background-color: transparent;
        width: 100%;
        box-shadow: none;
        margin-left: 0;
        padding: 0;
        border-radius: 0;

        .video-item {
          .player {
            width: 300px;
            height: 170px;
            border-radius: 16px;
          }
        }
      }
    }

    .pamphlet-box {
      width: 100%;

      .pamphlets {
        width: 100%;
        background-color: transparent;
        box-shadow: none;
        padding: 10px 0;
        border-radius: 0;

        .pamphlet-item {
          min-width: 105px;
          height: 150px;
          background: #FFFFFF;
          box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
          border-radius: 12px;
          cursor: pointer;
        }
      }
    }
  }

  .product-description {
    width: 100%;

    .description-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 30px;

      .description-text {
        width: 516px;
      }
    }

  }
}
@media screen and (max-width: 575px){
  .sample-videos-pamphlet-box {
    margin-right: 16px;
    margin-bottom: 30px;

    .sample-videos-box {
      width: 100%;
      margin-bottom: 30px;

      .sample-videos {
        background-color: transparent;
        width: 100%;
        box-shadow: none;

        .video-item {
          .player {
            width: 240px;
            height: 135px;
            border-radius: 16px;

          }
        }
      }
    }

    .pamphlet-box {
      width: 100%;

      .pamphlets {
        padding: 0;
        width: 100%;
        background-color: transparent;
        box-shadow: none;

        .pamphlet-item {
          width: 70px;
          height: 100px;
          min-width: 70px;
          border-radius: 8px;
          margin: 0 0 5px 10px;
        }
      }
    }
  }

  .product-description {
    .description-container {
      margin: 0 16px;

      .description-text {
        width: 100%;
      }
    }

  }
}
</style>
