<template>
  <div>
    <q-btn color="primary"
           label="آپلود"
           @click="toggleUploadDialog" />
    <q-dialog v-model="uploadDialog">
      <div class="upload-dialog-wrapper">
        <div class="upload-dialog-header">
          <div class="upload-dialog-header-title">
            نام فایل ویدیو مربوطه
          </div>
          <div class="upload-dialog-header-close-btn">
            <q-btn v-close-popup
                   flat
                   icon="close" />
          </div>
        </div>
        <div class="upload-dialog-main-content">
          <q-stepper ref="stepper"
                     v-model="step"
                     color="primary"
                     animated
                     flat>
            <q-step :name="1"
                    title="مشخصات"
                    icon="settings"
                    done-icon="settings"
                    active-icon="settings"
                    :done="step > 1">
              <div class="upload-information-wrapper">
                <div class="row">
                  <div class="col-6">
                    <upload-wrapper />
                    <form-builder :value="inputs" />
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
            </q-step>
            <q-step :name="2"
                    title="زمان کوب"
                    icon="shutter_speed"
                    done-icon="shutter_speed"
                    active-icon="shutter_speed"
                    :done="step > 2">
              An ad group contains one or more ads which target a shared set of keywords.
            </q-step>
            <q-step :name="3"
                    title="انتشار فیلم"
                    icon="connected_tv"
                    done-icon="connected_tv"
                    active-icon="connected_tv"
                    :done="step > 3">
              An ad group contains one or more ads which target a shared set of keywords.
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation class="stepper-footer-navigation">
                <q-btn v-if="step > 1"
                       flat
                       color="primary"
                       label="بازگشت"
                       class="q-ml-sm"
                       @click="$refs.stepper.previous()" />
                <q-btn color="primary"
                       :label="step === 3 ?'انتشار' : 'بعدی'"
                       @click="$refs.stepper.next()" />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import UploadWrapper from './components/UploadWrapper/UploadWrapper.vue'
import FormBuilderObject from 'quasar-form-builder'

export default {
  name: 'UploadCenterComponent',
  components: {
    UploadWrapper,
    FormBuilder: FormBuilderObject.FormBuilder
  },
  data() {
    return {
      uploadDialog: false,
      step: 1,
      inputs: [
        {
          type: 'input',
          responseKey: 'first_name',
          name: 'first_name',
          label: 'نام',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'input',
          responseKey: 'last_name',
          name: 'last_name',
          label: 'نام خانوادگی',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        },
        {
          type: 'input',
          responseKey: 'birthdate',
          name: 'birthdate',
          label: 'تاریخ تولد',
          placeholder: '۱۳۷۷/۰۷/۱۵',
          col: 'col-md-6'
        },
        {
          type: 'select',
          responseKey: 'gender',
          name: 'gender',
          label: 'جنسیت',
          placeholder: 'جنسیت',
          optionLabel: 'label',
          optionValue: 'value',
          col: 'col-md-6',
          options: [
            { label: 'آقا', value: { id: 1, name: 'آقا', title: 'آقا' } },
            {
              label: 'خانم',
              value: { id: 2, name: 'خانم', title: 'خانم' }
            }
          ]
        },
        {
          type: 'input',
          responseKey: 'national_code',
          name: 'national_code',
          label: 'کدملی',
          placeholder: 'وارد کنید',
          col: 'col-md-6'
        }
      ]
    }
  },
  methods: {
    toggleUploadDialog() {
      this.uploadDialog = !this.uploadDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-dialog-wrapper {
  width: 1280px;
  height: 760px;
  max-width: 100%;
  background: #FFFFFF;

  .upload-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    background: rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid #D8D8D8;

    .upload-dialog-header-title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      color: #363636;
    }
  }

  .upload-dialog-main-content {
    position: relative;
    height: calc(100% - 80px);

    .upload-information-wrapper {

      .video-box-col{
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
    .stepper-footer-navigation {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
