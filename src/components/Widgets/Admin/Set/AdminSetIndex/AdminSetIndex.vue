<template>
  <entity-index v-model:value="inputs"
                title="لیست مجموعه ها"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :create-route-name="createRouteName">
    <template v-slot:entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'photo'">
        <q-avatar size="80">
          <img :src="inputData.props.row.photo"
               alt="cover">
        </q-avatar>
      </template>
      <template v-if="inputData.col.name === 'actions'">
        <q-btn round
               flat
               dense
               size="md"
               color="info"
               icon="info"
               :to="{name:'Admin.Set.Show', params: {id: inputData.props.row.id}}">
          <q-tooltip>
            مشاهده
          </q-tooltip>
        </q-btn>
        <!-- <q-btn round
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
        </q-btn> -->
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
  name: 'AdminSetIndex',
  components: { EntityIndex },
  data () {
    return {
      api: APIGateway.set.APIAdresses.adminBase,
      createRouteName: 'Admin.Set.Create',
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
            name: 'photo',
            type: 'photo',
            required: true,
            label: 'کاور',
            align: 'left'
          },
          {
            name: 'name',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.name
          },
          {
            name: 'enable',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => row.enable === 1 ? 'فعال' : 'غیرفعال'
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
      const name = row.name
      return 'آیا از حذف ' + '(' + name + ')' + ' اطمینان دارید؟'
    }
  }
}
</script>
