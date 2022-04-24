<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات بن"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :edit-route-name="editRouteName"
    :index-route-name="indexRouteName"
  >
  </entity-show>
</template>

<script>
import { EntityShow } from 'quasar-crud'

export default {
  name: 'Show',
  components: { EntityShow },
  data () {
    return {
      inputs: [],
      api: '/v2/admin/coupon/10',
      entityIdKey: '',
      entityParamKey: '',
      editRouteName: 'Admin.Coupon.Edit',
      indexRouteName: 'Admin.Coupon.Index'
    }
  }
}
</script>

<style scoped>

</style>
