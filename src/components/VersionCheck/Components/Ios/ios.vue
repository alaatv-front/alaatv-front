<template>
  <q-dialog v-model="visible" />
</template>
<script>
export default {
  name: 'iosVersionCheck',
  props: {
    latestVersion: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    checkIosVersion (apiIosVersion) {
      // do logics for checking ios version
    }
  }
}
</script>
