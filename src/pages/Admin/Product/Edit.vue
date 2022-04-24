<template>
  <entity-edit
    v-model:value="inputs"
    title="ویرایش محصول"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
  />
</template>

<script>
import { EntityEdit } from 'quasar-crud'
export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      expanded: true,
      api: '/alaa/api/v2/admin/product',
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Product.Show',
      inputs: [
        { type: 'file', name: 'photo', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه محصول پرنت', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'نام کالا', col: 'col-md-3' },
        { type: 'input', name: 'redirect_url', responseKey: 'data.redirect_url', label: 'آدرس ریدایرکت', col: 'col-md-3' },
        { type: 'select', name: 'redirect_code', responseKey: 'data.product_type.display_name', options: [{ label: '301 (دائمی)', value: 301 }, { label: '302 (موقتی)', value: 302 }], label: 'کد ریدایرکت', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', label: 'ترتیب', col: 'col-md-3' },
        { type: 'input', name: 'intro_video', responseKey: 'data.intro.video', label: 'لینک فیلم معرفی', col: 'col-md-3' },
        { type: 'input', name: 'intro_photo', responseKey: 'data.intro.photo', label: 'تامبنیل کلیپ', col: 'col-md-3' },
        { type: 'input', name: 'base_price', responseKey: 'data.base_price', label: 'قیمت پایه', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'is_free', options: [{ label: 'رایگان باشد', value: 1 }, { label: 'رایگان نباشد', value: 0 }], responseKey: 'data.is_free', label: '', col: 'col-md-3' },
        { type: 'input', name: 'discount', responseKey: 'data.discount', label: 'تخفیف (%)', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'amountLimit', options: [{ label: 'نامحدود', value: 0 }, { label: 'محدود', value: 1 }], responseKey: '', label: 'محدودیت موجودی', col: 'col-md-3' },
        { type: 'input', name: 'amount', responseKey: 'data.amount', label: 'تعداد موجود', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'enable', options: [{ label: 'غیرفعال', value: 0 }, { label: 'فعال', value: 1 }], responseKey: 'data.enable', label: 'وضعیت', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'discount', options: [{ label: 'عدم نمایش', value: 0 }, { label: 'نمایش', value: 1 }], responseKey: 'data.discount', label: 'نمایش', col: 'col-md-3' },
        { type: 'select', name: 'attribute_set', options: [{ label: 'اردو', value: 1 }, { label: 'همایش', value: 2 }, { label: 'فیلم استودیو', value: 3 }, { label: 'جزوه درس', value: 4 }, { label: 'کتاب', value: 5 }, { label: 'پیش فرض', value: 6 }, { label: 'محصول اشتراک', value: 7 }, { label: 'آزمون', value: 8 }], responseKey: 'data.attribute_set.id', label: 'دسته صفت', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', label: 'اسلوگان', col: 'col-md-3' },
        { type: 'input-editor', name: 'short_description', responseKey: 'data.description.short', label: 'توضیحات مختصر', col: 'col-md-12' },
        { type: 'input-editor', name: 'long_description', responseKey: 'data.description.long', label: 'توضیحات اجمالی', col: 'col-md-12' },
        { type: 'input-editor', name: 'special_description', responseKey: 'data.description.special', label: 'توضیحات خاص', col: 'col-md-12' },
        { type: 'select', name: 'tags', options: [], responseKey: 'data.tags', multiple: true, useChips: true, createNewValue: true, label: 'تگ ها', col: 'col-md-3' },
        { type: 'select', name: 'sample_contents', options: [], responseKey: 'data.sample_contents', multiple: true, useChips: true, createNewValue: true, label: 'کانتنت های معرفی کننده محصول', col: 'col-md-3' },
        { type: 'select', name: 'recommender_contents', options: [], responseKey: 'data.recommender_contents.recommenders.contents', multiple: true, useChips: true, createNewValue: true, label: 'کانتنت های پیشنهاد دهنده محصول', col: 'col-md-3' },
        { type: 'select', name: 'recommender_sets', options: [], responseKey: 'data.recommender_contents.recommenders.sets', multiple: true, useChips: true, createNewValue: true, label: 'ست های دارای کانتنتهای پیشنهاد دهنده محصول', col: 'col-md-3' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  }
}
</script>

<style scoped>

</style>
