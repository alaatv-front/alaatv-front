<template>
  <div class="upload-information-wrapper">
    <loading-content-in-step v-if="content.loading || localLoading" />
    <div v-else
         class="row">
      <div class="col-6 upload-form-col">
        <entity-edit ref="entityEditForm"
                     v-model:value="inputs"
                     title="ویرایش اطلاعات محتوا"
                     :api="$apiGateway.content.APIAdresses.showAdmin(content.id)"
                     :entity-id-key="entityIdKey"
                     :loaded-data="content"
                     :entity-param-key="entityParamKey"
                     :default-layout="false"
                     @onInputClick="onInputClick">
          <template #entity-index-table-selection-cell="data">
            <q-checkbox v-model="data.props.selected"
                        @update:model-value="expandRow(data.props)" />
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
                <q-input v-model="setForm.order"
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
                          :option-label="(item) => item.first_name + ' ' + item.last_name"
                          outlined
                          @update:model-value="setTeacher($event)" />
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
                 @click="toggleDialog('prev')" />
          <previous-item-dialog v-model:dialog="pervDialog"
                                :api="$apiGateway.content.APIAdresses.admin"
                                @selectedUpdated="setValues($event)"
                                @toggleDialog="toggleDialog(('prev'))" />
        </div>
        <div class="video-box">
          <video-player :source="content.getVideoSource()" />
        </div>
        <div class="link-box">
          <div class="link-title">لینک فیلم</div>
          <div class="link-url">{{content.stream.webm}}</div>
        </div>
      </div>
    </div>
    <set-dialog v-model:dialog="setDialogValue"
                @toggleDialog="toggleDialog(('set'))" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import SetDialog from './SetDialog.vue'
import { EntityEdit } from 'quasar-crud'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'
import TagsComponent from 'src/components/Utils/Tags.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import VideoPlayer from 'src/components/ContentVideoPlayer.vue'
import TreeInputComponent from 'components/Utils/TreeInput.vue'
import PreviousItemDialog from '../PreviousItemsDialog/PreviousItemDialog.vue'
import LoadingContentInStep
  from 'components/Widgets/UploadCenter/components/UploadProgressDialog/LoadingContentInStep.vue'

const ContentTags = shallowRef(TagsComponent)
const TreeInput = shallowRef(TreeInputComponent)

export default {
  name: 'UploadProperties',
  components: {
    LoadingContentInStep,
    SetDialog,
    EntityEdit,
    VideoPlayer,
    PreviousItemDialog
  },
  props: {
    content: {
      type: Content,
      default: () => {}
    }
  },
  emits: ['setContentInfo'],
  data () {
    return {
      localLoading: false,
      pervDialog: false,
      setDialogValue: false,
      teachers: [],
      setForm: {
        teacher: '',
        orderType: 'last',
        order: ''
      },
      inputs: [
        {
          type: 'input',
          responseKey: 'title',
          name: 'title',
          label: 'عنوان',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'InputEditor',
          responseKey: 'body',
          name: 'description',
          label: 'توضیحات',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'entity',
          responseKey: 'set',
          name: 'set',
          color: 'negative',
          placeholder: 'مجموعه محتوا را انتخاب کنید',
          col: 'col-12',
          selectionMode: 'single',
          tableRowExpandable: true,
          tableRowDefaultExpandAction: false,
          popUpButtonConfig: {
            unelevated: true,
            color: 'grey-2',
            textColor: 'black',
            badgeColor: 'positive',
            label: 'انتخاب از لیست مجموعه ها'
          },
          dialogConfirmButtonConfig: {
            unelevated: true,
            color: 'positive',
            label: 'ثبت مجموعه'
          },
          indexConfig: {
            apiAddress: APIGateway.set.APIAdresses.base,
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
              { type: 'input', name: 'search', value: null, outlined: true, placeholder: 'انتخاب نمایید', label: 'جست و جو', col: 'col-md-3' },
              { type: 'input', name: 'id', value: null, outlined: true, placeholder: 'آیدی ممورد نظر را وارد کنید', label: 'آیدی', col: 'col-md-3' },
              { type: '', name: '', col: 'col-md-3' },
              { type: 'button', name: 'setButton', label: 'ایجاد محموعه جدید', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id'
          },
          itemIdentifyKey: 'id',
          itemIndicatorKey: 'title',
          value: [],
          selected: []
        },
        {
          type: 'file',
          responseKey: 'photo',
          name: 'thumbnail',
          label: 'کاور',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-12'
        },
        {
          type: TreeInput,
          name: 'forrest_trees',
          label: 'درخت دانش',
          responseKey: 'forrest_trees',
          col: 'col-md-12',
          value: []
        },
        {
          type: ContentTags,
          name: 'forrest_tree_tags',
          label: 'برچسب',
          placeholder: 'برچسب',
          responseKey: 'forrest_tree_tags',
          col: 'col-md-12'
        },
        {
          type: 'hidden',
          name: 'order',
          label: 'برچسب',
          responseKey: 'order',
          col: 'col-md-12'
        },
        {
          type: 'hidden',
          name: 'author_id',
          label: 'برچسب',
          responseKey: 'author_id',
          col: 'col-md-12'
        }
      ],
      entityIdKey: 'id',
      entityParamKey: 'id'
    }
  },
  computed: {
    order () {
      return this.setForm.orderType
    },
    entityContent: () => this.content
  },
  watch: {
    order (value) {
      if (value === 'last') {
        this.inputs.find(x => x.name === 'order').value = -1
      } else {
        this.inputs.find(x => x.name === 'order').value = this.setForm.order
      }
    }
  },
  mounted () {
    this.getTeachers()
    this.inputs[0].selected = this.content
  },
  methods: {
    setValues (content) {
      this.$emit('setContentInfo', content)
    },
    onInputClick (e) {
      if (e.input.name === 'setButton') {
        this.toggleDialog('set')
      }
    },
    setTeacher (e) {
      this.setForm.teacher = e
      this.inputs.find(x => x.name === 'author_id').value = e.id
    },
    getTeachers () {
      this.$apiGateway.user.adminIndex({
        data: { rollId: this.$enums.Rolls.TEACHER }
      }).then(res => {
        this.teachers = res.list
      })
    },
    expandRow (props) {
      props.expand = !props.selected
    },
    toggleDialog (dialog) {
      if (dialog === 'set') {
        this.setDialogValue = !this.setDialogValue
      } else {
        this.pervDialog = !this.pervDialog
      }
    },
    videoSource () {
      // return new PlayerSourceList('')
      return new PlayerSourceList(this.content.file === null ? '' : this.content.file.video)
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
        color: #333;
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
