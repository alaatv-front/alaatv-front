<template>
  <q-card class="plan-detail">
    <q-card-section class="header-box">
      <div class="title-box row no-wrap">
        <div class="col-4">
          از ساعت :
          {{plan.start}}
        </div>
        <div class="col-4 text-center">
          {{plan.title}}
        </div>
        <div class="col-4"> تا ساعت :
          {{plan.end}}
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<script>
import { Plan } from 'src/models/Plan.js'
export default {
  name: 'Plan Detail',
  props: {
    plan: {
      type: Plan,
      default: () => new Plan()
    }
  }
}
</script>

<style scoped lang="scss">
.plan-detail{
  width: 100%;

  .header-box{
    .title-box{
      border-radius: 20px;
      background:#eff3ff;
      color: #435883;
      font-size: 20px;
    }

  }
}
</style>
