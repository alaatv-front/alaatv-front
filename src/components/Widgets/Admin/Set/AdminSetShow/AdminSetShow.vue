<template>
  <entity-show ref="entityShow"
               v-model:value="inputs"
               title="نمایش مجموعه محتوایی"
               :api="getEntityShowAPI"
               :entity-param-key="entityParamKey"
               :entity-id-key="entityIdKey"
               :index-route-name="indexRouteName"
               :edit-route-name="editRouteName" />
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { shallowRef } from 'vue'
import TreeInputComponent from 'components/Utils/TreeInput.vue'
import TagsComponent from 'src/components/Utils/Tags.vue'

const ContentTags = shallowRef(TagsComponent)
const TreeInput = shallowRef(TreeInputComponent)
export default {
  name: 'AdminSetShow',
  components: { EntityShow },
  mixins: [
    mixinWidget
  ],
  data () {
    return {
      api: APIGateway.set.APIAdresses.adminBase,
      entityIdKey: 'id',
      editRouteName: 'Admin.Set.Edit',
      indexRouteName: 'Admin.Set.Index',
      entityParamKey: 'data.id',
      inputs: [
        {
          type: 'input',
          responseKey: 'data.name',
          name: 'name',
          label: 'عنوان',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'input',
          responseKey: 'data.small_name',
          name: 'small_name',
          label: 'عنوان کوتاه',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'InputEditor',
          responseKey: 'data.description',
          name: 'description',
          label: 'توضیحات',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: TreeInput,
          name: 'forrest_tree',
          label: 'درخت دانش',
          responseKey: 'data.forrest_trees',
          col: 'col-md-6',
          value: []
        },
        {
          type: ContentTags,
          name: 'forrest_tree_tags',
          label: 'برچسب',
          placeholder: 'برچسب',
          responseKey: 'data.forrest_tags',
          col: 'col-md-6'
        },
        {
          type: 'file',
          responseKey: 'data.photo',
          name: 'photo',
          label: 'کاور',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-3'
        },
        {
          type: 'optionGroupRadio',
          responseKey: 'data.enable',
          name: 'enable',
          label: 'وضعیت انتشار',
          inline: true,
          dense: false,
          options: [
            {
              value: 0,
              label: 'فعال'
            },
            {
              value: 1,
              label: 'قابل نمایش برای کاربران'
            }
          ],
          col: 'col-md-9'
        }
      ]
    }
  },
  computed: {
    getEntityShowAPI () {
      return this.$apiGateway.set.APIAdresses.adminShow(this.getEntityId)
    },
    getEntityId () {
      return this.$route.params.id
    }
  }
}
</script>

<style  lang="scss" scoped>
.tree-box {
  min-height: 150px;
}
</style>
