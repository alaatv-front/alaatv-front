<template>
  <div class="donate bg-white">
    <p>کمک مالی به آلاء</p>
    <q-separator />
    <div class="row q-my-md text-center reverse-wrap">
      <div class="col-md-6 col-sm-7 col-xs-12 flex items-center"
           style="font-size: 14px">
        <div class="q-mr-sm">5000 تومان به آلاء کمک</div>
        <q-btn-toggle v-model="donate"
                      class="donate-toggle-btn"
                      toggle-color="primary"
                      :options="[
                        {label: 'میکنم', value: 'doHelp'},
                        {label: 'نمیکنم', value: 'dontHelp'},
                      ]"
                      @update:model-value="doAction()" />
      </div>
      <div class="col-md-6 col-sm-5 col-xs-12">
        <lazy-img :src="donateImage"
                  :alt="donateImage"
                  class="full-width"
                  width="1"
                  height="1" />
      </div>
      <q-inner-loading :showing="cart.loading">
        <q-spinner-gears size="50px"
                         color="primary" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'Donate',
  components: { LazyImg },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      donate: 'dontHelp',
      helpAlaa: false,
      disableCostButton: false,
      donateProductId: 180,

      donateCost: [
        {
          cost: 5000,
          isActive: false
        }
        // {
        //   cost: 10000,
        //   isActive: false
        // }, {
        //   cost: 20000,
        //   isActive: false
        // }
      ],
      src: 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-sad.png'
    }
  },
  computed: {
    cart () {
      return this.$store.getters['Cart/cart']
    },
    hasDonate () {
      return this.cart.order_has_donate
    },
    donateImage () {
      const sadImage = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-sad.png'
      const happyImage = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-happy.png'
      return this.hasDonate ? happyImage : sadImage
    }
  },
  watch: {
    hasDonate: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          this.donate = 'doHelp'
        } else {
          this.donate = 'dontHelp'
        }
      }
    }
  },
  methods: {
    doAction() {
      if (this.donate === 'doHelp') {
        this.addDonateToCart()
      } else {
        this.removeDonateFromCart()
      }
    },
    removeDonateFromCart() {
      this.$store.dispatch('Cart/removeItemFromCart', new Product({ id: this.donateProductId }))
        .then(() => {
          this.$emit('cartReview')
        })
        .catch(() => {})
    },
    addDonateToCart() {
      this.$store.dispatch('Cart/addToCart', { product: new Product({ id: this.donateProductId }) })
        .then(() => {
          this.$emit('cartReview')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/Theme/colors.scss';
.donate {
  border-radius: 10px;
  box-shadow: 0 6px 5px rgba(0, 0, 0, 0.03);
  padding: 16px 30px;
  color: #575962;
}

.donate-toggle-btn{
  &.q-btn-group{
    :deep(.q-btn) {
      .q-btn__content{
        color:$grey-9 !important;
      }
    }
  }

}

.donate-help:hover {
  border-color: #FF9000;
  color: #FF9000;
}

.cost-donate:hover {
  border-color: #4CAF50;
  color: #4CAF50
}

.border {
  border: 2px solid #575962;
  border-radius: 8px;
}

.activeHelp {
  border-color: #FF9000;
  color: #FF9000;
}

.activeDonate {
  border-color: #4CAF50;
  color: #4CAF50
}

@media (max-width: 1024px) {
  .cost {
    margin-top: 0;
  }
}
</style>
