<template>
  <entity-create
    v-model:value="inputs"
    title="ثبت کاربر جدید"
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  />
</template>

<script>
import EntityCreate from 'components/Entity/Create/EntityCreate'
export default {
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      api: '/alaa/api/v2/admin/user',
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      indexRouteName: 'Admin.User.Index',
      inputs: [
        { type: 'file', name: 'photo', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3', disable: true },
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
