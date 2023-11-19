<template>
  <div v-if="loading"
       class="statics-wrapper">
    <q-skeleton type="circle"
                size="200px" />
    <div class="statics-info q-pt-md">
      <div class="sessions-info">
        <div class="session-icon">
          <q-skeleton type="circle"
                      size="15px" />
        </div>
        <div class="session-text">
          <q-skeleton width="150px" />
        </div>
      </div>
      <div class="sessions-info q-py-sm">
        <div class="session-icon">
          <q-skeleton type="circle"
                      size="15px" />
        </div>
        <div class="session-text">
          <q-skeleton width="150px" />
        </div>
      </div>
    </div>
  </div>
  <div v-else
       class="statics-wrapper">
    <q-circular-progress :min="0"
                         :max="100"
                         show-value
                         reverse
                         :value="percent"
                         size="200px"
                         :thickness="0.22"
                         color="warning"
                         track-color="blue-1"
                         class="q-ma-md">
      {{ percent }}%
    </q-circular-progress>
    <div class="statics-info">
      <div class="sessions-info">
        <div class="session-icon">
          <q-icon name="circle"
                  color="warning" />
        </div>
        <div class="session-text">
          {{ watched || 0 }} جلسه دیده شده
        </div>
      </div>
      <div class="sessions-info">
        <div class="session-icon">
          <q-icon name="circle"
                  color="blue-1" />
        </div>
        <div class="session-text">
          {{ remained || 0 }} جلسه باقی مانده
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlanStatics',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    watched: {
      type: Number,
      default: 0
    },
    remained: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed: {
    percent() {
      return Math.floor((this.watched * 100) / (this.watched + this.remained)) || 0
    }
  }
})
</script>

<style lang="scss" scoped>
.statics-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .statics-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 19px;

    .sessions-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .session-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }

      .session-text {
        color:#424242;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.32px;
      }
    }
  }
}
</style>
