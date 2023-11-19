<template>
  <div class="row justify-center q-my-md">
    <div class="col-md-9">
      <h2>
        dialog
      </h2>
      <div class="row justify-around">
        <q-btn color="primary"
               @click="dialog = true">Open Dialog</q-btn>
        <q-btn color="primary"
               @click="bottomSheet = true">Open Bottom Sheet</q-btn>
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
                <q-btn class="q-btn-md keep-min-width dialog-action-default-btn"
                       flat>
                  متن دکمه
                </q-btn>
                <div class="dialog-action-btn-box">
                  <q-btn class="q-btn-md keep-min-width q-mr-sm"
                         color="secondary"
                         size="md"
                         outline>
                    انصراف
                  </q-btn>
                  <q-btn class="q-btn-md keep-min-width"
                         color="positive">
                    تایید
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="bottomSheet"
                  position="bottom">
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
            <q-separator class="grey3" />
            <q-card-section class="dialog-body-section">
              <div class="body2">آیا می‌خواهید لورم ایپسوم شوید؟
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، </div>
            </q-card-section>
            <q-separator class="grey1" />
            <q-card-section class="bottom-sheet-action-section">
              <div class="row items-center">
                <q-btn class="q-btn-md q-mr-sm full-width"
                       color="secondary"
                       size="md"
                       outline>
                  انصراف
                </q-btn>
                <q-btn class="q-btn-md full-width"
                       color="positive">
                  تایید
                </q-btn>
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
  data () {
    return {
      dialog: false,
      bottomSheet: false
    }
  }
}
</script>
