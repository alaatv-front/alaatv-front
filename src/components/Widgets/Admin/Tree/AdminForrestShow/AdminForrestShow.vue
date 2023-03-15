<template>
  <entity-show ref="entityShow"
               v-model:value="inputs"
               title="نمایش درخت"
               :api="getEntityShowAPI"
               :entity-param-key="entityParamKey"
               :entity-id-key="entityIdKey"
               :index-route-name="indexRouteName"
               :edit-route-name="editRouteName"
               :after-get-data="showForrest" />
  <div class="relative-position">
    <q-card class="tree-box q-my-md">
      <q-card-section>نمایش ساختار درخت</q-card-section>
      <tree v-show="!treeLoading"
            ref="tree"
            :key="treeKey"
            :no-nodes-label="'درخت مورد نظر بارگیری نشده است.'"
            :get-node-by-id="getNodeById"
            :show-create-btn="false" />
      <q-inner-loading :showing="treeLoading">
        <q-spinner-ball color="primary"
                        size="50px" />
      </q-inner-loading>
    </q-card>
  </div>

</template>

<script>
import { EntityShow } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'
import Tree from 'components/Widgets/Tree/Tree.vue'
import { mixinTree, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'AdminForrestShow',
  components: { Tree, EntityShow },
  mixins: [
    mixinTree,
    mixinWidget
  ],
  data () {
    return {
      api: APIGateway.forrest.APIAdresses.base,
      entityIdKey: 'id',
      editRouteName: 'Admin.Forrest.Edit',
      indexRouteName: 'Admin.Forrest.Index',
      entityParamKey: 'id',
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
      return this.$apiGateway.forrest.APIAdresses.grid(this.getEntityId)
    },
    getEntityId () {
      return this.$route.params.id
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
    },
    reloadTree () {
      this.treeKey++
    }
  }
}
</script>

<style  lang="scss" scoped>
.tree-box {
  min-height: 150px;
}
</style>
