<template>
  <div class="upload-information-wrapper">
    <div class="row">
      <div class="col-6 upload-form-col">
        <entity-edit v-model:value="inputs"
                     title="ویرایش اطلاعات محتوا"
                     :entity-id-key="entityIdKey"
                     :entity-param-key="entityParamKey"
                     :default-layout="false" />
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
          <div class="video-box-title" />
          <video-player class="video"
                        :sources="videoSource()"
                        :hlsSource="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'" />
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

export default {
  name: 'UploadProperties',
  components: {
    EntityEdit,
    PreviousItemDialog,
    VideoPlayer
  },
  data() {
    return {
      pervDialog: false,
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
          responseKey: 'description',
          name: 'description',
          label: 'توضیحات',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'input',
          responseKey: 'set',
          name: 'set',
          label: 'مجموعه',
          placeholder: 'مجموعه محتوا را انتخاب کنید',
          col: 'col-md-12'
        },
        {
          type: 'File',
          responseKey: 'cover',
          name: 'cover',
          label: 'کاور',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-12'
        },
        {
          type: 'input',
          responseKey: 'tree',
          name: 'tree',
          label: 'درخت دانش',
          placeholder: 'انتخاب کنید',
          col: 'col-md-12'
        },
        {
          type: 'Select',
          responseKey: 'tag',
          name: 'tag',
          multiple: true,
          useChips: true,
          label: 'برچسب',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        }
      ],
      entityIdKey: '',
      entityParamKey: ''
    }
  },
  methods: {
    toggleDialog() {
      this.pervDialog = !this.pervDialog
    },
    videoSource() {
      return new PlayerSourceList([{ link: 'https://nodes.alaatv.com/upload/introVideos/110/110zaminmoarefi.mp4' }])
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
</style>
