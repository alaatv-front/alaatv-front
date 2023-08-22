<template>
  <div class="row justify-center">
    <div class="col-md-9">
      <h2>
        dialog
      </h2>
      <div class="row q-col-gutter-md">
        <q-btn color="primary"
               @click="dialog = true">Open Dialog</q-btn>
        <q-dialog v-model="dialog">
          <q-card>
            <q-card-section class="dialog-header-section">
              <div class="row items-center justify-between">
                <div>
                  <q-icon class="dialog-avatar"
                          color="positive"
                          name="check" />
                  عنوان متن
                </div>
                <q-btn flat
                       icon="close"
                       color="grey-6"
                       @click="dialog = false" />
              </div>
            </q-card-section>
            <q-separator class="grey1" />
            <q-card-section class="dialog-body-section">
              <div class="body2">آیا می‌خواهید لورم ایپسوم شوید؟</div>
            </q-card-section>
            <q-card-section class="dialog-action-section">
              <div class="row items-center justify-between">
                <q-btn class="q-btn-md dialog-action-default-btn"
                       flat>
                  متن دکمه
                </q-btn>
                <div class="dialog-action-btn-box">
                  <q-btn class="q-btn-md q-mr-sm"
                         color="secondary"
                         outline>
                    انصراف
                  </q-btn>
                  <q-btn class="q-btn-md"
                         color="positive">
                    تایید
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleDialog',
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>
