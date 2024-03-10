<template>
  <div class="FullCalendarPlanItem cursor-pointer"
       :style="{ top: calculateTop(plan), height: calculateHeight(plan), background: getBackgroundColor(plan.backgroundColor)}">
    <div class="plan-info"
         @click="openPlan(plan)">
      <q-scroll-area visible
                     class="full-width full-height q-pr-sm">
        <div class="product_lesson_name">
          <template v-if="plan.title">
            {{ plan.title }}
          </template>
          <template v-else>
            {{ plan.product.lesson_name }}
          </template>
        </div>
        <template v-if="plan.contents.list.length > 0">
          <div v-for="content in plan.contents.list"
               :key="content.id"
               class="FullCalendarPlanItem--plan-content-title q-mt-xs">
            {{content.title}}
          </div>
        </template>
        <template v-else-if="plan.description">
          <div class="FullCalendarPlanItem--plan-description"
               v-html="plan.description" />
        </template>
        <div class="plan_start q-mt-xs">{{plan.start.substring(0, 5)}} الی {{plan.end.substring(0, 5)}}</div>
      </q-scroll-area>
    </div>
    <div class="more-btn">
      <q-btn icon="ph:dots-three-outline-vertical"
             square
             class="more size-ms">
        <q-menu anchor="bottom right"
                self="bottom left">
          <q-list>
            <q-item v-ripple
                    clickable
                    dense
                    @click="editPlan(plan)">
              <q-item-section>ویرایش</q-item-section>
              <q-item-section avatar>
                <q-icon name="ph:pencil" />
              </q-item-section>
            </q-item>
            <q-item v-ripple
                    clickable
                    dense
                    @click="copyPlan(plan)">
              <q-item-section>کپی</q-item-section>
              <q-item-section avatar>
                <q-icon name="ph:copy" />
              </q-item-section>
            </q-item>
            <q-item v-ripple
                    clickable
                    dense
                    @click="removePlan(plan)">
              <q-item-section>حذف</q-item-section>
              <q-item-section avatar>
                <q-icon name="ph:trash-simple" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar'
import moment from 'moment-jalaali'
import { defineComponent } from 'vue'
import { Plan } from 'src/models/Plan.js'

moment.loadPersian()

export default defineComponent({
  name: 'FullCalendar',
  props: {
    plan: {
      type: Plan,
      default: new Plan()
    },
    hourStart: {
      type: Number,
      default: 0
    },
    hourEnd: {
      type: Number,
      default: 23
    },
    baseHight: {
      type: Number,
      default: 80
    }
  },
  emits: ['openPlan', 'copyPlan', 'editPlan', 'removePlan'],
  methods: {
    calculateTop (plan) {
      const eventStartArray = plan.start.split(':')
      const hourInt = parseInt(eventStartArray[0])
      const minuteInt = parseInt(eventStartArray[1])
      return this.getTopWithHourAndMinute(hourInt, minuteInt)
    },
    calculateHeight (plan) {
      const heightUnit = 'px'
      const eventEndArray = plan.end.split(':')
      const eventStartArray = plan.start.split(':')
      const endHour = parseInt(eventEndArray[0])
      const endMinute = parseInt(eventEndArray[1])
      const startHour = parseInt(eventStartArray[0])
      const startMinute = parseInt(eventStartArray[1])
      const startInt = (startHour * 60) + startMinute
      const endInt = (endHour * 60) + endMinute
      const finalStart = Math.floor(startInt / 60) >= this.hourStart ? (startInt / 60) : (this.hourStart / 60)
      const finalEnd = Math.floor(endInt / 60) <= this.hourEnd ? (endInt / 60) : ((this.hourEnd + 1) / 60)

      return ((finalEnd - finalStart) * this.baseHight) + heightUnit
    },
    getBackgroundColor (color) {
      return colors.lighten(color, 60)
    },
    getTopWithHourAndMinute (hour, minute) {
      const heightUnit = 'px'
      if (hour < this.hourStart) {
        return '-10' + heightUnit
      }

      const topAfterZero = (hour + (minute / 60)) * this.baseHight
      const topHourStart = topAfterZero - (this.hourStart * this.baseHight)

      return topHourStart + heightUnit
    },
    openPlan (plan) {
      this.$emit('openPlan', plan)
    },
    editPlan (plan) {
      this.$emit('editPlan', plan)
    },
    copyPlan (plan) {
      this.$emit('copyPlan', plan)
    },
    removePlan (plan) {
      this.$emit('removePlan', plan)
    }
  }
})
</script>

<style scoped lang="scss">
.FullCalendarPlanItem {
  position: absolute;
  width: 268px;
  background: $blue-grey-6;
  border-radius: 8px;
  margin-left: 0;
  margin-top: 0;

  .plan-info {
    overflow: auto;
    height: inherit;
    display: flex;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: $space-3;
    .product_lesson_name {
      margin-top: $space-2;
      @include body1;
    }
    .FullCalendarPlanItem--plan-description {
      @include caption2;
    }
    .plan_start {
      @include caption2;
    }
    .FullCalendarPlanItem--plan-content-title {
      @include caption2;
    }
  }

  .more-btn {
    .more {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
