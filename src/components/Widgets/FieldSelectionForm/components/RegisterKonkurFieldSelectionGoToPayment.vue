<template>
  <div class="RegisterKonkurFieldSelectionGoToPayment">
    <div class="state-photo">
      <lazy-img src="https://nodes.alaatv.com/upload/empty-cart.png" />
    </div>
    <div class="title-text text-center q-mb-md">
      اطلاعات شما با موفقیت ثبت شد.
    </div>
    <div class="content-text text-center q-mb-xl">
      پس از پرداخت و تکمیل ثبت نام تیم آلاء باهاتون تماس میگیره.
    </div>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12">
        <q-btn color="primary"
               class="full-width"
               @click="register">
          پرداخت و تکمیل ثبت نام
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'RegisterKonkurFieldSelectionGoToPayment',
  components: { LazyImg },
  props: {
    konkurRankFormData: {
      type: Object,
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

  }
}
</script>

<style lang="scss" scoped>
.RegisterKonkurFieldSelectionGoToPayment {
  .state-photo {
    margin-top: 121px;
  }
  .q-banner {
    margin-bottom: 64px;
  }
}
</style>
