<template>
  <h2>ExampleTable</h2>
  <entity-index ref="entityIndex"
                v-model:value="inputs"
                v-model:table-selected-values="selected"
                class="upload-center-entity-index"
                show-no-entity-slot
                :api="api"
                :table="table"
                :table-keys="tableKeys"
                :table-selection-mode="'multiple'"
                :item-indicator-key="'id'"
                :default-layout="false"
                :show-search-button="false"
                :show-reload-button="false">
    <template #entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'actions'">
        <q-btn square
               size="sm"
               color="grey-2"
               icon="isax:menu-1">
          <q-tooltip>
            عملیات بیشتر
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
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ExampleTable',
  components: { EntityIndex },
  data() {
    return {
      inputs: [],
      api: APIGateway.user.APIAdresses.favored + '?type=content',
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'contentPage'
      },
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'فیلم',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => row.enable ? 'فعال' : 'غیرفعال'
          },
          {
            name: 'updated_at',
            required: true,
            label: 'تاریخ بارگذاری',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: row => row.id
          }
        ],
        data: []
      },
      selected: []
    }
  }

}
</script>
