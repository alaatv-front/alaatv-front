<template>
  <div class="upload-center">
    <div class="header">
      <div class="upload-box">
        <div class="title">مرکز بارگذاری </div>
        <q-btn color="primary"
               label="بارگذاری"
               icon-right="isax:add"
               @click="toggleUploadDialog()" />

      </div>
      <q-tabs v-model="tab"
              inline-label
              align="left"
              class="tabs"
              @update:model-value="onTabChanged">
        <div v-for="(tab, index) in tabList"
             :key="index">
          <q-tab :name="tab.name"
                 :label="tab.label" />
        </div>
      </q-tabs>
    </div>
    <div class="body">
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
                    :show-reload-button="true"
                    @update:tableSelectedValues="entitySelected"
                    @onInputClick="onEntityButtonsClicked">
        <template v-slot:after-form-builder>
          <content-edit-header v-model:selected-values="entitySelectedValues"
                               @contentUpdated="reloadEntity(false)" />
        </template>
        <template v-slot:no-entity>
          <div class="flex column items-center q-pa-lg">
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
            <div>محتوایی وجود نداره!</div>
            <div class="q-mb-sm"> هیچ فیلم و جزوه‌ای بارگذاری و یا ویرایش نشده.</div>
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
            <q-img :src="inputData.col.photo"
                   :ratio="16/9"
                   width="142px"
                   height="78px" />
          </template>
          <template v-else-if="inputData.col.name === 'title'">
            <div class="body1">{{inputData.col.value.name}}</div>
            <div v-html="inputData.col.value.description" />
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </div>
    <upload-progress-dialog v-model:dialog="progressDialog"
                            v-model:contentId="progressDialogContentId"
                            @toggleDialog="toggleUploadProgressDialog(false)" />
    <upload-dialog v-model:dialog="uploadDialog"
                   @toggleDialog="toggleUploadDialog(false)"
                   @editContent="toggleUploadProgressDialog($event)" />

  </div>
</template>

