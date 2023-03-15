<template>
  <entity-index v-model:value="inputs"
                title="لیست درخت های برچسب"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :create-route-name="createRouteName">
    <template v-slot:entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'actions'">
        <q-btn round
               flat
               dense
               size="md"
               color="info"
               icon="info"
               :to="{name:'Admin.Forrest.Show', params: {id: inputData.props.row.id}}">
          <q-tooltip>
            مشاهده
          </q-tooltip>
        </q-btn>
        <q-btn round
               flat
               dense
               size="md"
               color="negative"
               icon="delete"
               class="q-ml-md"
               @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
          <q-tooltip>
            حذف
          </q-tooltip>
        </q-btn>
      </template>
      <template v-else>
        {{ inputData.col.value }}
      </template>
    </template>
  </entity-index>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { EntityIndex } from 'quasar-crud'

export default {
  name: 'AdminForrestIndex',
  components: { EntityIndex },
  data () {
    return {
      api: APIGateway.forrest.APIAdresses.base,
      createRouteName: 'Admin.Forrest.Create',
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'couponPage'
      },
      inputs: [],
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
            name: 'type',
            required: true,
            label: 'نوع',
            align: 'left',
            field: row => row.type
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'parent',
            required: true,
            label: 'parent',
            align: 'left',
            field: row => row.parent
          },
          {
            name: 'actions',
            required: true,
            label: '',
            align: 'left',
            field: ''
          }
        ]
      }
    }
  },
  methods: {
    getRemoveMessage (row) {
      const title = row.title
      const type = row.type
      return 'آیا از حذف ' + '(' + title + ')' + ' نوع ' + '(' + type + ')' + ' اطمینان دارید؟'
    }
  }
}
</script>
