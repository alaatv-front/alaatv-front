<template>
  <div class="cart-container">
    <div v-if="host">
      ({{ host }})
    </div>
    <template v-if="loading && !isEwanoUser">
      <q-skeleton type="circle" />
    </template>
    <template v-else>
      <template v-if="!loading && !isEwanoUser">
        <div class="cart-image">
          <q-img v-if="hasPaid"
                 src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/thankyou_page.png" />
          <q-icon v-else
                  name="error"
                  color="red" />
        </div>
        <div v-if="hasPaid"
             class="title">
          ثبت نام شما با موفقیت انجام شد
        </div>
        <div v-else
             class="title">
          متاسفانه پرداخت انجام نشد :(
        </div>
      <!--    <div class="tracking-code-container">-->
      <!--      <span class="tracking-code-title">کد پیگیری:</span>-->
      <!--      <span class="tracking-code">{{ trackingCode }}</span>-->
      <!--    </div>-->
      </template>
      <template v-if="!loading">
        <q-btn v-if="ticketId"
               :to="{name: 'UserPanel.Ticket.Show', params: {id: ticketId}}"
               color="primary"
               class="redirect-element">
          مشاهده تیکت مربوطه
        </q-btn>
        <router-link v-if="hasPaid"
                     :to="{name: 'UserPanel.MyPurchases'}"
                     class="redirect-element">
          فیلم ها و جزوه های من
        </router-link>
        <router-link v-else
                     :to="{name: 'Public.Shop'}"
                     class="redirect-element">
          بازگشت به فروشگاه
        </router-link>
      </template>
    </template>
  </div>
</template>

<script>
import { Capacitor } from '@capacitor/core'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import mixinEwano from 'src/components/Widgets/Ewano/mixinEwano.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'

export default {
  name: 'ThankYouPage',
  mixins: [mixinAuth, mixinEwano],
  data () {
    return {
      host: null,
      loading: false,
      hasPaid: false
    }
  },
  computed: {
    orderId () {
      return this.$route.params.orderId
    },
    ticketId () {
      return this.$route.query.ticket
    }
  },
  mounted () {
    this.setIsEwanoUserValue()
    this.onLoadPage()
    this.$bus.on('ThankYouPageInvoiceLoading', (status) => {
      this.loading = status
    })
    // alaa-app://alaatv.com/payment
    if (Capacitor.isNativePlatform()) {
      this.host = window.location.href
    }
    if (Capacitor.isNativePlatform() && window.location.href.indexOf('localhost') === -1) {
      const pathArray = window.location.href.split('/')
      const orderId = pathArray[pathArray.length - 2]
      alert('UserPanel.ThankYouPage with orderId: ' + orderId)
      window.parent.postMessage({
        message: 'backToCartPage',
        orderId
      }, '*')
      alert('after postMessage' + document.location.href)
      alert(document.location.href.replace('https://alaatv.com', 'https://localhost'))

      // this.$router.push({ name: 'UserPanel.ThankYouPage', params: { orderId } })
      this.$router.push(window.location.href.replace('https://alaatv.com', 'https://localhost'))
      // document.location = window.location.href.replace('https://alaatv.com', 'alaa-app://alaatv.com')
      //   .replace('http://alaatv.com', 'alaa-app://alaatv.com')
    }
  },
  methods: {
    pushPurchaseEvent (order) {
      const AEEData = order.getAEEData()
      AEE.purchase(AEEData.actionField, AEEData.products)
    },
    clearCart () {
      const cart = this.$store.getters['Cart/cart']
      cart.removeAllItems()
      this.$store.commit('Cart/updateCart', cart)
    },
    onLoadPage () {
      this.clearCart()
      this.loading = true
      this.$store.dispatch('Cart/reviewCart')
      APIGateway.cart.getorderWithTransaction(this.orderId)
        .then((order) => {
          this.loading = false

          if (order.paymentstatus.id === 3) {
            this.hasPaid = true
            this.pushPurchaseEvent(order)
          } else if (order.paymentstatus.id === 1) {
            this.hasPaid = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.cart-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  //margin-bottom: 100px;

  .cart-image {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.7;
    width: 245px;
    height: 245px;
    font-size: 200px;
  }

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    text-align: center;
    color: #6D708B;
    margin-top: 62px;
    letter-spacing: -0.03em;
  }

  .tracking-code-container {
    font-style: normal;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.03em;
    color: #6D708B;

    .tracking-code-title {
      font-weight: 400;
      margin-right: 109px;
    }

    .tracking-code {
      font-weight: 600;
    }
  }

  .redirect-element {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #8075DC;
    margin-top: 20px;
    text-decoration: none;
  }
}

.cart-container {
}

@media screen and (width <= 1439px) {
  .cart-image {
    width: 194px;
    height: 194px;
    margin-top: 106px;
  }

  .cart-container {
    .title {
      font-size: 22px;
      line-height: 34px;
      margin-top: 53px;
    }

    .tracking-code-container {
      .tracking-code-title {
        margin-right: 83px;
      }
    }

    .redirect-element {
      margin-top: 16px;
    }
  }
}

@media screen and (width <= 1023px) {
  .cart-image {
    width: 245px;
    height: 245px;
    margin-top: 236px;
  }

  .title {
    margin-top: 58px;
  }

}

@media screen and (width <= 599px) {
  .cart-image {
    width: 168px;
    height: 168px;
    margin-top: 101px;
    font-size: 150px;
  }

  .cart-container {
    .title {
      font-size: 18px;
      line-height: 28px;
      margin-top: 40px;
    }

    .tracking-code-container {
      font-size: 14px;

      .tracking-code-title {
        margin-right: 77px;
      }
    }

    .redirect-element {
      font-size: 14px;
      line-height: 22px;
    }
  }
}

</style>
