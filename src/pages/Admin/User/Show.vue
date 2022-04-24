<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات کاربر"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :edit-route-name="editRouteName"
    :index-route-name="indexRouteName"
  />
</template>

<script>
import EntityShow from 'components/Entity/Show/EntityShow'
export default {
  name: 'Show',
  components: { EntityShow },
  data () {
    return {
      expanded: true,
      api: '/alaa/api/v2/admin/user/',
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.User.Edit',
      indexRouteName: 'Admin.User.Index',
      inputs: [
        { type: 'avatar', name: 'photo', responseKey: 'data.photo', value: null, size: '150px', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'first_name', responseKey: 'data.first_name', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', responseKey: 'data.last_name', value: 'null', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'data.national_code', value: 'null', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'email', responseKey: 'data.email', value: 'null', label: 'ایمیل', col: 'col-md-3' },
        { type: 'input', name: 'mobile', responseKey: 'data.mobile', value: 'null', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'address', responseKey: 'data.address', value: 'null', label: 'آدرس', col: 'col-md-3' },
        { type: 'input', name: 'postal_code', responseKey: 'data.postal_code', value: 'null', label: 'کد پستی', col: 'col-md-3' }
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
