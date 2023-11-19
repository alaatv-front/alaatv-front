<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <div v-if="loading"
           class="user-info-wrapper">
        <div class="user-avatar">
          <q-skeleton size="64px"
                      type="circle" />
        </div>
        <div class="user-intro">
          <div class="intro-title">
            <q-skeleton width="100px"
                        height="20px" />
          </div>
          <div class="intro-subtitle q-mt-md">
            <q-skeleton width="150px"
                        height="20px" />
          </div>
        </div>
      </div>
      <div v-else
           class="user-info-wrapper">
        <div class="user-avatar">
          <q-avatar size="64px"
                    font-size="52px"
                    color="grey">
            <q-img :src="user.photo"
                   spinner-color="primary" />
          </q-avatar>
        </div>
        <div class="user-intro">
          <div class="intro-title">
            سلام {{ user.first_name }} عزیز
          </div>
          <div class="intro-subtitle">
            به کاروانسرای راه ابریشم آلاء خوش اومدی!
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div v-if="loading"
           class="countdown-wrapper">
        <div class="calendar">
          <q-skeleton width="110px"
                      height="104px" />
        </div>
        <div class="counter">
          <q-skeleton width="160px"
                      height="100px" />
        </div>
      </div>
      <div v-else
           class="countdown-wrapper">
        <div class="calendar">
          <div class="calendar-title">
            <div class="calendar-line right" />
            <div class="title-text">{{ persianDate.month }}</div>
            <div class="calendar-line left" />
          </div>
          <div class="calendar-date">{{ persianDate.day }}</div>
        </div>
        <div class="counter">
          <div class="counter-title">مانده تا کنکور ۱۴۰۳</div>
          <div class="counter-number">
            <div class="counter-number-day">
              {{ counterData.tillFirstTurn }}
            </div>
            <div class="counter-number-title">
              روز
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DashboardHeader',
  props: {
    studyPlanId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      user: new User(),
      loading: false,
      counterData: {
        now: '',
        tillFirstTurn: 0,
        tillSecondTurn: 0
      },
      persianDate: {
        year: '',
        month: '',
        day: ''
      }
    }
  },
  watch: {
    studyPlanId () {
      this.getCounterData()
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.user = this.$store.getters['Auth/user']
      this.getCounterData()
    },
    getCounterData () {
      this.loading = true
      this.$apiGateway.abrisham.getCounter()
        .then(counterData => {
          this.counterData = counterData
          this.persianDate = this.getPersianDate(counterData.now)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getPersianDate (serverDate) {
      const date = new Date(serverDate)
      const year = {
        year: 'numeric',
        calendar: 'persian'
      }
      const month = {
        month: 'long',
        calendar: 'persian'
      }
      const day = {
        day: 'numeric',
        calendar: 'persian'
      }

      return {
        year: date.toLocaleDateString('fa-IR', year),
        month: date.toLocaleDateString('fa-IR', month),
        day: date.toLocaleDateString('fa-IR', day)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.user-info-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (width <= 600px) {
    justify-content: center;
  }

  .user-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .user-intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;

    .intro-title {
      color: #424242   ;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.4px;
    }

    .intro-subtitle {
      color:#424242;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.28px;
    }
  }
}

.countdown-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media only screen and (width <= 600px) {
    justify-content: center;
    margin-top: 26px;
  }

  .calendar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    border-radius: 12px;
    box-shadow: 2px 2px 3px 0 rgb(16 24 40 / 6%);

    @media only screen and (width <= 600px) {
      margin-right: 20px;
    }

    .calendar-title {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFCA28;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      width: 110px;
      height: 30px;
      position: relative;

      .calendar-line {
        width: 4px;
        height: 12px;
        background: #757575;
        border-radius: 2px;

        &.right {
          position: absolute;
          top: -5px;
          left: 25px;
        }

        &.left {
          position: absolute;
          top: -5px;
          right: 25px;
        }
      }

      .title-text {
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .calendar-date {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFF;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      width: 110px;
      height: 74px;
      color: #333;
      text-align: center;
      font-size: 40px;
      font-style: normal;
      font-weight: 700;
      line-height: 54px;
      letter-spacing: -0.72px;
    }
  }

  .counter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    box-shadow: 2px 2px 3px 0 rgb(16 24 40 / 6%);

    .counter-title {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #26A69A;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      width: 160px;
      height: 30px;
      color: #FFF;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .counter-number {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFF;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      width: 160px;
      height: 74px;

      .counter-number-day {
        color: #333;
        text-align: center;
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: 54px;
        letter-spacing: -0.72px;
      }

      .counter-number-title {
        color: #333;
        text-align: right;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-left: 8px;
      }
    }
  }
}
</style>
