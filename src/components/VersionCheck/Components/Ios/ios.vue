<template>
  <q-dialog v-model="visible" />
</template>
<script>
export default {
  name: 'iosVersionCheck',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    checkIosVersion(apiIosVersion) {
      // do logics for checking ios version
    }
  }
}
</script>

<style scoped lang="scss">

</style>
