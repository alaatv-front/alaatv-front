<template>
  <q-dialog :model-value="dialog"
            persistent>
    <div class="previous-dialog-wrapper">
      <div class="previous-dialog-header">
        <div class="previous-dialog-header-title">
          استفاده مجدد از مشخصات فیلم های قبلی
        </div>
        <div class="previous-dialog-header-close-btn">
          <q-btn flat
                 icon="close"
                 @click="toggleDialog()" />
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
          <template #entity-index-table-item-cell="{inputData}">
            <div class="col-3 content-col">
              <q-card class="content-box"
                      @click="setContent(inputData.props.row)">
                <q-avatar size="80px">
                  <img :src="inputData.props.row.photo"
                       alt="آلا">
                </q-avatar>
                <q-card-section>
                  <div>{{ inputData.props.row.name }}</div>
                </q-card-section>
              </q-card>
            </div>
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
  emits: ['selectedUpdated', 'toggleDialog'],
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
  },
  methods: {
    toggleDialog() {
      this.$emit('toggleDialog')
    },
    setContent(e) {
      this.selected = e
      this.toggleDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.previous-dialog-wrapper {
  width: 1280px;
  height: 780px;
  max-width: 100%;
  background: #FFF;

  .previous-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    background: rgb(255 255 255 / 40%);
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

.content-col{
  padding: 10px;

  .content-box {
    display: flex;
    min-height: 80px;
    cursor: pointer;
  }
}
</style>
