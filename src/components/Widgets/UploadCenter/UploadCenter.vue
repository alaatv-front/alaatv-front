<template>
  <div class="upload-center">
    <div class="header">
      <div class="title">مرکز بارگذاری </div>
      <q-btn color="primary"
             label="بارگذاری"
             icon-right="isax:add"
             @click="toggleUploadProgressDialog" />
    </div>
    <div class="body">
      <q-tabs v-model="tab"
              inline-label
              align="left"
              class="tabs">
        <q-tab name="today"
               label="امروز" />
        <q-tab name="alarms"
               label="Alarms" />
      </q-tabs>
      <q-tab-panels v-model="tab"
                    animated>
        <q-tab-panel name="today">
          <entity-index v-model:value="inputs"
                        v-model:table-selected-values="selected"
                        title="لیست کاربران"
                        show-no-entity-slot
                        :api="api"
                        :table="table"
                        :table-keys="tableKeys"
                        :table-selection-mode="'multiple'"
                        :item-indicator-key="'id'"
                        :default-layout="false"
                        @onInputClick="onEntityButtonsClicked">
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
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <upload-progress-dialog v-model:dialog="progressDialog" />
  </div>
</template>

<script>
import UploadProgressDialog from './components/UploadProgressDialog/UploadProgressDialog.vue'
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import ActionBtnComponent from 'components/UserOrders/actionBtn.vue'
import { shallowRef } from 'vue'
const ActionBtn = shallowRef(ActionBtnComponent)
export default {
  name: 'UploadCenterComponent',
  components: {
    UploadProgressDialog,
    EntityIndex
  },
  data() {
    return {
      progressDialog: false,
      tab: 'today',
      expanded: true,
      selected: [],
      api: API_ADDRESS.set.show(1287),
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
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => row.is_free
          },
          {
            name: 'updated_at',
            required: true,
            label: 'تاریخ بارگذاری',
            align: 'left',
            field: row => row.updated_at
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
      inputs: [
        { type: 'input', name: 'search-btn', value: null, label: 'جستجو در فیلم ها', col: 'col-md-3', class: 'align-left' },
        { type: 'button', name: 'search', icon: 'search', unelevated: true, col: 'col-md-1' },
        { type: 'button', label: 'فیلتر', name: 'filter', icon: 'isax:filter', unelevated: true, col: 'col-md-1' },
        { type: 'hidden', col: 'col-md-5' },
        { type: 'select', name: 'order', label: 'ترتیب نمایش', col: 'col-md-2', value: 0, options: [{ label: 'پیش فرض', value: 0 }, { label: 'جدید ترین', value: 8 }, { label: 'قدیمی ترین', value: 3 }] },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          value: [
            { type: 'select', name: 'status', label: 'وضعیت', col: 'col-md-2', value: 'انتخاب کنید', options: [{ label: 'پیش نویس', value: 13 }, { label: 'زمان بندی شده', value: 0 }, { label: 'منتشر شده', value: 8 }, { label: 'غیر غعال', value: 3 }] },
            { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ پرداخت از', col: 'col-md-2' },
            { type: 'date', name: 'created_at_range', value: null, label: 'تا', col: 'col-md-2' },
            { type: 'select', name: 'tags', label: 'درخت دانش', col: 'col-md-6', value: 'انتخاب کنید', options: [{ label: 'پیش نویس', value: 13 }, { label: 'زمان بندی شده', value: 0 }, { label: 'منتشر شده', value: 8 }, { label: 'غیر غعال', value: 3 }] },
            { type: ActionBtn, name: 'ActionBtn', col: 'col-12' }
          ]
        }
      ]
    }
  },
  methods: {
    toggleUploadProgressDialog(value) {
      this.progressDialog = !this.progressDialog
    },
    onEntityButtonsClicked(inputObj) {
      // console.log('button', inputObj)
      if (inputObj.input.type !== 'button') {
        return
      }

      console.log('button', inputObj)
    }
  }
}
</script>

<style scoped lang="scss">
.upload-center {
  .header{
    display: flex;
    justify-content: space-between;
  }
  .body {
    .tabs {
      :deep(.q-tabs__content){
        border-bottom: 1px solid #444444;
      }
    }
  }
}
</style>
