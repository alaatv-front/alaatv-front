<template>
  <q-dialog :model-value="dialog"
            persistent>
    <div class="upload-dialog-wrapper">
      <div class="upload-dialog-header">
        <div class="upload-dialog-header-title">
          آپلود فایل
        </div>
        <div class="upload-dialog-header-close-btn">
          <q-btn v-close-popup
                 flat
                 icon="close"
                 @click="$emit('toggleDialog')" />
        </div>
      </div>
      <div class="upload-dialog-main-content">
        <q-uploader ref="uploader"
                    color="primary"
                    flat
                    multiple
                    auto-upload
                    :factory="factoryFn"
                    style="width: 100%;max-height: 100%;height: 100%;background: transparent;z-index: 1;"
                    @added="noItem = false"
                    @factory-failed="onRejected()">
          <template v-slot:list="scope">
            <q-list separator>

              <q-item v-for="file in scope.files"
                      :key="file.__key">
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top
                                side>
                  <q-btn size="12px"
                         flat
                         dense
                         round
                         icon="edite"
                         @click="editContent(file.content)" />
                </q-item-section>
              </q-item>

            </q-list>
          </template>
        </q-uploader>
        <div v-if="noItem"
             class="no-item">
          <q-icon name="cloud_upload"
                  size="200px"
                  color="primary" />
          <div class="no-item-title">
            فیلم‌‌ها/جزوه‌ها موردنظر را اینجا رها کنید
          </div>
          <div class="no-item-subtitle">
            لورم ایپسوم فیلان فیلان
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>

export default {
  name: 'UploadDialog',
  props: {
    dialog: {
      type: [Boolean, null],
      default: false
    }
  },
  emits: ['editContent'],
  data () {
    return {
      noItem: true
    }
  },
  methods: {
    editContent (contentId) {
      this.$emit('editContent', contentId)
    },
    factoryFn (files) {
      return new Promise((resolve, reject) => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index]
          this.$apiGateway.content.getPresigned({
            data: {
              bucket: 'temp-upload',
              key: file.name
            }
          }).then(res => {
            files[index].content = res.content_id
            resolve({
              url: res.url,
              method: 'PUT'
            })
          }).catch(() => {
            reject()
          })
        }
      })
    },
    onRejected () {
      this.$refs.uploader.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-dialog-wrapper {
  width: 1280px;
  height: 780px;
  max-width: 100%;
  background: #FFF;

  .upload-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    background: rgb(255 255 255 / 40%);
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
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .no-item {
      position: absolute;
      width: 100%;
      height: calc(100% - 80px);
      top: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 0;

      .no-item-title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        margin-bottom: 20px;
      }

      .no-item-subtitle {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        color: #777;
      }
    }
  }
}
</style>
