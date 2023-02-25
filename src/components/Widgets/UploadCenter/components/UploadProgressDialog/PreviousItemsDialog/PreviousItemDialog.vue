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
                      class="orders-list-entity-index"
                      :api="api"
                      :table="table"
                      :table-keys="tableKeys"
                      :item-indicator-key="'title'"
                      :create-route-name="'User.Create'"
                      :default-layout="true"
                      :table-grid-size="true" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'PreviousItemsDialog',
  components: {
    EntityIndex
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // inputs: [
      //   { type: 'hidden', name: 'search', responseKey: 'search', col: 'col-12 col-lg-12 col-sm-6' }
      // ],
      selected: [],
      api: API_ADDRESS.set.show(1287),
      tableGridSize: true,
      tableKeys: {
        data: 'data.contents',
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
            label: 'فیلم',
            align: 'left',
            field: row => row.photo
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          }
        ],
        data: []
      },
      inputs: [
        { type: 'input', name: 'search-btn', value: null, label: 'جستجو در فیلم ها', col: 'col-md-3', class: 'align-left q-mt-lg q-ml-lg' },
        { type: 'button', name: 'search', responseKey: 'statement', icon: 'search', iconRight: undefined, col: 'col-md-1', class: 'q-mt-lg q-ml-lg' }
      ]
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
