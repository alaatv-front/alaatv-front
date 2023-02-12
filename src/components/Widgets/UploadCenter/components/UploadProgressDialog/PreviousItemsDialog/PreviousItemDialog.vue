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
                      :default-layout="false"
                      :table-grid-size="$q.screen.lt.xl">
          <template v-slot:no-entity>
            <div class="flex column items-center">
              <div class="q-mb-sm">
                <svg width="100"
                     height="100"
                     viewBox="0 0 100 100"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50"
                          cy="50"
                          r="50"
                          fill="#E9E9E9" />
                  <g opacity="0.2">
                    <path fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M30 36.3137C30 33.9313 31.9313 32 34.3137 32H65.6863C68.0687 32 70 33.9313 70 36.3137V64.549C70 66.9314 68.0687 68.8627 65.6863 68.8627H34.3137C31.9313 68.8627 30 66.9314 30 64.549V36.3137ZM34.3137 34.3529C33.2308 34.3529 32.3529 35.2308 32.3529 36.3137V64.549C32.3529 65.6319 33.2308 66.5098 34.3137 66.5098H65.6863C66.7692 66.5098 67.6471 65.6319 67.6471 64.549V36.3137C67.6471 35.2308 66.7692 34.3529 65.6863 34.3529H34.3137Z"
                          fill="black" />
                    <path fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M30 36.3137C30 33.9313 31.9313 32 34.3137 32H44.902V43.7647H30V36.3137ZM34.3137 34.3529C33.2308 34.3529 32.3529 35.2308 32.3529 36.3137V41.4118H42.549V34.3529H34.3137Z"
                          fill="black" />
                    <path fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M42.5488 32H57.4508V43.7647H42.5488V32ZM44.9018 34.3529V41.4118H55.0978V34.3529H44.9018Z"
                          fill="black" />
                    <path fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M55.0981 32H65.6864C68.0688 32 70.0001 33.9313 70.0001 36.3137V43.7647H55.0981V32ZM57.4511 34.3529V41.4118H67.6472V36.3137C67.6472 35.2308 66.7693 34.3529 65.6864 34.3529H57.4511Z"
                          fill="black" />
                    <path d="M55.4901 53.7787C56.5359 54.3825 56.5359 55.8919 55.4901 56.4956L48.4313 60.571C47.3855 61.1748 46.0783 60.4201 46.0783 59.2126V51.0618C46.0783 49.8542 47.3855 49.0995 48.4313 49.7033L55.4901 53.7787Z"
                          fill="black" />
                  </g>
                </svg>
              </div>
              <div>محتوایی برای امروز وجود نداره!</div>
              <div class="q-mb-sm">امروز هیچ فیلم و جزوه‌ای بارگذاری و یا ویرایش نشده.</div>
              <q-btn color="primary"
                     label="بارگذاری"
                     class="btn-md"
                     @click="toggleUploadProgressDialog" />
            </div>
          </template>
          <template #table-cell="{inputData}">
            <q-td :props="inputData.props">
              <template v-if="inputData.props.col.name === 'actions'">
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
                       @click="toggleUploadProgressDialog(inputData.props.value)">
                  <q-tooltip>
                    ویرایش
                  </q-tooltip>
                </q-btn>
              </template>
              <template v-else-if="inputData.props.col.name === 'photo'">
                <q-img :src="inputData.props.value"
                       :ratio="16/9"
                       width="142px"
                       height="78px" />
              </template>
              <template v-else>
                {{ inputData.props.value }}
              </template>
            </q-td>
          </template>
        </entity-index>
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
      tableGridSize: 'col-4',
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
