<template>
  <div class="plan-style"
  >{{ planDate.title }}
  </div>
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
  },
  mounted () {

  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.plan-style {
  border-radius: 50px;
  text-align: center;
  color: white;
  position: absolute;
}
</style>
