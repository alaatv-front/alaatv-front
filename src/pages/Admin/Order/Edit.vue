<template>
  <entity-edit
    v-model:value="inputs"
    title="ویرایش سفارش"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
  />
</template>

<script>
import { EntityEdit } from 'quasar-crud'
export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      expanded: true,
      api: '/alaa/api/v2/admin/order',
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Order.Show',
      inputs: [
        { type: 'space', name: 'space', label: 'اطلاعات کاربر', col: 'col-md-12' },
        { type: 'input', name: 'user_id', responseKey: 'data.user.id', label: 'شناسه کاربر', col: 'col-md-3', disable: true },
        { type: 'input', name: 'first_name', responseKey: 'data.user.first_name', label: 'نام', col: 'col-md-3', disable: true },
        { type: 'input', name: 'last_name', responseKey: 'data.user.last_name', label: 'نام خانوادگی', col: 'col-md-3', disable: true },
        { type: 'input', name: 'mobile', responseKey: 'data.user.mobile', label: 'موبایل', col: 'col-md-3', disable: true },
        { type: 'input', name: 'national_code', responseKey: 'data.user.national_code', label: 'کد ملی', col: 'col-md-3', disable: true },
        { type: 'input', name: 'profile_completion', responseKey: 'data.user.profile_completion', label: 'درصد تکمیل پروفایل', col: 'col-md-3', disable: true },
        { type: 'space', name: 'space', label: 'اطلاعات سفارش', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه سفارش', col: 'col-md-3', disable: true },
        { type: 'input', name: 'orderstatus', responseKey: 'data.orderstatus.name', label: 'وضعیت سفارش', col: 'col-md-3' },
        { type: 'input', name: 'paymentstatus', responseKey: 'data.paymentstatus.name', label: 'وضعیت پرداخت', col: 'col-md-3' },
        { type: 'input', name: 'price', responseKey: 'data.price', label: 'مبلغ(تومان)', col: 'col-md-3' },
        { type: 'input', name: 'paid_price', responseKey: 'data.paid_price', label: 'مبلغ پرداخت شده(تومان)', col: 'col-md-3' },
        { type: 'input', name: 'discount', responseKey: 'data.discount', label: 'مبلغ تخفیف (تومان)', col: 'col-md-3' },
        { type: 'input', name: 'completed_at', responseKey: 'data.completed_at', label: 'تاریخ تکمیل', col: 'col-md-3' },
        { type: 'hidden', name: 'orderproducts', responseKey: 'data.orderproducts', label: 'تاریخ تکمیل', col: 'col-md-3' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  }
}
</script>

<style scoped>

</style>
