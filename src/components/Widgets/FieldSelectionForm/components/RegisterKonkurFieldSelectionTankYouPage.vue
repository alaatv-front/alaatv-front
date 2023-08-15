<template>
  <div class="RegisterKonkurFieldSelectionTankYouPage">
    <div class="state-photo">
      <lazy-img src="https://nodes.alaatv.com/upload/CheckCircle.png" />
    </div>
    <div class="title-text text-center q-mb-md">
      ثبت نام شما با موفقیت انجام شد
    </div>
    <div class="content-text text-center q-mb-xl">
      مشاوران آلاء از طریق تیکت با شما تماس خواهند گرفت
    </div>
    <div class="row q-col-gutter-md action-row">
      <div class="col-12">
        <q-btn color="primary"
               class="full-width"
               @click="register">
          مشاهده تیکت
        </q-btn>
      </div>
      <div class="col-12">
        <q-btn color="white"
               class="full-width"
               :to="{name: 'Public.Set.Show', params: {id: setId}}">
          مشاهده فیلم های مشاوره آلاء
        </q-btn>
      </div>
    </div>
    <div class="flex justify-end q-mt-sm">
      <q-btn flat
             :to="{name: 'Public.Home'}">
        رفتن به صفحه اصلی آلاء
        <q-icon name="arrow_back" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'RegisterKonkurFieldSelectionTankYouPage',
  components: { LazyImg },
  props: {
    orderId: {
      type: Number,
      default: null
    },
    setId: {
      type: Number,
      default: 1
    }
  },
  emits: ['end'],
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.RegisterKonkurFieldSelectionTankYouPage {
  .state-photo {
    margin-top: 88px;
  }
  .action-row {
    margin-top: 105px;
  }
}
</style>
