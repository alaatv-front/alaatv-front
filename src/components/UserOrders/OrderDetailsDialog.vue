<template>
  <div class="order-details-dialog">
    <inside-dialog :close-button-icon="'ph:arrow-left'">
      <template #header-icon>
        <badge-icon icon="ph:shopping-cart-simple"
                    color="primary" />
      </template>
      <template #header>
        جزییات سفارش
      </template>
      <template #body>
        <q-card-section class="info row q-col-gutter-md">
          <div class="info-box part1 col-md-6 col-12">
            <div class="default-info paid">اطلاعات کلی</div>
            <div class="info-item">
              شماره سفارش:
              <span class="default-info">{{ order.id }}</span>
            </div>
            <div class="info-item">
              وضعیت پرداخت:
              <span class="default-info">{{ order.paymentstatus.name }}</span>
            </div>
            <div class="info-item">
              تاریخ سفارش:
              <span class="default-info">{{ getCurrentOrderCompletedAt(order.completed_at) }}</span>
            </div>
          </div>
          <div class="info-box part2 col-md-6 col-12">
            <div class="info-item">
              جمع مبلغ سفارش:
              <span class="default-info">{{ toman(order.price, null) }} تومان</span>
            </div>
            <div class="info-item">
              میزان تخفیف:
              <span class="info-discount">{{ order.getOrderDiscount() ? '(' + order.getOrderDiscount() + '% )' : 0 }}</span>
              <!--            <span class="info-discount">({{ order.discount }}%)</span>-->
              <!--              <span class="default-info paid">پرداخت شده</span>-->
              <span class="default-info">{{ order.getOrderDiscount('toman') }}</span>
            </div>
            <div class="info-item">
              مبلغ نهایی:
              <span class="default-info">{{ toman(order.paid_price, null) }} تومان</span>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <q-btn v-if="false"
                   color="primary"
                   class="full-width"
                   @click="payOrder">
              پرداخت مبلغ سفارش
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section v-if="order.unpaid_transaction && order.unpaid_transaction.length > 0">
          <installments :installments="order.unpaid_transaction" />
        </q-card-section>
        <q-card-section v-if="order.orderItems.list && order.orderItems.list.length > 0 "
                        class="products">
          <div class="default-info paid">محصولات سفارش</div>
          <div class="order-product-list"
               :class="{'is-admin-orders': isAdminOrders}">
            <ordered-products v-for="(orderItem, index) in order.orderItems.list"
                              :key="index"
                              :is-admin-orders="isAdminOrders"
                              :ordered-item="orderItem" />
          </div>
        </q-card-section>
      </template>
    </inside-dialog>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import { Order } from 'src/models/Order.js'
import Installments from './Installments.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import OrderedProducts from 'src/components/UserOrders/OrderedProducts.vue'
export default {
  name: 'OrderDetailsDialog',
  components: { InsideDialog, OrderedProducts, Installments },
  props: {
    order: {
      type: Order,
      default () {
        return new Order()
      }
    },
    isAdminOrders: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    getCurrentOrderCompletedAt () {
      return (CompletedAt) => {
        return moment(CompletedAt, 'YYYY-M-D').format('jYYYY/jMM/jDD')
      }
    },
    discountInPercent () {
      return (discount, base) => {
        return Math.round(discount * 100 / base)
      }
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    payOrder () {
      APIGateway.cart.getPaymentRedirectEncryptedLink({
        orderId: this.order.id
      })
        .then(url => {
          window.location.href = url
        })
        .catch(() => {})
    },
    toman (key, suffix) {
      let string = key.toLocaleString('fa')
      if (typeof suffix === 'undefined' || suffix) {
        string += ' تومان '
      }
      return string
    }
  }
}
</script>

<style scoped lang="scss">
.order-details-dialog {
  background: #FFF;
  box-shadow: none !important;
  border-radius: 16px !important;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  text-align: left;
  letter-spacing: -0.03em;
  color: #434765;
  width: 830px;

  //height: 640px;
  overflow: auto hidden;

  @media screen and (width <= 1439px) {
    width: 664px;
  }

  @media screen and (width <= 1023px) {
    width: 540px;

    //height: 640px;
  }

  @media screen and (width <= 599px) {
    width: 100%;
  }

  .dialog-body {
    overflow-y: auto;
    max-height: 600px;
  }

  .info {
    //display: grid;
    //grid-template-columns: auto auto;
    //align-items: center;
    //padding: 16px 30px;
    //@media screen and (max-width: 1439px){
    //  padding: 16px 20px
    //}

    .info-box {
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: left;
      letter-spacing: -0.03em;
      color: #6D708B;
    }

    .part2 {
      padding-top: 20px;
    }
  }

  .info-discount {
    color: #DA5F5C;
    padding: 0 8px;
  }

  .info-item{
    margin-bottom: 16px;
  }

  .default-info {
    color: #434765;
    padding: 0 8px;

    &.paid {
      padding-left: 0;
      margin-bottom: 10px;
    }
  }

  .order-product-list {
    overflow-y: auto;

    &.is-admin-orders {
      max-height: 500px;

      @include media-max-width ('sm') {
        max-height: 200px;
      }
    }
  }

  .products {
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: left;
    letter-spacing: -0.03em;
    color: #434765;
    padding:0 30px 5px;

    @media screen and (width <= 1439px){
      padding:0  20px
    }
  }
}

.q-dialog__inner--minimized > div {
  max-width: 830px;
}

@media screen and (width <= 1439px) {
  .q-dialog__inner--minimized > div {
    max-width: 664px;
  }
}

@media screen and (width <= 1023px) {
  .q-dialog__inner--minimized > div {
    max-width: 540px;
  }
}

</style>
