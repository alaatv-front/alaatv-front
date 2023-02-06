<template>
  <div class="upload-information-wrapper">
    <div class="row">
      <div class="col-6 upload-form-col">
        <entity-edit ref="entityEditForm"
                     v-model:value="inputs"
                     title="ویرایش اطلاعات محتوا"
                     :api="$apiGateway.content.FullAPIAdresses.showAdmin(content.id)"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :default-layout="false">
          <template #entity-index-table-selection-cell="data">
            {{ logggg(data) }}
            <q-checkbox v-model="data.selected"
                        @update:model-value="expandRow(data)" />
          </template>
          <template #entity-index-table-expanded-row="data">
            <div class="form-wrapper">
              <div class="form-label">ترتیب قرارگیری :</div>
              <div class="input-wrapper">
                <q-radio v-model="setForm.orderType"
                         val="last"
                         label="انتهای لیست" />
                <q-radio v-model="setForm.orderType"
                         val="index"
                         label="از شماره" />
                <q-input v-model="text"
                         :disable="setForm.orderType === 'last'"
                         class="q-ml-sm"
                         outlined
                         type="text" />
              </div>
            </div>
            <div class="form-wrapper">
              <div class="form-label">دبیــــر مربوطــه :</div>
              <div class="input-wrapper">
                <q-select v-model="data.row.author.first_name"
                          :options="teachers"
                          style="width:100%"
                          option-value="id"
                          :option-label="(item) => item.first_name + ' ' +item.last_name"
                          outlined />
              </div>
            </div>
          </template>
        </entity-edit>
      </div>
      <div class="col-6 video-box-col">
        <div class="reuse">
          <q-btn color="primary"
                 label="استفاده مجدد مشخصات"
                 flat=""
                 @click="toggleDialog()" />
          <previous-item-dialog v-model:dialog="pervDialog" />
        </div>
        <div class="video-box">
          <div class="video-box-title">
            '
          </div>
          <video-player class="video"
                        :sources="videoSource()"
                        :hlsSource="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'" />
          <!--          <video-player :source="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'" />-->
        </div>
        <div class="link-box">
          <div class="link-title">لینک فیلم</div>
          <div class="link-url">office.alaa.tv.18080/c/createset+1897</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import PreviousItemDialog from '../PreviousItemsDialog/PreviousItemDialog.vue'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { APIGateway } from 'src/api/APIGateway'
import { shallowRef } from 'vue'
import TreeInputComponent from 'components/Utils/TreeInput.vue'

const TreeInput = shallowRef(TreeInputComponent)
export default {
  name: 'UploadProperties',
  components: {
    EntityEdit,
    PreviousItemDialog,
    VideoPlayer
  },
  props: {
    content: Object,
    default: () => {}
  },
  data() {
    return {
      pervDialog: false,
      teachers: [],
      setForm: {
        teacher: '',
        orderType: 'last',
        order: ''
      },
      inputs: [
        {
          type: 'input',
          responseKey: 'data.title',
          name: 'title',
          label: 'عنوان',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'InputEditor',
          responseKey: 'data.body',
          name: 'description',
          label: 'توضیحات',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'entity',
          responseKey: 'data.set',
          name: 'set',
          label: 'مجموعه',
          placeholder: 'مجموعه محتوا را انتخاب کنید',
          col: 'col-md-4',
          selectionMode: 'single',
          buttonColor: 'white',
          buttonTextColor: 'black',
          buttonBadgeColor: 'green',
          tableRowExpandable: true,
          tableRowDefaultExpandAction: true,
          indexConfig: {
            apiAddress: APIGateway.set.FullAPIAdresses.base,
            tableTitle: 'مجموعه ها',
            tableKeys: {
              data: 'data',
              total: 'meta.total',
              currentPage: 'meta.current_page',
              perPage: 'meta.per_page',
              pageKey: 'contentsetPage'
            },
            table: {
              columns: [
                {
                  name: 'id',
                  required: true,
                  label: '#',
                  align: 'left',
                  field: row => row.id
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
              { type: 'input', name: 'search', value: null, label: 'جست و جو', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id'
          },
          itemIndicatorKey: 'title',
          value: [],
          selected: []
        },
        {
          type: 'File',
          responseKey: 'data.photo',
          name: 'cover',
          label: 'کاور',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-12'
        },
        {
          type: TreeInput,
          name: 'tags',
          label: 'درخت دانش',
          responseKey: 'data.forrest_trees',
          col: 'col-md-12',
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
        {
          type: 'Select',
          responseKey: 'data.tag',
          name: 'tag',
          multiple: true,
          useChips: true,
          useInput: true,
          createNewValue: true,
          hideDropdownIcon: true,
          label: 'برچسب',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        }
      ],
      entityIdKey: '',
      entityParamKey: ''
    }
  },
  mounted() {
    this.getTeachers()
  },
  methods: {
    logggg (data) {
      console.log(data)
    },
    getTeachers() {
      this.$apiGateway.user.getRoll({ data: { rollId: this.$enums.Rolls.TEACHER } }).then(res => {
        this.teachers = res.list
      })
    },
    expandRow (props) {
      props.expand = !props.selected
    },
    toggleDialog() {
      this.pervDialog = !this.pervDialog
    },
    videoSource() {
      // return new PlayerSourceList('')
      return new PlayerSourceList(this.content.file.video)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-information-wrapper {
  &:deep(.q-editor__toolbar .q-editor__toolbar-group:nth-child(4)){
    display: none;
  }
  &:deep(.q-editor__toolbar .q-editor__toolbar-group:nth-child(5)){
    display: none;
  }
  &:deep(.q-editor__toolbar .q-editor__toolbar-group:nth-child(7)){
    display: none;
  }
  &:deep(.q-editor__toolbar .q-editor__toolbar-group:nth-child(8)){
    display: none;
  }
  &:deep(.q-editor__toolbar .q-editor__toolbar-group:nth-child(2)){
    .q-btn {
      &:nth-child(3) {
        display: none;
      }
      &:nth-child(5) {
        display: none;
      }
      &:nth-child(6) {
        display: none;
      }
    }
  }

  .upload-form-col {
    padding: 10px;
    max-height: 500px;
    overflow-y: auto;
  }
  .video-box-col{
    padding: 10px;
    .reuse {
      float: right;
    }
    .video-box {
      width: 580px;
      height: 326.25px;
      background: #E9E9E9;
      display: flex;
      align-items: center;
      justify-content: center;

      .video-box-title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        color: #333333;
      }

      .video {
        width: 100%;
      }
    }
    .link-box {
      width: 580px;
      height: 80px;
      background: #F8F8F8;
      padding: 18px 40px;

      .link-title {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #363636;
      }

      .link-url {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #686868;
        cursor: pointer;
      }
    }
  }
}

.form-wrapper{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;

    .form-label {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: right;
      letter-spacing: -0.03em;
      margin-right: 23px;
    }
    .input-wrapper {
      display: flex ;
      width: 410px;
    }
  }
</style>
