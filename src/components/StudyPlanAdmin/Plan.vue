<template>
  <div>{{planDate.title}}</div>
</template>

<script>
import { Plan } from 'src/models/Plan'

export default {
  name: 'plan',
  props: {
    planDate: {
      type: Plan,
      default: () => new Plan()
    }
  }
}
</script>

<style scoped>

</style>
