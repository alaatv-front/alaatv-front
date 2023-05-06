<template>
  <div>ExampleTable</div>
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
                :show-reload-button="true">
    <template #entity-index-table-cell="{inputData}">
      <template v-if="inputData.col.name === 'actions'">
        <!--                  <q-btn round-->
        <!--                         flat-->
        <!--                         dense-->
        <!--                         size="md"-->
        <!--                         icon="isax:chart-2"-->
        <!--                         class="q-ml-md"-->
        <!--                         @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">-->
        <!--                    <q-tooltip>-->
        <!--                      زمانکوب-->
        <!--                    </q-tooltip>-->
        <!--                  </q-btn>-->
        <q-btn round
               flat
               dense
               size="md"
               color="info"
               icon="edit"
               @click="toggleUploadProgressDialog(inputData.props.row.id)">
          <q-tooltip>
            ویرایش
          </q-tooltip>
        </q-btn>
      </template>
      <template v-else-if="inputData.col.name === 'photo'">
        <q-img :src="inputData.col.photo"
               :ratio="16/9"
               width="142px"
               height="78px" />
      </template>
      <template v-else-if="inputData.col.name === 'title'">
        <div class="text-body1">{{inputData.col.value.name}}</div>
        <div v-html="inputData.col.value.description" />
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

<style scoped>

</style>
