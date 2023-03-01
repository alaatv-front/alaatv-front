<template>
  <q-dialog :model-value="dialog"
            persistent>
    <div class="previous-dialog-wrapper">
      <div class="previous-dialog-header">
        <div class="previous-dialog-header-title">
          استفاده مجدد از مشخصات فیلم های قبلی
        </div>
        <div class="previous-dialog-header-close-btn">
          <q-btn v-close-popup
                 flat
                 icon="close" />
        </div>
      </div>
      <div class="previous-dialog-main-content">
        <entity-index ref="orderList"
                      v-model:value="inputs"
                      v-model:table-selected-values="selected"
                      class="orders-list-entity-index"
                      :api="api"
                      :table-selection-mode="selectionMode"
                      :item-indicator-key="'id'"
                      :identifyKey="'id'"
                      :table="table"
                      :table-keys="tableKeys"
                      :create-route-name="'User.Create'"
                      :default-layout="false"
                      :table-grid-size="true">
          <template #entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'photo'">
              <!--              {{ inputData.col.photo }}-->
              <!--              todo: entity-index-table-cell doesnt work in grid mode-->
              <q-img src="'https://nodes.alaatv.com/upload/contentset/departmentlesson/1676867828_6421.png'"
                     :ratio="16/9"
                     width="142px"
                     height="78px" />
            </template>
            <template v-else-if="inputData.col.name === 'title'">
              <div>
                {{ inputData.col.title }}
              </div>
            </template>
            <template v-else>
              {{ inputData.col.value }}
            </template>
          </template>
        </entity-index>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { EntityIndex } from 'quasar-crud'

export default {
  name: 'PreviousItemsDialog',
  components: {
    EntityIndex
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    api: {
      type: String,
      default: ''
    }
  },
  emits: ['selectedUpdated'],
  data() {
    return {
      // inputs: [
      //   { type: 'hidden', name: 'search', responseKey: 'search', col: 'col-12 col-lg-12 col-sm-6' }
      // ],
      selected: [],
      selectionMode: 'single',
      tableGridSize: true,
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'productPage'
      },
      table: {
        columns: [
          {
            name: 'photo',
            required: true,
            align: 'left',
            field: row => row.photo
          },
          {
            name: 'name',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.name
          }
        ],
        data: []
      },
      inputs: [
        { type: 'input', name: 'search-btn', outlined: true, label: 'جستجو در فیلم ها', placeholder: 'انتخاب نمایید', col: 'col-md-3 align-left q-mt-lg q-ml-lg' },
        { type: 'button', name: 'search', responseKey: 'statement', class: '', icon: 'search', unelevated: true, col: 'q-mt-lg q-ml-lg self-end' }
      ]
    }
  },
  watch: {
    selected(value) {
      this.$emit('selectedUpdated', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.previous-dialog-wrapper {
  width: 1280px;
  height: 780px;
  max-width: 100%;
  background: #FFFFFF;

  .previous-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    background: rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid #D8D8D8;

    .previous-dialog-header-title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      color: #363636;
    }
  }

  .previous-dialog-main-content {
    position: relative;
    height: calc(100% - 80px);

    .previous-footer-navigation {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
