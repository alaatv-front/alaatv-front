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
                    :headers="[{name: 'Content-Type', value: 'image/png'}]"
                    style="width: 100%;max-height: 100%;height: 100%;background: transparent;z-index: 1;"
                    @added="noItem = false"
                    @uploaded="onUploaded"
                    @factory-failed="onRejected($event)">
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
                         @click="editFile(file)" />
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
            عکس موردنظر را اینجا رها کنید
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

import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ImageUploadDialog',
  props: {
    dialog: {
      type: [Boolean, null],
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  emits: ['editFile', 'toggleDialog', 'updateValue'],
  data() {
    return {
      noItem: true,
      urlList: []
    }
  },
  methods: {
    editFile(file) {
      this.$emit('editFile', file)
    },
    factoryFn (files) {
      return new Promise((resolve, reject) => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index]
          APIGateway.fileUpload.upload({
            key: file.name
          })
            .then(url => {
              const baseUrl = url.split('?')[0]
              this.urlList.push(baseUrl)
              this.$axios({
                method: 'put',
                headers: {
                  'Content-Type': 'image/png'
                },
                url,
                body: file,
                data: file,
                transformRequest: (data, headers) => {
                  if (headers.common && headers.common.Authorization) {
                    delete headers.common.Authorization
                  }
                  if (headers.Authorization) {
                    delete headers.Authorization
                  }

                  return data
                }
              })
                .then(() => {
                  this.onUploaded()
                  resolve({
                    file
                  })
                })
                .catch(() => {
                  this.onRejected()
                })
            }).catch((err) => {
              this.onRejected()
              reject(err)
            })
        }
      })
    },
    onRejected() {
      this.$refs.uploader.reset()
    },
    onUploaded() {
      this.$emit('updateValue', this.urlList)
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