<script>
import UploadProgressDialog from './components/UploadProgressDialog/UploadProgressDialog.vue'
import UploadDialog from './components/UploadDialog/UploadDialog.vue'
import { EntityIndex } from 'quasar-crud'
import ActionBtnComponent from 'components/Utils/actionBtn.vue'
import { shallowRef } from 'vue'
import ContentEditHeader from 'components/Utils/ContentEditHeader.vue'
import { APIGateway } from 'src/api/APIGateway'
import TreeInputComponent from 'components/Utils/TreeInput.vue'
import jalali from 'moment-jalaali'
import moment from 'moment/moment'
const ActionBtn = shallowRef(ActionBtnComponent)
const TreeInput = shallowRef(TreeInputComponent)
export default {
  name: 'UploadCenterComponent',
  components: {
    ContentEditHeader,
    UploadProgressDialog,
    UploadDialog,
    EntityIndex
  },
  data () {
    return {
      tabList: [
        {
          name: 'createdAtSince',
          label: 'امروز'
        },
        {
          name: 'contentStatus',
          label: 'پیش‌نویس'
        },
        {
          name: 'timed',
          label: 'زمان دار'
        },
        {
          name: 'notEnable',
          label: 'غیر فعال'
        },
        {
          name: 'allContents',
          label: 'همه فیلم‌ها'
        }
      ],
      entitySelectedValues: [],
      isFilterBoxHidden: false,
      progressDialog: false,
      uploadDialog: false,
      progressDialogContentId: 0,
      tab: 'createdAtSince',
      expanded: true,
      selected: [],
      api: APIGateway.content.APIAdresses.admin,
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
            field: row => jalali(row.updated_at)
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
        { type: 'hidden', name: 'content_status[]', value: null },
        { type: 'hidden', name: 'timed', value: null },
        { type: 'input', name: 'name', outlined: true, label: 'جستجو در فیلم ها', placeholder: 'انتخاب نمایید', col: 'col-md-3' },
        { type: 'button', name: 'search', class: '', icon: 'search', unelevated: true, col: 'col-md-1 self-end' },
        { type: 'button', label: 'فیلتر', class: '', name: 'filter-button', icon: 'isax:filter', unelevated: true, col: 'col-md-1 self-end' },
        { type: 'separator', col: 'col-md-4', size: '0' },
        { type: 'select', name: 'order_type[]', outlined: true, placeholder: '.', label: 'ترتیب نمایش', col: 'col-md-3', value: 'desc', options: [{ label: 'جدید ترین', value: 'desc' }, { label: 'قدیمی ترین', value: 'asc' }] },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12',
          class: 'entity-filter-box',
          ignoreValue: true,
          value: [
            { type: 'select', name: 'enable', outlined: true, placeholder: ' ', label: 'وضعیت', col: 'col-md-2', value: null, options: [{ label: 'فعال', value: 1 }, { label: 'غیر فعال', value: 0 }] },
            { type: 'date', name: 'createdAtSince', outlined: true, placeholder: 'انتخاب نمایید', value: null, label: 'تاریخ بارگزاری از', col: 'col-md-2' },
            { type: 'date', name: 'createdAtTill', outlined: true, placeholder: 'انتخاب نمایید', value: null, label: 'تا', col: 'col-md-2' },
            {
              type: TreeInput,
              name: 'tags[]',
              label: 'درخت دانش',
              col: 'col-md-6',
              ignoreValue: true,
              value: []
            },
            { type: ActionBtn, name: 'ActionBtn', col: 'col-12' }
          ]
        }
      ]
    }
  },
  beforeMount () {
    this.initEntityValues()
  },
  mounted () {
    this.initFilterBoxDisplay()
  },
  methods: {
    getRemoveMessage (row) {
      const firstName = row.first_name
      const lastName = row.last_name
      return 'آیا از حذف ' + firstName + ' ' + lastName + ' اطمینان دارید؟'
    },
    initEntityValues () {
      const formBuilderInputIndex = this.inputs.findIndex(input => input.name === 'formBuilderCol')
      const inputIndex = this.inputs[formBuilderInputIndex].value.findIndex(input => input.name === 'createdAtSince')
      this.inputs[formBuilderInputIndex].value[inputIndex].value = this.getCurrentDate()
    },
    onTabChanged (val) {
      this.setSelectedMode(val)
    },
    setSelectedMode (val) {
      this.$refs.entityIndex.refreshAllInputs()
      this.setBaseMode()
      if (val === 'createdAtSince') {
        this.setCreatedAtSinceMode()
      } else if (val === 'contentStatus') {
        this.setContentStatusMode()
      } else if (val === 'timed') {
        this.setTimedMode()
      } else if (val === 'notEnable') {
        this.setNotEnableMode()
      }
      this.$refs.entityIndex.search()
    },
    setBaseMode () {
      this.$refs.entityIndex.setInputByName('order_type[]', 'desc')
      this.$refs.entityIndex.setInputAttributeByName('createdAtSince', 'readonly', false)
      this.$refs.entityIndex.setInputAttributeByName('enable', 'readonly', false)
    },
    getCurrentDate () {
      return moment(new Date()).format('YYYY-MM-DD')
    },
    setCreatedAtSinceMode () {
      this.$refs.entityIndex.setInputByName('createdAtSince', this.getCurrentDate())
      this.$refs.entityIndex.setInputAttributeByName('createdAtSince', 'readonly', true)
      // this.$refs.entityIndex.setInputByName('createdAtTill', currentDate)
    },
    setContentStatusMode () {
      this.$refs.entityIndex.setInputByName('content_status[]', '2')
    },
    setTimedMode () {
      this.$refs.entityIndex.setInputByName('timed', '1')
    },
    setNotEnableMode () {
      this.$refs.entityIndex.setInputByName('enable', 0)
      this.$refs.entityIndex.setInputAttributeByName('enable', 'readonly', true)
    },
    initFilterBoxDisplay () {
      this.toggleFilterBox()
    },
    toggleUploadProgressDialog (value) {
      if (value) {
        this.progressDialogContentId = value
      } else {
        this.progressDialogContentId = null
      }
      this.progressDialog = !this.progressDialog
    },
    toggleUploadDialog (value) {
      this.uploadDialog = !this.uploadDialog
    },
    onEntityButtonsClicked (inputObj) {
      const input = inputObj.input
      const event = inputObj.event
      if (event === 'reload') {
        this.reloadEntity(true)
      }
      if (event === 'filter') {
        this.undoTagIgnoreValue()
        this.$refs.entityIndex.search()
      }
      if (input.type !== 'button') {
        return
      } else if (input.name === 'search') {
        this.$refs.entityIndex.search()
      }
      if (input.name === 'filter-button') {
        this.toggleFilterBox()
        if (this.isFilterBoxHidden) {
          this.refreshFilterBox()
        }
      }
    },
    reloadEntity (doRefresh = false) {
      if (doRefresh) {
        this.$refs.entityIndex.refreshAllInputs()
      }
      this.$refs.entityIndex.search()
    },
    undoTagIgnoreValue () {
      this.inputs.forEach(item => {
        if (item.type === 'formBuilder') {
          item.value.forEach(input => {
            if (input.name === 'tags[]') {
              input.ignoreValue = false
            }
          })
        }
      })
    },
    refreshFilterBox () {
      const array = ['enable', 'createdAtSince', 'createdAtTill', 'tags[]']
      array.forEach(item => {
        this.$refs.entityIndex.setInputByName(item, null)
      })
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
      if (!document.querySelector('.entity-filter-box')) {
        return
      }
      document.querySelector('.entity-filter-box').style.display = display
    },
    entitySelected (val) {
      this.entitySelectedValues = val
    }
  }
}
</script>

<style scoped lang="scss">
.upload-center {
  .header {
    .upload-box{
      display: flex;
      justify-content: space-between;
    }

    .tabs {
      :deep(.q-tabs__content){
        border-bottom: 1px solid #444;
      }
    }
  }

  .body {
    background-color: #fff;
    padding: 20px;

  }
}
</style>
