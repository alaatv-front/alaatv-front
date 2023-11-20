<template>
  <div class="RegisterKonkurRankFormResult">
    <div class="state-photo">
      <lazy-img src="https://nodes.alaatv.com/upload/CheckCircle.png" />
    </div>
    <div class="title-text text-center q-mb-md">
      کارنامه شما با موفقیت ثبت شد.
    </div>
    <div class="content-text text-center q-mb-xl">
      حالا میتونی انتخاب رشته خودتو به آلاء بسپری و خیالت از اون بابت راحت باشه. برای اطلاعات بیشتر و ثبت نام روی دکمه انتخاب رشته کلیک کن.
    </div>
    <q-banner class="bg-success">
      <template v-slot:avatar>
        <q-icon name="info_outline" />
      </template>
      فیلم های مشاوره انتخاب رشته در پروفایل شما قرار داده شد.
    </q-banner>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-6">
        <q-btn color="white"
               class="full-width"
               @click="onGoEditKarname">
          ویرایش کارنامه
        </q-btn>
      </div>
      <div class="col-6">
        <q-btn color="primary"
               class="full-width"
               @click="onGoSelectionField">
          انتخاب رشته
        </q-btn>
      </div>
    </div>
    <div class="flex justify-end q-mt-sm">
      <q-btn flat
             :to="{name: 'Public.Home'}">
        رفتن به صفحه اصلی
        <q-icon name="arrow_back" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'RegisterKonkurRankFormResult',
  components: { LazyImg },
  props: {
    konkurRankFormData: {
      type: Object,
      default: null
    }
  },
  emits: ['onGoEditKarname', 'onGoSelectionField'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onGoEditKarname () {
      this.$emit('onGoEditKarname')
    },
    onGoSelectionField () {
      this.$emit('onGoSelectionField')
    }
  }
}
</script>

<style lang="scss" scoped>
.RegisterKonkurRankFormResult {
  .state-photo {
    margin-top: 76px;
  }

  .q-banner {
    margin-bottom: 64px;
  }
}
</style>
