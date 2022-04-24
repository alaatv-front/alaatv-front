<template>
  <entity-create
    v-model:value="inputs"
    title="ثبت بن جدید"
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  />
</template>

<script>
import { EntityCreate } from 'quasar-crud'

export default {
  name: 'Created',
  components: { EntityCreate },
  data () {
    return {
      inputs: [],
      api: '/v2/admin/coupon',
      entityIdKeyInResponse: '',
      showRouteParamKey: '',
      indexRouteName: '',
      showRouteName: 'Admin.Coupon.Show'
    }
  }
}
</script>

<style scoped>

</style>
