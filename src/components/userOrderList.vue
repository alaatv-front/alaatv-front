<template>
  <div v-if="loading=== true">
    <q-skeleton type="text"
                class="q-mx-sm"
                height="100px" />
    <q-skeleton type="text"
                class="q-mx-sm"
                height="100px" />
  </div>
  <div v-if="loading=== false">
    <q-btn
      rounded
      unelevated
      class="action-btn"
      @click="extendAll"
    >تمدید کل سفارشات</q-btn>
    <!--  ----------------------------  لیست پرداخت شده  ---------------------------------------------------------------        -->
    <q-expansion-item
      group="parentGroup"
      label="لیست پرداخت شده"
      default-opened
      class="panel-color"
    >
      <template v-for="order in userOrdersList"
                :key="order"
      >
        <q-expansion-item
          v-if="order.inputData.paymentstatus.id === 3"
          group="childGroup"
          class="panel-color"
        >
          <template v-slot:header>
            <q-item-section>
              <div style="display: flex;  color: #837dd1">
                <q-icon name="isax:shopping-cart"
                        class="q-mr-sm"
                        size="24px" />
                <div style="font-size: 12px">
                  {{ this.cartItemLabel(order) }}
                  <q-btn rounded
                         unelevated
                         class="action-btn"
                         @click="goToEdit"
                  >
                    ویرایش</q-btn>
                  <q-btn rounded
                         unelevated
                         class="action-btn q-ml-md"
                         @click="extendAllProducts"
                  >
                    تمدید کل سفارش</q-btn>
                </div>
              </div>
            </q-item-section>
          </template>
          <!--          ------------------------------------------------------------------  header slot done!!!  ------------------------------------------------------------------ -->
          <div>

          </div>
        </q-expansion-item>
      </template>
    </q-expansion-item>
    <!--  ----------------------------  لیست پرداخت نشده  ---------------------------------------------------------------        -->
    <q-expansion-item
      group="parentGroup"
      label="لیست پرداخت نشده"
      class="panel-color"
    >

      <template v-for="order in userOrdersList"
                :key="order"
      >
        <q-expansion-item
          v-if="order.inputData.paymentstatus.id === 3"
          group="childGroup"
          header-class="text-primary"
          class="panel-color"
        >
          <template v-slot:header>
            <q-item-section>
              <div style="display: flex;  color: #837dd1">
                <q-icon name="isax:shopping-cart"
                        class="q-mr-sm"
                        size="24px" />
                <div style="font-size: 12px">
                  {{ this.cartItemLabel(order) }}
                  <q-btn rounded
                         unelevated
                         class="action-btn"
                         @click="goToEdit"
                  >
                    ویرایش</q-btn>
                  <q-btn rounded
                         unelevated
                         class="action-btn q-ml-md"
                         @click="extendAllProducts"
                  >
                    تمدید کل سفارش</q-btn>
                </div>
              </div>
            </q-item-section>
          </template>
          <!--          ------------------------------------------------------------------  header slot done!!!  ------------------------------------------------------------------ -->
          <div class="row">
            <div class="col-2">
              <q-img :src="order.inputData.img" />
            </div>
            <div class="col-5">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="col-5">
              <div></div>
            </div>
          </div>
        </q-expansion-item>
      </template>
    </q-expansion-item>
  </div>
</template>

<script>
import moment from 'moment-jalaali'

export default {
  name: 'userOrderList',
  props: {
    userOrdersList: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    makeDateShamsi (date) {
      return moment(date, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
    },
    cartItemLabel (order) {
      return '#' + order.id + ' - ' + this.makeDateShamsi(order.inputData.created_at) + ' - (تعداد محصولات: ' + order.inputData.orderproducts.length + ' ) - ( پرداخت شده: ' + order.inputData.paid_price + ' تومان - مبلغ کل سفارش: ' + order.inputData.price + ' تومان ) - ( ' + order.inputData.paymentstatus.name + ' )'
    },
    goToEdit () {
      console.log('gone!')
    },
    extendAllProducts () {
      console.log('OK!')
    },
    extendAll () {
      console.log('OK!')
    }
  }
}
</script>

<style lang="scss" scoped>
.action-btn {
  background: #ffb822; color: #111111; font-size: 12px;
  &:deep(.q-btn__content) {
    margin: 4px 20px;
  }
}
.panel-color {
  color: #837dd1;
  background: #f1f5f5
}
</style>
