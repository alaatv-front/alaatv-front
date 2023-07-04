<template>
  <div class="row">
    <div class="col-12">
      <div class="daily-plan-wrapper">
        <div class="daily-plan-header">
          <div class="plan-title">
            برنامه امروز
          </div>
          <div class="navigation">
            <q-btn class="navigation-btn"
                   rounded
                   icon="chevron_right"
                   @click="scrollToIndex('perv')" />
            <q-btn class="navigation-btn"
                   rounded
                   icon="chevron_left"
                   @click="scrollToIndex('next')" />
          </div>
        </div>
        <div class="scroll-wrapper">
          <q-virtual-scroll v-slot="{ item, index }"
                            ref="virtualListRef"
                            :items="planList"
                            virtual-scroll-horizontal
                            @virtual-scroll="onVirtualScroll">
            <div :key="index"
                 class="row plan-row items-center">
              <div class="paln-item-box"
                   :style="{borderRight: `8px solid ${item.borderColor}` }">
                <div class="plan-item-header">
                  <div class="plan-time"
                       :class="{'now': isNow(item.start, item.end)}">
                    <div class="from">{{ getTime(item.start) }}</div>
                    <div class="text">تا</div>
                    <div class="till">{{ getTime(item.end) }}</div>
                  </div>
                </div>
                <div class="plan-item-info">
                  <div class="item-title ellipsis">{{ item.title }}</div>
                  <div class="item-plan ellipsis">
                    <q-icon name="import_contacts"
                            size="18px"
                            class="q-mr-sm" />
                    {{ item.plan_name }}
                  </div>
                </div>
                <q-separator inset />
                <div class="plan-item-footer">
                  <div class="footer-text"
                       :class="{'watched-text': item.has_watched}">
                    {{ item.has_watched ? 'مشاهده شده' : 'مشاهده' }}
                  </div>
                  <div class="footer-action">
                    <q-btn v-if="!item.has_watched && isNow(item.start, item.end)"
                           color="primary"
                           rounded
                           unelevated
                           size="16px"
                           icon="play_arrow"
                           @click="onClick" />
                    <q-btn v-else-if="!item.has_watched && !isNow(item.start, item.end)"
                           class="future"
                           rounded
                           unelevated
                           size="16px"
                           icon="chevron_left"
                           @click="onClick" />
                    <q-icon v-else
                            name="check_circle"
                            class="watched"
                            size="42px" />
                  </div>
                </div>
              </div>
            </div>
          </q-virtual-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DailyPlan',
  data() {
    return {
      planList: [],
      virtualListIndex: 3,
      baseIndex: 3,
      lastScroll: 'next'
    }
  },
  mounted() {
    this.setVirtualListIndex()
    this.getPlans()
  },
  methods: {
    setVirtualListIndex() {
      if (this.$q.screen.lt.md) {
        this.virtualListIndex = 1
        this.baseIndex = 1
      } else if (this.$q.screen.lt.sm) {
        this.virtualListIndex = 0
        this.baseIndex = 0
      } else {
        this.virtualListIndex = 3
        this.baseIndex = 3
      }
    },
    getPlans() {
      this.$apiGateway.plan.getPlans()
        .then(planList => {
          this.planList = planList
        })
        .catch(planList => {
        // log(err)
          this.planList = planList.list
        })
    },
    isNow(start, end) {
      const now = new Date()
      const startDate = new Date(start)
      const endDate = new Date(end)
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
    getTime(time) {
      const date = new Date(time)
      let min = date.getMinutes()
      if (min === 0) {
        min = '00'
      }
      return date.getHours() + ':' + min
    },
    onVirtualScroll ({ index }) {
      this.virtualListIndex = index
    },
    scrollToIndex(dir) {
      if (dir === 'next') {
        if (this.lastScroll === 'next') {
          this.virtualListIndex = this.virtualListIndex + 1
          if (this.virtualListIndex > (this.planList.length - 1)) {
            return
          }
          this.$refs.virtualListRef.scrollTo(this.virtualListIndex, 'start-force')
        } else {
          this.virtualListIndex = this.virtualListIndex + this.baseIndex + 1
          if (this.virtualListIndex > (this.planList.length - 1)) {
            return
          }
          this.$refs.virtualListRef.scrollTo(this.virtualListIndex, 'start-force')
        }
      } else {
        if (this.lastScroll === 'perv') {
          this.virtualListIndex = this.virtualListIndex - 1
          if (this.virtualListIndex < 0) {
            return
          }
          this.$refs.virtualListRef.scrollTo(this.virtualListIndex, 'start-force')
        } else {
          this.virtualListIndex = this.virtualListIndex - this.baseIndex - 1
          if (this.virtualListIndex < 0) {
            return
          }
          this.$refs.virtualListRef.scrollTo(this.virtualListIndex, 'start-force')
        }
      }
      this.lastScroll = dir
    }
  }
})
</script>

<style lang="scss" scoped>
.daily-plan-wrapper {
  height: 320px;
  width: 100%;
  margin: 40px 0px;

  .daily-plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .plan-title {
      color: #424242;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.4px;
    }

    .navigation-btn {
      color: #757575;
      background: #FFF;
      margin: 0 6px;
    }
  }

  .scroll-wrapper {
    ::-webkit-scrollbar{
      width: 0 ;
      height: 0;
      border-radius: 0 ;
      background-color: transparent;
    }

    ::-webkit-scrollbar-track{
      border-radius: 0 ;
      background-color: transparent ;
    }

    ::-webkit-scrollbar-thumb{
      border-radius: 0 ;
      background-color: transparent;
    }

    .plan-row {
      .paln-item-box{
        width: 390px;
        height: 210px;
        border-radius: 12px;
        background: #FFF;
        padding: 16px 28px 20px 20px;

        @media only screen and (max-width: 600px) {
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
            padding: 3px 6px 4px 6px;
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

          .item-title {
            max-width: 100%;
            color:#424242;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: -0.32px;
            margin: 15px 0;
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
          margin-top: 10px;

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

      &:not(:last-child) {
        margin-right: 30px;
      }
    }
  }
}
</style>
