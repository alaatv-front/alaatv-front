<template>
  <q-dialog v-model="visible" />
</template>
<script>
export default {
  name: 'webVersionCheck',
  props: {
    latestVersion: {
      type: Object,
      default() {
        return {}
      }
    }
  },
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
