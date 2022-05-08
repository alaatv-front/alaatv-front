<template>
<p>gdg</p>
</template>

<script>
export default {
  name: 'Block',
  props: {
    blockData: {
      type: Array,
      default: []
    }
  },
  created () {
    console.log(this.blockData)
  }
}
</script>

<style scoped>

</style>
