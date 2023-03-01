<template>
  <entity-show v-model:value="inputs"
               title="نمایش درخت"
               :api="getEntityShowAPI"
               :entity-param-key="entityParamKey"
               :entity-id-key="entityIdKey"
               :index-route-name="indexRouteName"
               :edit-route-name="editRouteName" />
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'AdminForrestShow',
  components: { EntityShow },
  data () {
    return {
      api: APIGateway.forrest.FullAPIAdresses.base,
      entityIdKey: 'id',
      editRouteName: 'Admin.Forrest.Edit',
      indexRouteName: 'Admin.Forrest.Index',
      entityParamKey: 'id',
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
