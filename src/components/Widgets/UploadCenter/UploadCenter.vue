<template>
  <div>
    <q-btn color="primary"
           label="آپلود"
           @click="toggleUploadProgressDialog" />
    <upload-progress-dialog v-model:dialog="progressDialog" />
  </div>
</template>

<script>
import UploadProgressDialog from './components/UploadProgressDialog/UploadProgressDialog.vue'

export default {
  name: 'UploadCenterComponent',
  components: {
    UploadProgressDialog
  },
  data() {
    return {
      progressDialog: false
    }
  },
  methods: {
    toggleUploadProgressDialog() {
      this.progressDialog = !this.progressDialog
    }
  }
}
</script>
