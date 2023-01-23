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
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      inputs: [],
      api: API_ADDRESS.coupon.edit.base,
      entityIdKey: '',
      entityParamKey: '',
      showRouteName: 'Admin.Coupon.Show'

    }
  }
}
</script>

<style scoped>

</style>
