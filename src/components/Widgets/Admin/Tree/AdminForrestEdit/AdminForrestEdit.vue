<template>
  <entity-edit v-model:value="inputs"
               title="ویرایش درخت"
               :api="getEntityShowAPI"
               :entity-id-key-in-response="entityIdKeyInResponse"
               :show-route-param-key="showRouteParamKey"
               :show-route-name="showRouteName" />
</template>

<script>
import { EntityEdit } from 'quasar-crud'

export default {
  name: 'AdminForrestShow',
  components: { EntityEdit },
  data () {
    return {
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Forrest.Show',
      indexRouteName: 'Admin.Forrest.Index',
      inputs: [
        { type: 'input', name: 'title', label: 'عنوان', outlined: true, placeholder: ' ', responseKey: 'data.title', col: 'col-md-4' },
        { type: 'input', name: 'order', label: 'ترتیب', outlined: true, placeholder: ' ', responseKey: 'data.order', col: 'col-md-4' },
        { type: 'input', name: 'type', label: 'دسته', outlined: true, placeholder: ' ', responseKey: 'data.type', col: 'col-md-4' },
        { type: 'hidden', name: 'id', responseKey: 'data.id', col: 'col-md-12' }
      ]
    }
  },
  computed: {
    getEntityShowAPI () {
      return this.$apiGateway.forrest.FullAPIAdresses.grid(this.$route.params.id)
    }
  },
  methods: {}
}
</script>
