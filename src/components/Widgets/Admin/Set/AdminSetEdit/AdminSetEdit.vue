<template>
  <entity-edit ref="entityEdit"
               v-model:value="inputs"
               title="ویرایش مجموعه محتوایی"
               :api="getEntityShowAPI"
               :entity-id-key-in-response="entityIdKeyInResponse"
               :show-route-param-key="showRouteParamKey"
               :show-route-name="showRouteName" />
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
export default {
  name: 'AdminSetEdit',
  components: { EntityEdit },
  mixins: [
    mixinWidget
  ],
  data () {
    return {
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Set.Show',
      indexRouteName: 'Admin.Set.Index',
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
          type: 'file',
          responseKey: 'data.photo',
          name: 'cover',
          label: 'کاور',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-12'
        },
        {
          type: 'optionGroupRadio',
          responseKey: 'data.enable',
          name: 'enable',
          label: 'وضعیت انتشار',
          inline: 'true',
          dense: 'false',
          options: [
            {
              value: '0',
              label: 'فعال'
            },
            {
              value: '1',
              label: 'قابل نمایش برای کاربران'
            }
          ],
          col: 'col-md-12'
        },
        { type: 'hidden', name: 'id', responseKey: 'data.id', col: 'col-md-12' }
      ]
    }
  },
  computed: {
    getEntityShowAPI () {
      return this.$apiGateway.set.FullAPIAdresses.adminShow(this.$route.params.id)
    }
  }
}
</script>
<style  lang="scss" scoped>
.tree-box {
  min-height: 150px;
}
</style>
