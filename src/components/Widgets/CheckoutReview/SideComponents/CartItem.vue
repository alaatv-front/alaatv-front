<template>
  <div class="cart-item">
    <div class="item-info-box row justify-between">
      <div class="info-photo col-1">
        <q-img :src="cartItem.product.photo" />
      </div>
      <div class="info-details col-7">
        <div class="title">{{ cartItem.product.title }}</div>
        <div
          v-if="infoDetails[infoDetails.length - 1] && cartItem.product.attributes"
          class="more-info-box col-3"
        >
          <div
            v-for="(info, index) in infoDetails"
            :key="index"
            class="info"
          >
            <div v-if="info.name">
              <q-icon :name="info.icon" />
              <span class="info-desc">{{ info.title }} {{ (info.desc)? ':' : ''}} {{ info.desc }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-btn-box col-3">
        <q-btn
          class="delete-btn"
          icon="isax:trash"
          rounded
          flat
          :loading="loading"
          @click="deleteItem"
        >
          <template v-slot:loading>
            <q-spinner
              color="primary"
            />
          </template>
        </q-btn>
        <q-btn
          class="more-btn"
          icon="isax:more-circle"
          rounded
          flat
          :loading="loading"
          @click="toggleMenu"
        >
          <template v-slot:loading>
            <q-spinner
              color="primary"
            />
          </template>
        </q-btn>
      </div>
    </div>
    <div
      v-if="hasGrand"
      class="grand-item-other-items-box"
    >
      lsdifjlskdfjlskdfjsdlkf
    </div>
    <div class="item-detail-box"></div>
  </div>
</template>

<script>
import { CartItem } from 'src/models/CartItem'

export default {
  name: 'CartItem',
  props: {
    rawItem: {
      type: Object,
      default () {
        return {}
      }
    },
    hasGrand: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cartItem: new CartItem(),
      loading: false,
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
    this.updateCartItem()
    this.fillInfoDetails()
  },
  mounted () {
    this.updateCartItem()
    this.fillInfoDetails()
  },
  methods: {
    fillInfoDetails () {
      if (!this.cartItem.product.attributes) {
        return
      }
      const allInfos = this.cartItem.product.attributes.info
      this.infoDetails.forEach((info, index) => {
        if (allInfos[info.name]) {
          info.desc = this.getDescriptionString(allInfos[info.name])
        } else if (info.name !== 'main') {
          info.name = ''
        }
      })
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
    deleteItem () {},
    toggleMenu () {},
    updateCartItem () {
      if (this.hasGrand) {
        this.cartItem.product = this.rawItem.grand
        this.cartItem.order_product = this.rawItem.order_product
        return
      }
      this.cartItem = new CartItem(this.rawItem)
    }
  }
}
</script>

<style lang="scss">
.cart-item {
  .item-info-box {
    .info-photo {
      .q-img {
        border-radius: 10px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.cart-item {
  padding: 20px 30px;
  .item-info-box {
    .info-photo {
      width: 140px;
      height: 140px;
    }
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
}
</style>
