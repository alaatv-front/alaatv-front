<template>
  <entity-create v-model:value="inputs"
                 title="ثبت درخت جدید"
                 :api="api"
                 :entity-id-key-in-response="entityIdKeyInResponse"
                 :show-route-param-key="showRouteParamKey"
                 :index-route-name="indexRouteName"
                 :show-route-name="showRouteName" />
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'AdminForrestCreate',
  components: { EntityCreate },
  data () {
    return {
      api: APIGateway.forrest.FullAPIAdresses.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Forrest.Show',
      indexRouteName: 'Admin.Forrest.Index',
      inputs: [
        { type: 'input', name: 'title', label: 'عنوان', col: 'col-md-4' },
        { type: 'input', name: 'order', label: 'ترتیب', col: 'col-md-4' },
        { type: 'input', name: 'type', label: 'دسته', col: 'col-md-4' },
        { type: 'hidden', name: 'parent_id', value: null, label: 'شناسه', col: 'col-md-12' }
      ]
    }
  }
}
</script>
