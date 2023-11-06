<template>
  <div class="cart-container">
    <template v-if="isEwanoUser">
      <template v-if="loading">
        <q-skeleton type="circle" />
      </template>
      <template v-else>
        <div class="cart-image">
          <q-img v-if="hasPaid"
                 src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/thankyou_page.png" />
          <q-icon v-else
                  name="error"
                  color="red" />
        </div>
        <div v-if="hasPaid"
             class="title">
          پرداخت با موفقیت انجام شد
        </div>
        <div v-else
             class="title">
          متاسفانه پرداخت انجام نشد :(
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import Ewano from 'src/assets/js/Ewano.js'
import mixinAuthData from 'src/mixin/AuthData.js'
import { APIGateway } from 'src/api/APIGateway.js'
import mixinEwano from 'src/components/Widgets/Ewano/mixinEwano.js'

export default {
  name: 'EwanoThankYouPage',
  mixins: [mixinAuthData, mixinEwano],
  data() {
    return {
      loading: false,
      hasPaid: false
    }
  },
  computed: {
    ewanoOrderId () {
      return this.$route.query.ewano_order_id
    },
    alaaOrderId () {
      return this.$route.params.orderId
    },
    ticketId () {
      return this.$route.query.ticket
    }
  },
  mounted () {
    console.warn('EwanoThankYouPage loaded')
    console.warn('window.location.href: ', window.location.href)
    console.warn('EwanoThankYouPage isEwanoUser: ', this.isEwanoUser)
    if (!this.isEwanoUser) {
      return
    }

    Ewano.onWebAppReady()
    this.checkEwanoPaymentResult()
  },
  methods: {
    changeLoadingState (state) {
      this.loading = state
      this.$bus.emit('ThankYouPageInvoiceLoading', state)
    },
    checkEwanoPaymentResult () {
      this.changeLoadingState(true)
      Ewano.paymentResult((status) => {
        if (status) {
          this.pay()
        } else {
          this.changeLoadingState(false)
          this.hasPaid = false
        }
      })
    },
    pay () {
      this.changeLoadingState(true)
      APIGateway.ewano.pay()
        .then((status) => {
          this.hasPaid = status
          this.changeLoadingState(false)
        })
        .catch(() => {
          this.changeLoadingState(false)
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

@media screen and (max-width: 1439px) {
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
@media screen and(max-width: 1023px) {
  .cart-image {
    width: 245px;
    height: 245px;
    margin-top: 236px;
  }
  .title {
    margin-top: 58px;
  }

}

@media screen and (max-width: 599px) {
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
