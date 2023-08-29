<template>
  <div class="image-uploader-container">
    <div class="row">
      <div class="col-12">
        <q-input v-model="background"
                 label="Background Image">
          <template v-slot:after>
            <q-btn round
                   dense
                   flat
                   color="primary"
                   icon="cloud_upload"
                   @click="toggleUploadDialog" />
          </template>
        </q-input>
      </div>
    </div>
    <image-upload-dialog :dialog="dialog"
                         :multiple="multiple"
                         @toggle-dialog="toggleUploadDialog"
                         @update-value="onUpdateValue" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ImageUploadDialog from 'src/components/Utils/ImageUploadDialog.vue'
export default defineComponent({
  name: 'PageBuilderImageUploader',
  components: {
    ImageUploadDialog
  },
  props: {
    value: {
      type: String,
      default: null
    },
    file: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      multiple: false,
      background: ''
    }
  },
  watch: {
    value(newValue) {
      this.background = newValue
    },
    file(newFile) {
      this.background = newFile
    },
    background(newBack) {
      if (!newBack) {
        this.$emit('update:file', null)
        this.$emit('update:value', null)
      }
    }
  },
  methods: {
    toggleUploadDialog() {
      this.dialog = !this.dialog
    },
    onUpdateValue (urlList) {
      this.$emit('update:file', urlList[0])
      this.$emit('update:value', "url('" + urlList[0] + "')")
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
