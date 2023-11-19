<template>
  <div>
    bottomSheet
    <div v-for="(item, index) in sizes"
         :key="index">
      <q-btn color="primary"
             @click="bottomSheetValue[item.size] = true">Open bottomSheet {{item.size}}</q-btn>
      <q-dialog v-model="bottomSheetValue[item.size]"
                position="bottom">
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
            <h5>آیا می‌خواهید لورم ایپسوم شوید؟
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، </h5>
          </q-card-section>
          <q-separator class="grey1" />
          <q-card-section class="dialog-action">
            <div class="dialog-action-btn-box">
              <q-btn class="q-btn-md q-mr-sm q-mb-sm"
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
  name: 'ExampleBottomSheet',
  data () {
    return {
      bottomSheetValue: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false
      },
      sizes: [
        {
          size: 'xs',
          cardClass: 'bottomSheet-xs'
        },
        {
          size: 'sm',
          cardClass: 'bottomSheet-sm'
        },
        {
          size: 'md',
          cardClass: 'bottomSheet-md'
        },
        {
          size: 'lg',
          cardClass: 'bottomSheet-lg'
        },
        {
          size: 'xl',
          cardClass: 'bottomSheet-xl'
        }
      ]
    }
  }
}
</script>
