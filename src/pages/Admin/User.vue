<template>
  <entity-crud
    v-model:edit-inputs="editInputs"
    v-model:index-inputs="indexInputs"
    v-model:show-inputs="showInputs"
    v-model:default-inputs="defaultInputs"
    v-bind="allProps"
  />
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import EntityCrud from 'components/EntityCrud'

export default {
  name: 'User',
  components: {
    EntityCrud
  },
  data () {
    return {
      allProps: {
        config: {
          api: {
            show: API_ADDRESS.users.show.base,
            edit: API_ADDRESS.users.edit.base,
            create: API_ADDRESS.users.create.base,
            index: API_ADDRESS.users.index.base
          },
          title: 'اطلاعات کاربر',
          entityIdKey: 'id',
          entityParamKey: 'id',
          showRouteName: 'Admin.User.Show',
          editRouteName: 'Admin.User.Edit',
          indexRouteName: 'Admin.User.Index',
          entityIdKeyInResponse: 'id',
          showRouteParamKey: 'id',
          tableKeys: {
            data: 'data',
            total: 'total',
            currentPage: 'page',
            perPage: 'per_page',
            pageKey: 'page'
          },
          table: {
            columns: [
              {
                name: 'id',
                required: true,
                label: 'id',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'photo',
                required: true,
                label: 'تصویر',
                align: 'left',
                field: row => row.photo
              },
              {
                name: 'first_name',
                required: true,
                label: 'نام',
                align: 'left',
                field: row => row.first_name
              },
              {
                name: 'last_name',
                required: true,
                label: 'نام خانوادگی',
                align: 'left',
                field: row => row.last_name
              },
              {
                name: 'phone_number',
                required: true,
                label: 'شماره همراه',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'national_code',
                required: true,
                label: 'کد ملی',
                align: 'left',
                field: row => row.national_code
              },
              {
                name: 'email',
                required: true,
                label: 'ایمیل',
                align: 'left',
                field: row => row.email
              },
              {
                name: 'actions',
                required: true,
                label: '',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      defaultInputs: [],
      createInputs: [],
      editInputs: [
        { type: 'file', name: 'photo', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3', disable: true },
        { type: 'input', name: 'first_name', responseKey: 'data.first_name', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', responseKey: 'data.last_name', value: 'null', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'data.national_code', value: 'null', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'email', responseKey: 'data.email', value: 'null', label: 'ایمیل', col: 'col-md-3' },
        { type: 'input', name: 'mobile', responseKey: 'data.mobile', value: 'null', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'address', responseKey: 'data.address', value: 'null', label: 'آدرس', col: 'col-md-3' },
        { type: 'input', name: 'postal_code', responseKey: 'data.postal_code', value: 'null', label: 'کد پستی', col: 'col-md-3' }
      ],
      showInputs: [
        { type: 'avatar', name: 'photo', responseKey: 'data.photo', value: null, size: '150px', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'first_name', responseKey: 'data.first_name', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', responseKey: 'data.last_name', value: 'null', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'data.national_code', value: 'null', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'email', responseKey: 'data.email', value: 'null', label: 'ایمیل', col: 'col-md-3' },
        { type: 'input', name: 'mobile', responseKey: 'data.mobile', value: 'null', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'address', responseKey: 'data.address', value: 'null', label: 'آدرس', col: 'col-md-3' },
        { type: 'input', name: 'postal_code', responseKey: 'data.postal_code', value: 'null', label: 'کد پستی', col: 'col-md-3' }
      ],
      indexInputs: [
        { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'کدملی', col: 'col-md-3' },
        { type: 'select', name: 'gender', value: null, options: ['پسر', 'دختر'], label: 'جنسیت', col: 'col-md-4' },
        { type: 'select', name: 'status', value: null, options: ['فعال', 'غیر فعال'], label: 'وضعیت', col: 'col-md-4' },
        { type: 'dateRange', name: 'created_at_range', value: [], label: 'بازه تاریخ عضویت', col: 'col-md-4' }
      ],
      editAndCreateInputs: [
        { type: 'file', name: 'photo', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3', disable: true },
        { type: 'input', name: 'first_name', responseKey: 'data.first_name', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', responseKey: 'data.last_name', value: 'null', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'data.national_code', value: 'null', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'email', responseKey: 'data.email', value: 'null', label: 'ایمیل', col: 'col-md-3' },
        { type: 'input', name: 'mobile', responseKey: 'data.mobile', value: 'null', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'address', responseKey: 'data.address', value: 'null', label: 'آدرس', col: 'col-md-3' },
        { type: 'input', name: 'postal_code', responseKey: 'data.postal_code', value: 'null', label: 'کد پستی', col: 'col-md-3' }
      ]
    }
  },
  watch: {
    // editInputs: {
    //   handler (newValue, oldValue) {
    //     console.log('inputs', newValue)
    //   },
    //   deep: true
    // }
  },
  created () {}
}
</script>

<style scoped>

</style>
