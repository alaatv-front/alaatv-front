<template>
  <entity-create
    v-model:value="inputs"
    title="ثبت محصول جدید"
    :api="api1"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  >
    <template #before-form-builder>
      <q-banner v-if="beforeFormBuilder"
                inline-actions
                rounded
                class="bg-orange text-white q-ma-md">
        before form builder
        <template v-slot:action>
          <q-btn flat
                 label="Dismiss"
                 @click="beforeFormBuilder = false" />
        </template>
      </q-banner>
    </template>
  </entity-create>
  <q-separator class="q-my-md" />
  <entity-attachment
    v-model:value="crudFormInputs"
    expanded-default
    :title="'entity attachment titile'"
    :action-title="'attach action title'"
    :list-title="'entity attached list'"
    :list-show-route-name="'Admin.BlockManagement.Show'"
    :attachment-list-api-address="api"
    :table="table"
    :table-keys="tableKeys"
  />
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      api1: API_ADDRESS.ticket.create.base,
      api2: API_ADDRESS.ticket.create.base,
      api3: API_ADDRESS.ticket.create.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Ticket.Show',
      indexRouteName: 'Admin.Ticket.Index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', value: '', label: 'عنوان', col: 'col-md-6' },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            { type: 'separator', label: 'اولویت:', vertical: 'false', col: 'col-md-1' },
            {
              type: 'toggleButton',
              name: 'priority',
              responseKey: 'data.priority',
              options: [
                { label: 'کم', value: '1' },
                { label: 'متوسط', value: '2' },
                { label: 'فوری', value: '3' },
                { label: 'بحرانی', value: '4' }
              ],
              col: 'col-md-4',
              textColor: 'black',
              size: '20px'
            }

          ]

        }
      ],
      crudFormInputs: [
        {
          type: 'EntityAttachment',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'entity',
              name: 'ChangeUser',
              label: 'تغییر کاربر',
              selectionMode: 'single',
              buttonColor: 'indigo',
              buttonTextColor: 'black',
              buttonBadgeColor: 'orange',
              indexConfig: {
                apiAddress: 'https://reqres.in/api/users',
                tableTitle: 'لیست محصولات',
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
                      label: '#',
                      align: 'left',
                      field: row => row.id
                    },
                    {
                      name: 'thumbnail',
                      required: true,
                      label: 'تصویر',
                      align: 'left',
                      field: row => row.avatar
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
                },
                inputs: [
                  { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
                  { type: 'input', name: 'first_name', value: null, label: 'نام', col: 'col-md-3' },
                  { type: 'input', name: 'last_name', value: null, label: 'نام خانوادگی', col: 'col-md-3' }
                ],
                itemIdentifyKey: 'id',
                itemIndicatorKey: 'first_name',
                showTableItemsRouteName: 'Admin.BlockManagement.Show'
              },
              value: [],
              responseKey: '',
              selected: [],
              col: 'col-md-4'
            }
          ]
        }],
      beforeFormBuilder: true,
      afterFormBuilder: true
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
