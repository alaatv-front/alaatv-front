<template>
  <entity-create
    v-model:value="inputs"
    title="ثبت دسته محتوای جدید "
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
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      api: '/reqres/api/users',
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Set.Show',
      indexRouteName: 'Admin.Set.Index',
      inputs: [
        { type: 'input', name: 'name', responseKey: 'data.name', value: '', label: 'نام', col: 'col-md-6' },
        { type: 'input', name: 'job', responseKey: 'data.job', value: '', label: 'شغل', col: 'col-md-6' }
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
