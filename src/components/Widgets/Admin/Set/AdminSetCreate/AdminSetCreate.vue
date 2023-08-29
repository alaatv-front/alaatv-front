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
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminSetCreate',
  components: { EntityCreate },
  data () {
    return {
      api: APIGateway.set.APIAdresses.adminBase,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'data.id',
      showRouteName: 'Admin.Forrest.Show',
      indexRouteName: 'Admin.Forrest.Index',
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
          name: 'photo',
          label: 'کاور',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-12'
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
          col: 'col-md-12'
        }
      ]
    }
  }
}
</script>
