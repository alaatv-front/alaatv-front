<template>
  <div v-if="hasGrand">
    <div class="cart-item">
      <div class="title-above">{{ rawItem.grand.title }}
      </div>
      <div class="item-info-box row justify-between">
        <div class="info-photo col-sm-2 col-xs-3">
          <lazy-img :src="rawItem.grand.photo"
                    :alt="rawItem.grand.title"
                    width="1"
                    height="1" />
        </div>
        <div class="info-details col-sm-7 col-xs-7">
          <div class="title">{{ rawItem.grand.title }}</div>
          <div class="more-info-box">
            <!--       v-if="infoDetails[infoDetails.length - 1] && cartItem.product.attributes"-->
            <div v-for="(info, index) in infoDetails"
                 :key="index"
                 class="info">
              <div v-if="info.name">
                <q-icon :name="info.icon" />
                <span class="info-desc">{{ info.title }} {{ (info.desc) ? ':' : '' }} {{ info.desc }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="info-btn-box col-sm-2 col-xs-1">
          <q-btn class="delete-btn"
                 icon="isax:trash"
                 rounded
                 flat
                 :loading="loading"
                 @click="deleteItem">
            <template v-slot:loading>
              <q-spinner color="primary" />
            </template>
          </q-btn>
          <q-btn class="more-btn"
                 icon="isax:more-circle"
                 rounded
                 flat
                 :loading="loading"
                 @click="toggleMenu">
            <template v-slot:loading>
              <q-spinner color="primary" />
            </template>
          </q-btn>
        </div>
      </div>
      <div class="grand-item-other-items-box row">
        <div class="col-md-2 clear-space" />
        <div class="col-md-10 col-sm-12">
          <cart-items-grand-mode v-for="(item, index) in rawItem.order_product.list"
                                 :key="index"
                                 :cart-item="item" />
        </div>
      </div>
      <div class="item-detail-box row items-center">
        <div class="clear-space col-md-2" />
        <div class="time-receive col-sm-3 col-xs-12 q-py-xs q-pr-sm text-center">
          <q-icon class="q-mr-xs"
                  color="primary"
                  size="20px"
                  name="isax:truck" />
          <span>زمان دریافت: {{ rawItem.order_product.list[0].product.attributes.info.download_date[0] }}</span>
        </div>
        <div class="row col-md-7 col-sm-8 col-xs-12 justify-end">
          <div class="price-detail q-mr-xl">
            <div class="discount flex  justify-between ">
              <div class="flex items-center">
                <div class="discount-percent q-ml-md text-white q-pa-xs">{{ 30 }}%</div>
                <div class="price-base q-ml-sm">{{ 25000 }}</div>
              </div>
              <div class="price q-mx-md"><span>{{ 25000 }} تومان</span></div>
            </div>
          </div>
          <div class="product-detail row items-center justify-between ">
            <router-link :to="{name: 'Public.Product.Show', params:{id: id?id:-1}}"
                         class="go-product text-primary text-center">
              رفتن
              به صفحه محصول
            </router-link>
            <q-expansion-item v-model="expanded"
                              class="text-center"
                              label="جزئیات محصول"
                              style="max-width: 155px">
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                  corrupti
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="cart-item">
      <div class="title-above">{{ cartItem.product.title }}
      </div>
      <div class="item-info-box row justify-between">
        <div class="info-photo col-sm-2 col-xs-3">
          <lazy-img :src="cartItem.product.photo"
                    width="1"
                    height="1" />
        </div>
        <div class="info-details col-sm-7 col-xs-7">
          <div class="title">{{ cartItem.product.title }}</div>
          <div class="more-info-box">
            <!--       v-if="infoDetails[infoDetails.length - 1] && cartItem.product.attributes"-->
            <div v-for="(info, index) in infoDetails"
                 :key="index"
                 class="info">
              <div v-if="info.name">
                <q-icon :name="info.icon" />
                <span class="info-desc">{{ info.title }} {{ (info.desc) ? ':' : '' }} {{ info.desc }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="info-btn-box col-sm-2 col-xs-1">
          <q-btn class="delete-btn"
                 icon="isax:trash"
                 rounded
                 flat
                 :loading="loading"
                 @click="deleteItem">
            <template v-slot:loading>
              <q-spinner color="primary" />
            </template>
          </q-btn>
          <q-btn class="more-btn"
                 icon="isax:more-circle"
                 rounded
                 flat
                 :loading="loading"
                 @click="toggleMenu">
            <template v-slot:loading>
              <q-spinner color="primary" />
            </template>
          </q-btn>
        </div>
      </div>
      <div class="grand-item-other-items-box row" />
      <div class="item-detail-box row items-center">
        <div class="clear-space col-md-2" />
        <div class="time-receive col-sm-3 col-xs-12 q-py-xs q-pr-sm text-center">
          <q-icon class="q-mr-xs"
                  color="primary"
                  size="20px"
                  name="isax:truck" />
          <span>زمان دریافت: {{ cartItem.product.attributes.info.download_date[0] }}</span>
        </div>
        <div class="row col-md-7 col-sm-8 col-xs-12 justify-end">
          <div class="price-detail q-mr-xl">
            <div class="discount flex  justify-between ">
              <div class="flex items-center">
                <div class="discount-percent q-ml-md text-white q-pa-xs">{{ 30 }}%</div>
                <div class="price-base q-ml-sm">{{ 25000 }}</div>
              </div>
              <div class="price q-mx-md"><span>{{ 25000 }} تومان</span></div>
            </div>
          </div>
          <div class="product-detail row items-center justify-between ">
            <router-link :to="{name: 'Public.Product.Show', params:{id: id?id:-1}}"
                         class="go-product text-primary text-center">
              رفتن
              به صفحه محصول
            </router-link>
            <q-expansion-item v-model="expanded"
                              class="text-center"
                              label="جزئیات محصول"
                              style="max-width: 155px">
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                  corrupti
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { CartItem } from 'src/models/CartItem.js'
import { OrderProduct } from 'src/models/OrderProduct.js'
import CartItemsGrandMode from 'src/components/Widgets/CheckoutReview/SideComponents/CartItemsGrandMode.vue'

export default {
  name: 'CartItem',
  components: { LazyImg, CartItemsGrandMode },
  props: {
    rawItem: {
      type: CartItem,
      default: new CartItem()
    },
    cartItem: {
      type: OrderProduct,
      default: new OrderProduct()
    },
    hasGrand: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  compouted: {
    localCartItem: {
      get () {
        return this.cartItem
      },
      set (newValue) {
        this.$emit('update:cartItem', newValue)
      }
    }
  },
  data () {
    return {
      // cartItem: new CartItem(),
      loading: false,
      expanded: false,
      discount: 0,
      totalPrice: 0,
      infoDetails: [
        {
          name: 'main',
          icon: 'isax:teacher',
          title: 'گروه آموزشی آلاء',
          desc: ''
        },
        {
          name: 'major',
          icon: 'isax:book',
          title: 'رشته',
          desc: ''
        },
        {
          name: 'shipping_method',
          icon: 'isax:document-download',
          title: 'نحوه دریافت',
          desc: ''
        },
        {
          name: 'services',
          icon: 'isax:box',
          title: 'خدمات اصلی',
          desc: ''
        },
        {
          name: 'duration',
          icon: 'isax:clock',
          title: 'مدت برنامه',
          desc: ''
        },
        {
          name: 'educational_system',
          icon: 'isax:document-text',
          title: 'کنکور',
          desc: ''
        },
        {
          name: 'production_year',
          icon: 'isax:record',
          title: 'سال تولید',
          desc: ''
        }
        // {
        //   name: '',
        //   icon: 'isax:tag-user',
        //   title: 'دبیر',
        //   desc: ''
        // }
      ]
    }
  },
  watch: {
    rawItem: {
      handler (newValue, oldValue) {
        this.updateCartItem()
      },
      deep: true
    }
  },
  created () {
    // setTimeout(() => {
    //   console.log(this.rawItem)
    // }, 1000)
    // this.updateCartItem()
    this.fillInfoDetails()
  },
  mounted () {
    // this.updateCartItem()
    this.fillInfoDetails()
    // this.calcTotalPrice()
    // this.calcDiscount()
  },
  methods: {
    fillInfoDetails () {
      if (this.hasGrand) {
        if (!this.rawItem.order_product.list[0].product.attributes) {
          return
        }
        const allInfos = this.rawItem.order_product.list[0].product.attributes.info
        this.infoDetails.forEach((info, index) => {
          if (allInfos[info.name]) {
            info.desc = this.getDescriptionString(allInfos[info.name])
          } else if (info.name !== 'main') {
            info.name = ''
          }
        })
      } else {
        if (!this.localCartItem.product.attributes) {
          return
        }
        const allInfos = this.localCartItem.product.attributes.info
        this.infoDetails.forEach((info, index) => {
          if (allInfos[info.name]) {
            info.desc = this.getDescriptionString(allInfos[info.name])
          } else if (info.name !== 'main') {
            info.name = ''
          }
        })
      }
    },
    getDescriptionString (descArray) {
      let fullString = ''
      descArray.forEach((string, index) => {
        if (!descArray[index + 1]) {
          fullString += string
          return
        }
        fullString += string + ' . '
      })
      return fullString
    },
    deleteItem () {
      if (this.localCartItem.order_product) {
        const idx = this.items.findIndex(item => item.grand.id === this.localCartItem.product.id)
        this.items.splice(idx, 1)
      } else {
        // const idx = this.items[this.items.length - 1].order_product.findIndex(product => product.id === this.localCartItem.id)
      }
      // this.items.findIndex(item=>item.)
    },
    toggleMenu () {
    },
    calcDiscount () {
      if (this.hasGrand) {
        let discount = 0
        this.localCartItem.order_product.forEach(e => {
          discount += e.price.discount
        })
        this.discount = (discount / this.totalPrice) * 100
      } else {
        this.discount = (this.localCartItem.price.discount / this.localCartItem.price.base) * 100
      }
    },
    calcTotalPrice () {
      if (this.hasGrand) {
        this.localCartItem.order_product.forEach(e => {
          this.totalPrice += e.price.final
        })
        this.localCartItem.price.final = this.totalPrice
      }
    },
    updateCartItem () {
      if (this.hasGrand) {
        this.localCartItem.grand = this.rawItem.grand
        this.localCartItem.order_product = this.rawItem.order_product
        return
      }
      this.localCartItem = new CartItem(this.rawItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-item {
  padding: 20px;

  .title-above {
    font-weight: 500;
    font-size: 16px;
    line-height: 27px;
    margin-bottom: 10px;
  }

  .item-info-box {
    /* .info-photo { */

    /*    width: 140px; */

    /*    height: 140px; */

    /* } */

    .info-details {
      .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 27px;
        margin-bottom: 10px;
      }

      .more-info-box {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;

        .info {
          margin-bottom: 8px;

          .info-desc {
            margin-left: 5px;
          }
        }
      }
    }

    .info-btn-box {
      text-align: right;
    }
  }

  .item-detail-box {
    .time-receive {
      width: 170px;
      background: linear-gradient(to right, rgb(255 255 255 / 0%) 0%, rgb(255 144 0 / 20%) 100%);
      border-radius: 6px;
      margin-top: 5px;
    }

    .price-detail {
      align-self: center;

      .price {
        font-weight: 500;
        font-size: 18px;
        color: #575962;
        margin-bottom: 2px;
      }
    }

    .discount-percent {
      border-radius: 8px 8px 8px 0;
      background: #EF5350;
    }

    .price-base {
      text-decoration: line-through;
      color: #EF5350;
    }
  }
}

.q-item__section--main {
  .q-item__section--side {
    padding: 0 !important;
  }
}

.q-item {
  padding: 0 !important;
}

@media (width <= 1439px) {
  .clear-space {
    display: none;
  }
}

@media (width >= 600px) {
  .title-above {
    display: none;
  }
}

@media (width <= 600px) {
  .title {
    display: none;
  }

  .cart-item {
    padding: 16px;
  }

  .time-receive {
    margin-bottom: 20px;
  }

  .product-detail, .price-detail {
    width: 100%;
  }
}
</style>
