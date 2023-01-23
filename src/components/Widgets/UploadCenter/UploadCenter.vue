<template>
  <div class="upload-center">
    <div class="header">
      <div class="title">مرکز بارگذاری </div>
      <q-btn color="primary"
             label="بارگذاری"
             icon-right="isax:add"
             @click="toggleUploadProgressDialog" />
    </div>
    <div class="body">
      <q-tabs v-model="tab"
              inline-label
              :breakpoint="0"
              align="left">
        <q-tab name="mails"
               label="Mails" />
        <q-tab name="alarms"
               label="Alarms" />
        <q-tab v-if="$q.screen.gt.sm"
               name="movies"
               label="Movies" />
        <q-tab v-if="$q.screen.gt.sm"
               name="photos"
               label="Photos" />
        <q-btn-dropdown v-if="$q.screen.lt.md"
                        auto-close
                        stretch
                        flat
                        label="More...">
          <q-list>
            <q-item clickable
                    @click="tab = 'movies'">
              <q-item-section>Movies</q-item-section>
            </q-item>

            <q-item clickable
                    @click="tab = 'photos'">
              <q-item-section>Photos</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
    </div>
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
      progressDialog: false,
      tab: ''
    }
  },
  methods: {
    toggleUploadProgressDialog() {
      this.progressDialog = !this.progressDialog
    }
  }
}
</script>

<style scoped lang="scss">
.upload-center {
  .header{
    display: flex;
    justify-content: space-between;
  }
}
</style>
