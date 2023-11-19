<template>
  <div class="col-md-4 plan-item-box"
       :style="{borderRight: `8px solid ${plan.borderColor}` }">
    <div class="plan-item-header">
      <div class="plan-time"
           :class="{'now': isNow(plan.date, plan.start, plan.end)}">
        <div class="from">{{ plan.start.substring(0,5) }}</div>
        <div class="text">تا</div>
        <div class="till">{{ plan.end.substring(0,5) }}</div>
      </div>
    </div>
    <div class="plan-item-info">
      <div class="item-title ellipsis">{{ plan.title }}</div>
      <div class="item-plan ellipsis">
        <q-icon name="import_contacts"
                size="18px"
                class="q-mr-sm" />
        {{ video?.title || 'ویدیو ندارد' }}
      </div>
    </div>
    <q-separator />
    <div class="plan-item-footer">
      <div class="footer-text"
           :class="{'watched-text': plan.has_watched}">
        {{ plan.has_watched ? 'دیده شده' : 'مشاهده' }}
      </div>
      <div class="footer-action">
        <q-btn v-if="!plan.has_watched && isNow(plan.date, plan.start, plan.end)"
               color="primary"
               round
               unelevated
               :disable="!video.id"
               size="11px"
               icon="play_arrow"
               :to="{name:'UserPanel.Asset.TripleTitleSet.Content', params:{ productId: plan.product?.id, setId: video.set?.id, contentId: video?.id}}" />
        <q-btn v-else-if="!plan.has_watched && !isNow(plan.date, plan.start, plan.end)"
               class="future"
               round
               unelevated
               :disable="!video.id"
               size="11px"
               icon="chevron_left"
               :to="{name:'UserPanel.Asset.TripleTitleSet.Content', params:{ productId: plan.product?.id, setId: video.set?.id, contentId: video?.id}}" />
        <q-icon v-else
                name="check_circle"
                class="watched"
                size="32px" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Plan } from 'src/models/Plan.js'
import { Content } from 'src/models/Content'
export default defineComponent({
  name: 'PlanItem',
  props: {
    plan: {
      type: Plan
    }
  },
  computed: {
    video () {
      return this.plan.contents?.list?.find(x => x.type.id === 4) || new Content()
    }
  },
  methods: {
    isNow (date, start, end) {
      const now = new Date()
      const startDate = this.toDateWithOutTimeZone(date, start)
      const endDate = this.toDateWithOutTimeZone(date, end)
      const hour = now.getHours()
      const minute = now.getMinutes()
      const startHour = startDate.getHours()
      const startMin = startDate.getMinutes()
      const endHour = endDate.getHours()
      const endMin = endDate.getMinutes()

      if ((startHour <= hour && startMin <= minute) && (hour <= endHour && minute <= endMin)) {
        return true
      } else {
        return false
      }
    },
    getTime (time) {
      const date = new Date(time)
      let min = date.getMinutes()
      if (min === 0) {
        min = '00'
      }
      return date.getHours() + ':' + min
    },
    toDateWithOutTimeZone (date, time) {
      const tempTime = time.split(':')
      const dt = new Date(date)
      dt.setHours(tempTime[0])
      dt.setMinutes(tempTime[1])
      dt.setSeconds(tempTime[2])
      return dt
    }
  }
})
</script>

<style lang="scss" scoped>
.plan-item-box{
  width: 390px;
  height: 210px;
  border-radius: 12px;
  background: #FFF;
  padding: 16px 28px 20px 20px;

  @media only screen and (width <= 600px) {
    width: 230px;
    height: 196px;
  }

  .plan-item-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .plan-time {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 6px 4px;
      border-radius: 8px;
      background: #ECEFF1;

      &.now {
        background: #FFD54F;
      }
    }
  }

  .plan-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 25px;

    @media only screen and (width <= 600px) {
      margin-bottom: 20px;
    }

    .item-title {
      max-width: 100%;
      color:#424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;
      margin: 15px 0;

      @media only screen and (width <= 600px) {
        margin: 16px 0 8px;
      }
    }

    .item-plan {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      max-width: 100%;
      color: #757575;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.24px;
    }
  }

  .plan-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;

    @media only screen and (width <= 600px) {
      margin-top: 16px;
    }

    .footer-text {
      color: #424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;

      &.watched-text {
        color: #26A69A;
      }
    }

    .footer-action {
      &:deep(.q-btn) {
        border-radius: 50%;
      }

      .future{
        color: #616161;
        background: #ECEFF1;
      }

      .watched {
        color: #26A69A;
      }
    }
  }
}
</style>
