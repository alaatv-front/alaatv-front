<template>
  <entity-edit ref="entityEdit"
               v-model:value="inputs"
               title="ویرایش درخت"
               :api="getEntityShowAPI"
               :entity-id-key-in-response="entityIdKeyInResponse"
               :show-route-param-key="showRouteParamKey"
               :show-route-name="showRouteName"
               :after-get-data="showForrest" />
  <div class="relative-position">
    <q-card class="tree-box q-my-md">
      <q-card-section>نمایش ساختار درخت</q-card-section>
      <tree v-show="!treeLoading"
            ref="tree"
            :key="treeKey"
            editable
            :no-nodes-label="'درخت مورد نظر بارگیری نشده است.'"
            :get-node-by-id="getNodeById"
            :add-new-node="createNode"
            :edit-node="editNode"
            :show-create-btn="false" />
      <q-inner-loading :showing="treeLoading">
        <q-spinner-ball color="primary"
                        size="50px" />
      </q-inner-loading>
    </q-card>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import Tree from 'components/Widgets/Tree/Tree.vue'
import { mixinTree, mixinWidget } from 'src/mixin/Mixins.js'
export default {
  name: 'AdminForrestEdit',
  components: { Tree, EntityEdit },
  mixins: [
    mixinTree,
    mixinWidget
  ],
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
      ],
      treeKey: 0,
      treeLoading: false
    }
  },
  computed: {
    getEntityShowAPI () {
      return this.$apiGateway.forrest.APIAdresses.grid(this.$route.params.id)
    },
    getTreeType () {
      const typeInput = this.inputs.find(input => input.name === 'type')
      return typeInput.value
    }
  },
  updated () {
    this.reloadTree()
  },
  methods: {
    showForrest () {
      this.treeLoading = true
      this.showTree('tree', this.getRootNode(this.getTreeType))
        .then(() => {
          this.treeLoading = false
        })
        .catch(err => {
          console.error(err)
          this.treeLoading = false
        })
    }
  }
}
</script>
<style  lang="scss" scoped>
.tree-box {
  min-height: 150px;
}
</style>
