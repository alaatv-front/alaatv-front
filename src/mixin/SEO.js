import { createMetaMixin } from 'quasar'
import SeoMeta from 'src/assets/js/SeoMeta.js'

const mixinSEO = {
  data() {
    return {
      pageSeoTitleSection1: 'آموزش مجازی آلاء',
      pageSeoTitleSection2: 'با هدف توسعه عدالت آموزشی در حوزه کنکور',
      pageSeoDescription: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.'
    }
  },
  mixins: [
    createMetaMixin(function () {
      return SeoMeta.getMixin(this.pageSeoTitleSection1, this.pageSeoTitleSection2, this.pageSeoDescription)
    })
  ]
}

export default mixinSEO
