<template>
  <div class="donate bg-white">
    <p>کمک مالی به آلاء</p>
    <q-separator />
    <div class="row q-my-md text-center reverse-wrap">
      <div class="flex items-center"
           style="font-size: 14px">
        <div class="q-mr-sm">5000 تومان به آلاء کمک</div>
        <q-btn-toggle v-model="donate"
                      unelevated
                      glossy
                      toggle-color="primary"
                      :options="[
                        {label: 'میکنم', value: 'doHelp'},
                        {label: 'نمیکنم', value: 'dontHelp'},
                      ]"
                      @update:model-value="doAction()" />
        <!--        <q-btn :class="{activeHelp:!helpAlaa}"-->
        <!--               :disable="!disableCostButton"-->
        <!--               class="donate-help col-md-12 col-xs-6 border text-center q-py-sm"-->
        <!--               label="به آلاء کمک نمیکنم"-->
        <!--               @click="helpAlaa=false; activeDonateCost()" />-->
        <!--        <div class="cost row text-center q-mt-md col-md-12 col-xs-6">-->
        <!--          <q-btn v-for="(cost,idx) in donateCost"-->
        <!--                 :key="idx"-->
        <!--                 :label="cost.cost"-->
        <!--                 :class="{activeDonate:cost.isActive}"-->
        <!--                 :disable="disableCostButton"-->
        <!--                 class="cost-donate col border q-mx-xs q-pa-sm"-->
        <!--                 @click="activeDonateCost(idx); helpAlaa=true" />-->
        <!--        </div>-->
      </div>
      <div class="col-md-4 col-sm-3 col-xs-12">
        <lazy-img :src="src"
                  :alt="src"
                  width="1"
                  height="1" />
      </div>
    </div>
  </div>
</template>

<script>
import { Cart } from 'src/models/Cart.js'
import LazyImg from 'components/lazyImg.vue'
import { Product } from 'src/models/Product.js'

export default {
  name: 'Donate',
  components: { LazyImg },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cart: {
      type: Cart,
      default: new Cart()
    }
  },
  data() {
    return {
      donate: 'dontHelp',
      helpAlaa: false,
      disableCostButton: false,

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
  mounted() {
    if (this.cart.order_has_donate) {
      this.donate = 'doHelp'
      this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-happy.png'
    } else {
      this.donate = 'dontHelp'
      this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-sad.png'
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
    activeDonateCost(idx) {
      if (!this.helpAlaa) {
        this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-sad.png'
      }
      this.donateCost.forEach(e => {
        e.isActive = false
      })
      if (typeof idx === 'number') {
        this.donateCost[idx].isActive = true
        if (idx === 0 || idx === 1) {
          this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-happy.png'
        } else {
          this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-veryHappy.png'
        }
      }
      this.addDonateToCart()
    },
    removeDonateFromCart() {
      this.$store.dispatch('Cart/removeItemFromCart', new Product({ id: 180 }))
        .then(() => {
          this.$emit('cartReview')
          this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-sad.png'
        })
        .catch(() => {})
    },
    addDonateToCart() {
      this.$store.dispatch('Cart/addToCart', new Product({ id: 180 }))
        .then(() => {
          this.$emit('cartReview')
          this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-happy.png'
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.donate {
  border-radius: 10px;
  box-shadow: 0 6px 5px rgba(0, 0, 0, 0.03);
  padding: 16px 30px;
  color: #575962;
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
