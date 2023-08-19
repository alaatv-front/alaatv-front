<template>
  <q-dialog v-model="visible" />
</template>
<script>
export default {
  name: 'webVersionCheck',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    checkWebVersion(apiWebVersion) {
      // do logics for checking versions
    }
  }
}
</script>

<style scoped lang="scss">

</style>
