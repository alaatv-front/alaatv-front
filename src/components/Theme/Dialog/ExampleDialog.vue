<template>
  <div>
    dialog
    <div v-for="(item, index) in sizes"
         :key="index">
      <q-btn color="primary"
             @click="dialogValue[item.size] = true">Open Dialog {{item.size}}</q-btn>
      <q-dialog v-model="dialogValue[item.size]">
        <q-card :class="item.cardClass">
          <q-card-section class="dialog-header">
            <q-avatar :class="'avatar-'+item.size"
                      class="dialog-avatar"
                      color="positive"
                      text-color="white"
                      icon="check" />
            <h5 class="dialog-header-title">عنوان متن</h5>
            <q-btn class="dialog-close-icon"
                   icon="close"
                   flat
                   unelevated />
          </q-card-section>
          <q-separator class="grey1" />
          <q-card-section class="dialog-body">
            <h5>آیا می‌خواهید لورم ایپسوم شوید؟</h5>
          </q-card-section>
          <q-card-section class="dialog-action">
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
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleDialog',
  data() {
    return {
      dialogValue: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false
      },
      sizes: [
        {
          size: 'xs',
          cardClass: 'dialog-xs'
        },
        {
          size: 'sm',
          cardClass: 'dialog-sm'
        },
        {
          size: 'md',
          cardClass: 'dialog-md'
        },
        {
          size: 'lg',
          cardClass: 'dialog-lg'
        },
        {
          size: 'xl',
          cardClass: 'dialog-xl'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
