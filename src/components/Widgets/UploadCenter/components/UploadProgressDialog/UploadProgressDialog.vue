<template>
  <q-dialog :model-value="dialog"
            persistent>
    <div class="upload-dialog-wrapper">
      <div class="upload-dialog-header">
        <div class="upload-dialog-header-title">
          نام فایل ویدیو مربوطه
        </div>
        <div class="upload-dialog-header-close-btn">
          <q-btn v-close-popup
                 flat
                 icon="close"
                 @click="$emit('toggleDialog')" />
        </div>
      </div>
      <div class="upload-dialog-main-content">
        <q-stepper ref="stepper"
                   v-model="step"
                   color="primary"
                   animated
                   header-nav
                   flat>
          <q-step :name="1"
                  title="مشخصات"
                  icon="settings"
                  done-icon="settings"
                  active-icon="settings"
                  :done="step > 1">
            <upload-properties ref="uploadProperties"
                               v-model:content="content" />
          </q-step>
          <q-step :name="2"
                  title="زمان کوب"
                  icon="shutter_speed"
                  done-icon="shutter_speed"
                  active-icon="shutter_speed"
                  :done="step > 2">
            <upload-timestamp v-model:content="content"
                              @refreshContent="getContent()" />
          </q-step>
          <q-step :name="3"
                  title="انتشار فیلم"
                  icon="connected_tv"
                  done-icon="connected_tv"
                  active-icon="connected_tv"
                  :done="step > 3">
            <upload-publish ref="uploadPublish"
                            v-model:content="content"
                            @update-form-data="updatePublishForm($event)" />
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="stepper-footer-navigation">
              <q-btn v-if="step > 1"
                     flat
                     color="primary"
                     label="بازگشت"
                     class="q-mr-sm"
                     @click="$refs.stepper.previous()" />
              <q-btn color="primary"
                     :label="step === 3 ?'انتشار' : 'بعدی'"
                     @click="gotoNextStep()" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import UploadProperties from './UploadProperties/UploadProperties.vue'
import UploadTimestamp from './UploadTimestamp/UploadTimestamp.vue'
import UploadPublish from './UploadPublish/UploadPublish.vue'
import { Content } from 'src/models/Content'

export default {
  name: 'UploadProgressDialog',
  components: {
    UploadProperties,
    UploadTimestamp,
    UploadPublish
  },
  props: {
    dialog: {
      type: [Boolean, null],
      default: false
    },
    contentId: {
      type: Number
    }
  },
  emits: ['toggleDialog'],
  data() {
    return {
      step: 1,
      content: new Content(),
      publishForm: {}
    }
  },
  watch: {
    contentId(value) {
      this.getContent(value)
    }
  },
  // mounted() {
  //   this.getContent()
  // },
  methods: {
    getContent(value) {
      this.$apiGateway.content.showAdmin(value).then(res => {
        this.content = res
      }).catch(() => {
        this.content = new Content()
      })
    },
    updatePublishForm(formData) {
      this.publishForm = formData
    },
    gotoNextStep() {
      if (this.step === 1) {
        this.$refs.uploadProperties.$refs.entityEditForm.editEntity().then(res => {
          this.$refs.stepper.next()
        }).catch(err => {
          console.error(err)
        })
      } else if (this.step === 2) {
        this.$refs.stepper.next()
      } else {
        // console.log(this.$refs.uploadPublish)
        this.$apiGateway.content.update({
          data: this.$refs.uploadPublish.publish()
        })
      }
    },
    publish() {
      this.$apiGateway.content.update({
        data: this.publishForm
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-dialog-wrapper {
  width: 1280px;
  height: 780px;
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

    .stepper-footer-navigation {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
