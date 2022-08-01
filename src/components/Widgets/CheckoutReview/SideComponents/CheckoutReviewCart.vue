<template>
  <div class="checkout-review-cart bg-white shadow-4 q-mx-md q-mt-md">
    <div class="q-px-lg q-pt-lg flex justify-between">
      <p>جمع سبد خرید(4)</p>
      <p>3150000 تومان</p>
    </div>
    <div class="q-px-lg q-pt-lg flex justify-between">
      <p>اعتبار کیف پول</p>
      <p> تومان</p>
    </div>
    <div class="q-px-lg text-red q-pt-lg flex justify-between">
      <p>سود شما از این خرید</p>
      <p>تومان</p>
    </div>
    <q-separator/>
    <div class="q-px-lg q-pt-lg row">
      <p class="col-4">کد تخفیف</p>
      <q-input class="col-8" outlined bottom-slots v-model="discount" label="افزودن کد تخفیف" :dense="true">

        <template v-slot:append>
          <q-btn color="black" round dense flat label="ثبت"/>
        </template>
      </q-input>
    </div>
    <q-separator/>
    <div class="q-px-lg q-pt-lg flex justify-between">
      <p>مبلغ قابل پرداخت</p>
      <p>تومان</p>
    </div>
    <q-input class="q-mx-md" outlined v-model="explanation" label="اگر توضیحی درباره سفارش خود دارید اینجا بنویسید..."/>
    <p class="q-my-md q-px-lg">درگاه پرداخت</p>
    <div class="q-px-lg q-pt-lg flex justify-around">
      <q-option-group
        v-model="group"
        :options="options"
        color="primary"
        inline
        dense>
      </q-option-group>
    </div>
    <q-btn color="primary" style="width: 93%" class="q-ma-md" label="ادامه و ثبت سفارش"/>
  </div>
</template>

<script>
  export default {
    name: 'CheckoutReviewCart',
    data() {
      return {
        explanation: "",
        discount:"",
        options: [
          {
            label: '',
            value: 'op1'
          },
          {
            label: '',
            value: 'op2'
          }
        ],
        group: 'op1'
      }
    }
  }

</script>

<style lang="scss" scoped>
  .checkout-review-cart {
    border-radius: 10px;
  }

  .border {
    border: 1px solid black;
    border-radius: 8px;
  }
</style>
