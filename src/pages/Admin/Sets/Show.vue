<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات محصول"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :edit-route-name="editRouteName"
    :index-route-name="indexRouteName"
  />
</template>

<script>
import { EntityShow } from 'quasar-crud'

export default {
  name: 'Show',
  components: { EntityShow },
  data () {
    return {
      expanded: true,
      api: '/alaa/api/v2/admin/set',
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.Product.Edit',
      indexRouteName: 'Admin.Product.Index',
      inputs: [
        { type: 'avatar', name: 'photo', responseKey: 'data.photo', value: null, size: '250px', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه محصول پرنت', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'data.title', value: 'null', label: 'نام کالا', col: 'col-md-3' },
        { type: 'input', name: 'redirect_url', responseKey: 'data.redirect_url', value: 'null', label: 'آدرس ریدایرکت', col: 'col-md-3' },
        { type: 'select', name: 'redirect_code', responseKey: 'data.product_type.display_name', value: null, options: [{ label: '301 (دائمی)', value: 301 }, { label: '302 (موقتی)', value: 302 }], label: 'کد ریدایرکت', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', value: 'null', label: 'ترتیب', col: 'col-md-3' },
        { type: 'input', name: 'intro_video', responseKey: 'data.intro.video', value: 'null', label: 'لینک فیلم معرفی', col: 'col-md-3' },
        { type: 'input', name: 'intro_photo', responseKey: 'data.intro.photo', value: 'null', label: 'تامبنیل کلیپ', col: 'col-md-3' },
        { type: 'input', name: 'base_price', responseKey: 'data.base_price', value: 'null', label: 'قیمت پایه', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'is_free', options: [{ label: 'رایگان باشد', value: 1 }, { label: 'رایگان نباشد', value: 0 }], responseKey: 'data.is_free', value: null, label: '', col: 'col-md-3' },
        { type: 'input', name: 'discount', responseKey: 'data.discount', value: 'null', label: 'تخفیف (%)', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'amountLimit', options: [{ label: 'نامحدود', value: 0 }, { label: 'محدود', value: 1 }], responseKey: '', value: 'null', label: 'محدودیت موجودی', col: 'col-md-3' },
        { type: 'input', name: 'amount', responseKey: 'data.amount', value: 'null', label: 'تعداد موجود', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'enable', options: [{ label: 'غیرفعال', value: 0 }, { label: 'فعال', value: 1 }], responseKey: 'data.enable', value: 'null', label: 'وضعیت', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'discount', options: [{ label: 'عدم نمایش', value: 0 }, { label: 'نمایش', value: 1 }], responseKey: 'data.discount', value: 'null', label: 'نمایش', col: 'col-md-3' },
        { type: 'select', name: 'attribute_set', options: [{ label: 'اردو', value: 1 }, { label: 'همایش', value: 2 }, { label: 'فیلم استودیو', value: 3 }, { label: 'جزوه درس', value: 4 }, { label: 'کتاب', value: 5 }, { label: 'پیش فرض', value: 6 }, { label: 'محصول اشتراک', value: 7 }, { label: 'آزمون', value: 8 }], responseKey: 'data.attribute_set.id', value: 'null', label: 'دسته صفت', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', value: 'null', label: 'اسلوگان', col: 'col-md-3' },
        { type: 'input', name: 'short_description', responseKey: 'data.description.short', value: 'null', label: 'توضیحات مختصر', col: 'col-md-3' },
        { type: 'input', name: 'long_description', responseKey: 'data.description.long', value: 'null', label: 'توضیحات اجمالی', col: 'col-md-3' },
        { type: 'input', name: 'special_description', responseKey: 'data.description.special', value: 'null', label: 'توضیحات خاص', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', value: 'null', label: 'اسلوگان', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', value: 'null', label: 'اسلوگان', col: 'col-md-3' },

        { type: 'input', name: 'redirect_url', responseKey: 'data.redirect_url', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'select', name: 'product_type', responseKey: 'data.product_type.display_name', value: null, options: [{ label: 'ساده', value: 1 }, { label: 'قابل انتخاب', value: 2 }, { label: 'قابل پیکربندی', value: 3 }], label: 'نوع محصول', col: 'col-md-3' },

        { type: 'input', name: 'price', responseKey: 'data.price.base', value: 'null', label: 'قیمت', col: 'col-md-3' }
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
