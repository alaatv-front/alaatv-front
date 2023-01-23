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
        <div class="video-box">
          <div class="video-box-title">
            در حال آپلود ...
          </div>
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
export default {
  name: 'UploadProperties',
  components: {
    EntityEdit
  },
  data() {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
.upload-information-wrapper {
  overflow-y: auto;
  max-height: 500px;

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
  }
  .video-box-col{
    padding: 10px;
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
