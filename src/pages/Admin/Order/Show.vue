<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات سفارش"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :edit-route-name="editRouteName"
    :index-route-name="indexRouteName"
    :after-load-input-data="afterLoadInputData"
  />
  <portlet v-if="orderproducts.length > 0" ref="portlet">
    <template #title>
      محصولات سفارش
    </template>
    <template #toolbar>

    </template>
    <template #content>
      <q-card>
        <q-card-section>
          <div class="row">
            <div
              v-for="orderproduct in orderproducts"
              :key="orderproduct.id"
              class="col-md-3"
              @click="showProduct(orderproduct.id)"
            >
              <q-card>
                <q-img :src="orderproduct.product.photo">
                  <div class="absolute-bottom text-h6">
                    {{ orderproduct.product.title }}
                  </div>
                </q-img>

                <q-card-section>
                  دسته:
                  {{ orderproduct.product.category }}
                  <br>
                  قیمت:
                  {{ orderproduct.price.final }}
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>

    </template>
  </portlet>

</template>

<script>
import { EntityShow, Portlet } from 'quasar-crud'

export default {
  name: 'Show',
  components: { EntityShow, Portlet },
  computed: {
    // orderproducts () {
    //   const orderproductsIndex = this.inputs.findIndex(item => item.name === 'orderproducts')
    //   return this.inputs[orderproductsIndex].value
    // }
  },
  data () {
    return {
      expanded: true,
      api: '/alaa/api/v2/admin/order',
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.Order.Edit',
      indexRouteName: 'Admin.Order.Index',
      inputs: [
        { type: 'space', name: 'space', label: 'اطلاعات کاربر', col: 'col-md-12' },
        { type: 'input', name: 'user_id', responseKey: 'data.user.id', label: 'شناسه کاربر', col: 'col-md-3' },
        { type: 'input', name: 'first_name', responseKey: 'data.user.first_name', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', responseKey: 'data.user.last_name', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'mobile', responseKey: 'data.user.mobile', label: 'موبایل', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'data.user.national_code', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'profile_completion', responseKey: 'data.user.profile_completion', label: 'درصد تکمیل پروفایل', col: 'col-md-3' },
        { type: 'space', name: 'space', label: 'اطلاعات سفارش', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه سفارش', col: 'col-md-3' },
        { type: 'input', name: 'orderstatus', responseKey: 'data.orderstatus.name', label: 'وضعیت سفارش', col: 'col-md-3' },
        { type: 'input', name: 'paymentstatus', responseKey: 'data.paymentstatus.name', label: 'وضعیت پرداخت', col: 'col-md-3' },
        { type: 'input', name: 'price', responseKey: 'data.price', label: 'مبلغ(تومان)', col: 'col-md-3' },
        { type: 'input', name: 'paid_price', responseKey: 'data.paid_price', label: 'مبلغ پرداخت شده(تومان)', col: 'col-md-3' },
        { type: 'input', name: 'discount', responseKey: 'data.discount', label: 'مبلغ تخفیف (تومان)', col: 'col-md-3' },
        { type: 'input', name: 'completed_at', responseKey: 'data.completed_at', label: 'تاریخ تکمیل', col: 'col-md-3' },
        { type: 'hidden', name: 'orderproducts', responseKey: 'data.orderproducts', label: 'تاریخ تکمیل', col: 'col-md-3' }
      ],
      orderproducts: []
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    afterLoadInputData () {
      const orderproductsIndex = this.inputs.findIndex(item => item.name === 'orderproducts')
      this.orderproducts = this.inputs[orderproductsIndex].value
    },
    showProduct (id) {
      console.log('id', id)
      // this.$router.push({ name: 'Admin.Product.Show', params: { id: id } })
    }
  }
}
</script>

<style scoped>

</style>
