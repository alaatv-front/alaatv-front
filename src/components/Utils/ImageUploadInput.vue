<template>
  <div class="image-input-wrapper">
    <q-input v-model="imageSource"
             autofocus
             :label="label">
      <template v-slot:after>
        <q-btn round
               dense
               flat
               color="primary"
               icon="cloud_upload"
               @click="toggleUploadDialog()" />
      </template>
    </q-input>
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
  name: 'ImageUploadInput',
  components: {
    ImageUploadDialog
  },
  props: {
    value: {
      type: String,
      default: 'Image'
    },
    label: {
      type: String,
      default: 'Image'
    },
    withUrl: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    imageSource: {
      set (newValue) {
        this.$emit('update:value', newValue)
      },
      get () {
        return this.value
      }
    }
  },
  watch: {
    value: {
      handler (newVal) {
        this.$emit('update:value', newVal)
      },
      deep: true
    }
  },
  methods: {
    toggleUploadDialog () {
      this.dialog = !this.dialog
    },
    onUpdateValue (urlList) {
      this.imageSource = this.withUrl ? ("url('" + urlList[0] + "')") : urlList[0]
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
