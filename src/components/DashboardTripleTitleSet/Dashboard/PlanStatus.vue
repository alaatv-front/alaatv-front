<template>
  <div class="status-wrapper">
    <div class="status-title">وضعیت</div>
    <div class="status-message">
      توی روز {{ passedDays || 'چند' }}م برنامه مطالعاتی هستی
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PlanStatus',
  props: {
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

    @media only screen and (max-width: 600px) {
      font-weight: 400;
      font-size: 14px;
      letter-spacing: -0.28px;
    }
  }
}
</style>
