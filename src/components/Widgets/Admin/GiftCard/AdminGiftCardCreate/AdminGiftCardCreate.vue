<template>
  <entity-create v-model:value="inputs"
                 title="ثبت کارت هدیه جدید"
                 :api="api" />
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminGiftCardCreate',
  components: { EntityCreate },
  data () {
    return {
      api: APIGateway.referralCode.APIAdresses.batchStore,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'data.id',
      showRouteName: 'Admin.Forrest.Show',
      indexRouteName: 'Admin.Forrest.Index',
      inputs: [
        {
          type: 'input',
          name: 'firstName',
          label: 'نام',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'input',
          name: 'lastName',
          label: 'نام خانوادگی',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'input',
          name: 'mobile',
          label: 'موبایل',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'input',
          name: 'nationalCode',
          label: 'کد ملی',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'input',
          name: 'number_of_codes',
          label: 'تعداد کارت ها',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'input',
          name: 'commission',
          label: 'درصد تخفیف',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'hidden',
          name: 'discounttype_id',
          placeholder: 'وارد کنید',
          value: 2,
          col: 'col-md-6'
        }
      ]
    }
  }
}
</script>
