<template>
  <entity-edit v-model:value="inputs"
               title="ویرایش اطلاعات بن"
               :api="api"
               :entity-id-key="entityIdKey"
               :entity-param-key="entityParamKey"
               :show-route-name="showRouteName" />
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      inputs: [],
      api: APIGateway.coupon.APIAddresses.edit,
      entityIdKey: '',
      entityParamKey: '',
      showRouteName: 'Admin.Coupon.Show'

    }
  }
}
</script>
