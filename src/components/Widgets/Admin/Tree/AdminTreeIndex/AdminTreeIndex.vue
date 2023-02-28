<template>
  <entity-index v-model:value="inputs"
                title="لیست درخت های برچسب"
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :create-route-name="createRouteName" />
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { EntityIndex } from 'quasar-crud'

export default {
  name: 'AdminTreeIndex',
  components: { EntityIndex },
  data () {
    return {
      api: APIGateway.forrest.FullAPIAdresses.base,
      createRouteName: 'Admin.Tree.Create',
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'couponPage'
      },
      inputs: [
        {
          type: 'Select',
          name: 'type',
          responseKey: '',
          label: ' نام کالایی که از خرید آن بن دریافت کرده است',
          col: 'col-md-6',
          options: [],
          optionValue: '',
          optionLabel: ''
        },
        {
          type: 'Select',
          name: 'couponStatus',
          label: ' وضعیت بن',
          col: 'col-md-6',
          options: [
            { id: '', value: 'فعال' },
            { id: '', value: 'باطل شده' },
            { id: '', value: 'استفاده شده' }
          ],
          optionValue: 'id',
          optionLabel: 'value'
        }],
      table: []
    }
  }
}
</script>
