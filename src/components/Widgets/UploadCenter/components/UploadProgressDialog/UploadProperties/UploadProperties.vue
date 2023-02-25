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
                 @click="toggleDialog()" />
          <previous-item-dialog v-model:dialog="pervDialog" />
        </div>
        <div class="video-box">
          <div class="video-box-title">
            '
          </div>
          <!-- <video-player class="video"
                        :hlsSource="'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8'" /> -->
          <video-player :source="'https://stage-minio.alaatv.com/alaatv/hls-test2/768001zone_master_pl.m3u8'" />
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
import VideoPlayer from 'src//components/ContentVideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { APIGateway } from 'src/api/APIGateway'
import { shallowRef } from 'vue'
import TreeInputComponent from 'components/Utils/TreeInput.vue'
import TagsComponent from 'src/components/Utils/Tags.vue'

const TreeInput = shallowRef(TreeInputComponent)
const Tags = shallowRef(TagsComponent)
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
          placeholder: 'مجموعه محتوا را انتخاب کنید',
          col: 'col-12',
          selectionMode: 'single',
          tableRowExpandable: true,
          tableRowDefaultExpandAction: true,
          popUpButtonConfig: {
            unelevated: true,
            color: 'white',
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
              { type: 'input', name: 'search', value: null, outlined: true, placeholder: 'انتخاب نمایید', label: 'جست و جو', col: 'col-md-3' }
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
          name: 'forrest_trees',
          label: 'درخت دانش',
          responseKey: 'data.forrest_trees',
          col: 'col-md-12',
          value: []
        },
        {
          type: Tags,
          name: 'tags',
          label: 'برچسب',
          responseKey: 'data.tags',
          col: 'col-md-12'
        },
        {
          type: 'hidden',
          name: 'order',
          label: 'برچسب',
          responseKey: 'data.order',
          col: 'col-md-12'
        },
        {
          type: 'hidden',
          name: 'author_id',
          label: 'برچسب',
          responseKey: 'data.author_id',
          col: 'col-md-12'
        }
      ],
      entityIdKey: '',
      entityParamKey: ''
    }
  },
  computed: {
    order() {
      return this.setForm.orderType
    }
  },
  watch: {
    order(value) {
      if (value === 'last') {
        this.inputs.find(x => x.name === 'order').value = -1
      } else {
        this.inputs.find(x => x.name === 'order').value = this.setForm.order
      }
    }
  },
  mounted() {
    this.getTeachers()
    this.inputs[0].selected = this.content
  },
  methods: {
    setTeacher(e) {
      this.setForm.teacher = e
      this.inputs.find(x => x.name === 'author_id').value = e.id
    },
    getTeachers() {
      this.$apiGateway.user.getRoll({ data: { rollId: this.$enums.Rolls.TEACHER } }).then(res => {
        this.teachers = res.list
      })
    },
    expandRow (props) {
      props.expand = props.selected
    },
    toggleDialog() {
      this.pervDialog = !this.pervDialog
    },
    videoSource() {
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
