<template>
  <entity-create
    v-model:value="inputs"
    title="ثبت محتوا جدید"
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  />
</template>

<script>
import { EntityCreate } from 'quasar-crud'

export default {
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      api: '/reqres/api/c',
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Content.Show',
      indexRouteName: 'Admin.Content.Index',
      inputs: [
        { type: 'file', name: 'photo', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'نام محتوا', col: 'col-md-3' },
        { type: 'input', name: 'redirect_url', responseKey: 'data.redirect_url', label: 'آدرس ریدایرکت', col: 'col-md-3' },
        { type: 'select', name: 'redirect_code', responseKey: 'data.product_type.display_name', options: [{ label: '301 (دائمی)', value: 301 }, { label: '302 (موقتی)', value: 302 }], label: 'کد ریدایرکت', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', label: 'ترتیب', col: 'col-md-3' },
        { type: 'input', name: 'intro_video', responseKey: 'data.intro.video', label: 'لینک فیلم معرفی', col: 'col-md-3' },
        { type: 'input', name: 'intro_photo', responseKey: 'data.intro.photo', label: 'تامبنیل کلیپ', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'is_free', options: [{ label: 'رایگان باشد', value: 1 }, { label: 'رایگان نباشد', value: 0 }], responseKey: 'data.is_free', label: '', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'enable', options: [{ label: 'غیرفعال', value: 0 }, { label: 'فعال', value: 1 }], responseKey: 'data.enable', label: 'وضعیت', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'discount', options: [{ label: 'عدم نمایش', value: 0 }, { label: 'نمایش', value: 1 }], responseKey: 'data.discount', label: 'نمایش', col: 'col-md-3' },
        { type: 'select', name: 'attribute_set', options: [{ label: 'اردو', value: 1 }, { label: 'همایش', value: 2 }, { label: 'فیلم استودیو', value: 3 }, { label: 'جزوه درس', value: 4 }, { label: 'کتاب', value: 5 }, { label: 'پیش فرض', value: 6 }, { label: 'محصول اشتراک', value: 7 }, { label: 'آزمون', value: 8 }], responseKey: 'data.attribute_set.id', label: 'دسته صفت', col: 'col-md-3' },
        { type: 'select', name: 'tags', options: [], responseKey: 'data.tags', multiple: true, useChips: true, createNewValue: true, label: 'تگ ها', col: 'col-md-3' }
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
