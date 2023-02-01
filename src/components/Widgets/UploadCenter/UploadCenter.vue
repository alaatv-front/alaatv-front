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
        <q-tab name="draft"
               label="پیش‌نویس" />
        <q-tab name="timed"
               label="زمان دار" />
        <q-tab name="unable"
               label="غیرفعال" />
        <q-tab name="allContents"
               label="همه فیلم‌ها" />
      </q-tabs>
      <q-tab-panels v-model="tab"
                    animated>
        <q-tab-panel name="today">
          <entity-index ref="entityIndex"
                        v-model:value="inputs"
                        v-model:table-selected-values="selected"
                        show-no-entity-slot
                        :api="api"
                        :table="table"
                        :table-keys="tableKeys"
                        :table-selection-mode="'multiple'"
                        :item-indicator-key="'id'"
                        :default-layout="false"
                        :show-search-button="false"
                        :show-reload-button="true"
                        @update:tableSelectedValues="entitySelected"
                        @onInputClick="onEntityButtonsClicked">
            <template v-slot:after-form-builder>
              <entity-edit-header v-model:selected-values="entitySelectedValues" />
            </template>
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
                <q-img :src="inputData.col.thumbnail"
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
        </q-tab-panel>

        <q-tab-panel name="draft">
          <div class="text-h6">draft</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="alarms">
          <div class="text-h6">alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="timed">
          <div class="text-h6">timed</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="unable">
          <div class="text-h6">unable</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="allContents">
          <div class="text-h6">allContents</div>
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
import ActionBtnComponent from 'components/Utils/actionBtn.vue'
import { shallowRef } from 'vue'
import EntityEditHeader from 'components/Utils/EntityEditHeader.vue'
import { APIGateway } from 'src/api/APIGateway'
import TreeInputComponent from 'components/Utils/TreeInput.vue'
const ActionBtn = shallowRef(ActionBtnComponent)
const TreeInput = shallowRef(TreeInputComponent)
export default {
  name: 'UploadCenterComponent',
  components: {
    EntityEditHeader,
    UploadProgressDialog,
    EntityIndex
  },
  data() {
    return {
      entitySelectedValues: [],
      isFilterBoxHidden: false,
      progressDialog: false,
      tab: 'today',
      expanded: true,
      selected: [],
      api: APIGateway.content.FullAPIAdresses.admin,
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
            label: 'فیلم',
            align: 'left',
            field: row => row.thumbnail
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row
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
        { type: 'input', name: 'search-btn', value: null, label: 'جستجو در فیلم ها', col: 'col-md-3', responseKey: '' },
        { type: 'button', name: 'search', icon: 'search', unelevated: true, col: 'col-md-1' },
        { type: 'button', label: 'فیلتر', name: 'filter-button', icon: 'isax:filter', unelevated: true, col: 'col-md-1' },
        { type: 'separator', col: 'col-md-5', size: '0' },
        { type: 'select', name: 'order', label: 'ترتیب نمایش', col: 'col-md-2', value: 0, options: [{ label: 'پیش فرض', value: 0 }, { label: 'جدید ترین', value: 8 }, { label: 'قدیمی ترین', value: 3 }] },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          class: 'entity-filter-box',
          value: [
            { type: 'select', name: 'status', label: 'وضعیت', col: 'col-md-2', responseKey: 'data.enable', value: 1, options: [{ label: 'فعال', value: 1 }, { label: 'غیر فعال', value: 0 }] },
            { type: 'date', name: 'created_at_from', value: null, label: 'تاریخ بارگزاری از', responseKey: 'data.created_at', col: 'col-md-2' },
            { type: 'date', name: 'created_at_till', value: null, label: 'تا', responseKey: 'data.created_at', col: 'col-md-2' },
            {
              type: TreeInput,
              name: 'tags',
              label: 'درخت دانش',
              responseKey: 'data.tags',
              col: 'col-md-6',
              ignoreValue: true,
              value: [
                {
                  crud: {
                    headers: {}
                  },
                  apiResource: null,
                  inputData: {
                    crud: {
                      headers: {}
                    },
                    apiResource: null,
                    warn: {
                      mode: false,
                      keys: []
                    },
                    editMode: false,
                    loading: false,
                    props: [
                      {
                        key: 'id'
                      },
                      {
                        key: 'title'
                      },
                      {
                        key: 'parent'
                      },
                      {
                        key: 'ancestors',
                        default: []
                      },
                      {
                        key: 'parentOfSelectedNode',
                        default: []
                      },
                      {
                        key: 'type'
                      },
                      {
                        key: 'updated_at'
                      },
                      {
                        key: 'created_at'
                      },
                      {
                        key: 'number_of_children'
                      },
                      {
                        key: 'children',
                        default: []
                      },
                      {
                        key: 'lazy',
                        default: true
                      },
                      {
                        key: 'order'
                      },
                      {
                        key: 'treeNodes'
                      }
                    ],
                    id: '6281fc192f1bafe99f05033a',
                    title: 'فصل اول: تابع',
                    parent: {
                      id: '6281fbfd2f1bafe99f050337',
                      title: 'حسابان ۲'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fbfd2f1bafe99f050337',
                        title: 'حسابان ۲'
                      }
                    ],
                    parentOfSelectedNode: [],
                    type: null,
                    updated_at: '2022-11-11 10:03:34',
                    created_at: '2022-05-16 11:54:09',
                    number_of_children: 2,
                    children: [],
                    lazy: true,
                    order: 1,
                    treeNodes: null
                  },
                  warn: {
                    mode: false,
                    keys: []
                  },
                  editMode: false,
                  loading: false,
                  props: [
                    {
                      key: 'id'
                    },
                    {
                      key: 'title'
                    },
                    {
                      key: 'parent'
                    },
                    {
                      key: 'ancestors',
                      default: []
                    },
                    {
                      key: 'parentOfSelectedNode',
                      default: []
                    },
                    {
                      key: 'type'
                    },
                    {
                      key: 'updated_at'
                    },
                    {
                      key: 'created_at'
                    },
                    {
                      key: 'number_of_children'
                    },
                    {
                      key: 'children',
                      default: []
                    },
                    {
                      key: 'lazy',
                      default: true
                    },
                    {
                      key: 'order'
                    },
                    {
                      key: 'treeNodes'
                    }
                  ],
                  id: '6281fc192f1bafe99f05033a',
                  title: 'فصل اول: تابع',
                  parent: {
                    id: '6281fbfd2f1bafe99f050337',
                    title: 'حسابان ۲'
                  },
                  ancestors: [
                    {
                      id: '6281fb9e2f1bafe99f050334',
                      title: 'درخت دانش'
                    },
                    {
                      id: '6281fbeb2f1bafe99f050336',
                      title: 'پایه دوازدهم'
                    },
                    {
                      id: '6281fbfd2f1bafe99f050337',
                      title: 'حسابان ۲'
                    }
                  ],
                  parentOfSelectedNode: [],
                  type: null,
                  updated_at: '2022-11-11 10:03:34',
                  created_at: '2022-05-16 11:54:09',
                  number_of_children: 2,
                  children: [],
                  lazy: true,
                  order: 1,
                  treeNodes: null
                },
                {
                  crud: {
                    headers: {}
                  },
                  apiResource: null,
                  inputData: {
                    crud: {
                      headers: {}
                    },
                    apiResource: null,
                    warn: {
                      mode: false,
                      keys: []
                    },
                    editMode: false,
                    loading: false,
                    props: [
                      {
                        key: 'id'
                      },
                      {
                        key: 'title'
                      },
                      {
                        key: 'parent'
                      },
                      {
                        key: 'ancestors',
                        default: []
                      },
                      {
                        key: 'parentOfSelectedNode',
                        default: []
                      },
                      {
                        key: 'type'
                      },
                      {
                        key: 'updated_at'
                      },
                      {
                        key: 'created_at'
                      },
                      {
                        key: 'number_of_children'
                      },
                      {
                        key: 'children',
                        default: []
                      },
                      {
                        key: 'lazy',
                        default: true
                      },
                      {
                        key: 'order'
                      },
                      {
                        key: 'treeNodes'
                      }
                    ],
                    id: '6281fc4a2f1bafe99f05033f',
                    title: 'فصل دوم: مثلثات',
                    parent: {
                      id: '6281fbfd2f1bafe99f050337',
                      title: 'حسابان ۲'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fbfd2f1bafe99f050337',
                        title: 'حسابان ۲'
                      }
                    ],
                    parentOfSelectedNode: [],
                    type: null,
                    updated_at: '2022-08-15 12:24:03',
                    created_at: '2022-05-16 11:54:58',
                    number_of_children: 2,
                    children: [],
                    lazy: true,
                    order: '2',
                    treeNodes: null
                  },
                  warn: {
                    mode: false,
                    keys: []
                  },
                  editMode: false,
                  loading: false,
                  props: [
                    {
                      key: 'id'
                    },
                    {
                      key: 'title'
                    },
                    {
                      key: 'parent'
                    },
                    {
                      key: 'ancestors',
                      default: []
                    },
                    {
                      key: 'parentOfSelectedNode',
                      default: []
                    },
                    {
                      key: 'type'
                    },
                    {
                      key: 'updated_at'
                    },
                    {
                      key: 'created_at'
                    },
                    {
                      key: 'number_of_children'
                    },
                    {
                      key: 'children',
                      default: []
                    },
                    {
                      key: 'lazy',
                      default: true
                    },
                    {
                      key: 'order'
                    },
                    {
                      key: 'treeNodes'
                    }
                  ],
                  id: '6281fc4a2f1bafe99f05033f',
                  title: 'فصل دوم: مثلثات',
                  parent: {
                    id: '6281fbfd2f1bafe99f050337',
                    title: 'حسابان ۲'
                  },
                  ancestors: [
                    {
                      id: '6281fb9e2f1bafe99f050334',
                      title: 'درخت دانش'
                    },
                    {
                      id: '6281fbeb2f1bafe99f050336',
                      title: 'پایه دوازدهم'
                    },
                    {
                      id: '6281fbfd2f1bafe99f050337',
                      title: 'حسابان ۲'
                    }
                  ],
                  parentOfSelectedNode: [],
                  type: null,
                  updated_at: '2022-08-15 12:24:03',
                  created_at: '2022-05-16 11:54:58',
                  number_of_children: 2,
                  children: [],
                  lazy: true,
                  order: '2',
                  treeNodes: null
                }
              ]
            },
            { type: ActionBtn, name: 'ActionBtn', col: 'col-12' }
          ]
        }
      ]
    }
  },
  mounted () {
    this.initFilterBoxDisplay()
  },
  methods: {
    initFilterBoxDisplay () {
      this.toggleFilterBox()
    },
    toggleUploadProgressDialog(value) {
      this.progressDialog = !this.progressDialog
    },
    onEntityButtonsClicked(inputObj) {
      // todo : not working properly
      const input = inputObj.input
      const event = inputObj.event
      // console.log('event', event)
      if (input.type !== 'button') {
        return
      }
      if (input.name === 'filter-button') {
        this.toggleFilterBox()
      }
      if (event === 'reload') {
        this.$refs.entityIndex.reload()
      }
      if (event === 'filter') {
        this.$refs.entityIndex.search()
      }
    },
    toggleFilterBox () {
      this.isFilterBoxHidden = !this.isFilterBoxHidden
      if (this.isFilterBoxHidden) {
        this.changeFilterBoxElementDisplay('none')
        return
      }
      this.changeFilterBoxElementDisplay('flex')
    },
    changeFilterBoxElementDisplay (display) {
      document.querySelector('.entity-filter-box').style.display = display
    },
    entitySelected (val) {
      // console.log('val', val)
      this.entitySelectedValues = val
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
