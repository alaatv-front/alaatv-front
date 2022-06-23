<template>
  <div class="row no-wrap">
    <div v-for="plan in 24">
      <div :style="{ width:  headerCellWidth + 'px', 'border-left': '1px solid blue'}">
        plan
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Plans',
  props: {
    dayOfPlan: {
      type: Object,
      default: () => {}
    },
    headerCellWidth: {
      default: 200,
      type: Number
    }

  },
  updated () {
    console.log('gfhfh', this.dayOfPlan)
  }
}
</script>

<style scoped>

</style>
