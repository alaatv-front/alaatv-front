<template>
  <div class="RegisterKonkurFieldSelectionGoToPayment">
    <div class="state-photo">
      <lazy-img src="https://nodes.alaatv.com/upload/CheckCircle.png" />
    </div>
    <div class="title-text text-center q-mb-md">
      اطلاعات شما با موفقیت ثبت شد.
    </div>
    <div class="content-text text-center q-mb-xl">
      پس از پرداخت و تکمیل ثبت نام تیم آلاء باهاتون تماس میگیره.
    </div>
    <div class="row q-col-gutter-md action-row">
      <div class="col-12">
        <q-btn color="primary"
               class="full-width"
               @click="pay">
          پرداخت و تکمیل ثبت نام
        </q-btn>
      </div>
    </div>
    <div class="flex justify-end q-mt-sm">
      <q-btn flat
             :to="{name: 'Public.Home'}">
        رفتن به صفحه اصلی آلاء
        <q-icon name="arrow_back" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'RegisterKonkurFieldSelectionGoToPayment',
  components: { LazyImg },
  props: {
    orderId: {
      type: Number,
      default: null
    }
  },
  emits: ['end'],
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
    pay () {
      if (!this.orderId) {
        return
      }
      APIGateway.cart.getPaymentRedirectEncryptedLink({ device: 'web', paymentMethod: 'web', orderId: this.orderId })
        .then(encryptedPaymentRedirectLink => {
          window.open(encryptedPaymentRedirectLink, '_self')
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.RegisterKonkurFieldSelectionGoToPayment {
  .state-photo {
    margin-top: 88px;
  }
  .action-row {
    margin-top: 161px;
  }
}
</style>
