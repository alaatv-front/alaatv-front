<template>
  <entity-show v-model:value="inputs"
               title="اطلاعات بن"
               :api="api"
               :entity-id-key="entityIdKey"
               :entity-param-key="entityParamKey"
               :edit-route-name="editRouteName"
               :index-route-name="indexRouteName" />
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'Show',
  components: { EntityShow },
  data () {
    return {
      inputs: [],
      api: APIGateway.coupon.APIAddresses.show,
      entityIdKey: '',
      entityParamKey: '',
      editRouteName: 'Admin.Coupon.Edit',
      indexRouteName: 'Admin.Coupon.Index'
    }
  }
}
</script>
