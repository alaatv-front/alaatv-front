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
                      :api="getEntityApi"
                      :table="table"
                      :table-keys="tableKeys"
                      :default-layout="false"
                      :table-grid-size="$q.screen.lt.md">
          <template v-slot:before-index-table>
            <div class="row items-center search-box">
              <div class="col-12 text-left">
                <p class="q-mt-lg q-ml-lg">یکی از فیلم های قبلی خود را برای استفاده مجدد از مشخصات آن انتخاب کنید.</p>
              </div>
            </div>
          </template>
          <template #table-cell="{inputData}">
            <q-td :props="inputData.props">
              <template>
                {{ inputData.props.value }}
              </template>
            </q-td>
          </template>
          <template v-slot:table-item-cell="{inputData}">
            {{ inputData }}
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
    }
  },
  data() {
    return {
      inputs: [
        { type: 'hidden', name: 'search', responseKey: 'search', col: 'col-12 col-lg-12 col-sm-6' }
      ],
      searchInput: '',
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره سفارش',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.name
          },
          {
            name: 'image',
            required: true,
            label: 'عکس',
            align: 'left',
            field: row => row.image
          }
        ],
        data: []
      },
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      }
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
