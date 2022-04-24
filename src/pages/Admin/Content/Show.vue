<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات محتوا"
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
      api: '/alaa/api/v2/c',
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.Content.Edit',
      indexRouteName: 'Admin.Content.Index',
      inputs: [
        { type: 'avatar', name: 'photo', responseKey: 'data.photo', value: null, size: '250px', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'data.title', value: 'null', label: 'نام محتوا', col: 'col-md-3' },
        { type: 'input', name: 'redirect_url', responseKey: 'data.set.redirect_url', value: 'null', label: 'آدرس ریدایرکت', col: 'col-md-3' },
        { type: 'select', name: 'redirect_code', responseKey: 'data.set.redirect_code', value: null, options: [{ label: '301 (دائمی)', value: 301 }, { label: '302 (موقتی)', value: 302 }], label: 'کد ریدایرکت', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'data.order', value: 'null', label: 'ترتیب', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'is_free', options: [{ label: 'رایگان باشد', value: 1 }, { label: 'رایگان نباشد', value: 0 }], responseKey: 'data.is_free', value: null, label: '', col: 'col-md-3' },
        { type: 'optionGroupRadio', name: 'enable', options: [{ label: 'غیرفعال', value: 0 }, { label: 'فعال', value: 1 }], responseKey: 'data.enable', value: 'null', label: 'وضعیت', col: 'col-md-3' },
        { type: 'select', name: 'product_type', responseKey: 'data.type', value: null, options: [{ label: 'جزوه', value: 1 }, { label: 'ویدئو', value: 8 }] }
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
