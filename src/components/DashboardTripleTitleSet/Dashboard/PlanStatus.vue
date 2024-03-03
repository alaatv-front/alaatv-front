<template>
  <div v-if="!loading"
       class="status-wrapper">
    <div class="status-title">وضعیت</div>
    <div class="status-message">
      {{ passedDays > 0 ? `توی روز ${passedDays} م برنامه مطالعاتی هستی` : 'برنامه مطالعاتی نداری' }}
    </div>
  </div>
  <div v-else
       class="status-wrapper">
    <div class="status-title">
      <q-skeleton width="100px" />
    </div>
    <div class="status-message skeleton">
      <q-skeleton width="100%"
                  height="80px" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PlanStatus',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    passedDays: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" scoped>
.status-wrapper {
  .status-title {
    color: #424242;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }

  .status-message {
    width: 100%;
    height: 80px;
    border-radius: 12px;
    background:#F5F7FA;
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 25px 30px;
    color:#424242;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.36px;

    &.skeleton {
      background: transparent;
    }

    @media only screen and (width <= 600px) {
      font-weight: 400;
      font-size: 14px;
      letter-spacing: -0.28px;
    }
  }
}
</style>
