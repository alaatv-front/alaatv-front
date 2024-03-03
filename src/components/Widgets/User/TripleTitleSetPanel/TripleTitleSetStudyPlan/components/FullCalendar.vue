<template>
  <div class="calender">
    <q-inner-loading v-if="loading"
                     :showing="loading" />
    <div v-else>
      <div class="calendar-header">
        <div class="calendar-title" />
        <div class="calendar-header--btn-next-prev">
          <q-btn label="هفته قبل"
                 class="q-mx-sm q-btn-sm keep-min-width"
                 color="primary"
                 text-color="grey-9"
                 @click="goToPrevWeek" />
          <q-btn label="هفته بعد"
                 class="q-mx-sm q-btn-sm keep-min-width"
                 color="primary"
                 text-color="grey-9"
                 @click="goToNextWeek" />
        </div>
        <div class="calendar-panel">
          <div class="calendar-date">
            <q-icon :name="calendarIcon"
                    size="18px" />
            <div class="calendar-date-label"
                 @click="openCalendarDialog">
              {{ calendarMonth }} ماه {{ calendarYear }}
            </div>
          </div>
          <!--            <div class="calendar-view-type">-->
          <!--              <q-tabs v-model="tab"-->
          <!--                      active-color="white"-->
          <!--                      class="text-accent">-->
          <!--                <q-tab name="week"-->
          <!--                       label="هفته" />-->
          <!--                <q-tab name="month"-->
          <!--                       label="ماه" />-->
          <!--              </q-tabs>-->
          <!--            </div>-->
        </div>
      </div>
      <div class="box">
        <q-scroll-area ref="firstRef"
                       class="first-scroll"
                       style="height: 60px"
                       :visible="false"
                       :delay="0"
                       @scroll="onScrollFirst">
          <div class="calendar-first-row"
               :class="{'weekly': tab === 'week'}">
            <div class="calendar-col calendar-col--hour">
              ساعت
            </div>
            <div v-for="dayOfWeekIndex in [0, 1, 2, 3, 4, 5, 6]"
                 :key="dayOfWeekIndex"
                 class="calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name body1">
                {{ getDayOfWeekTitle(dayOfWeekIndex) }}
              </span>
              <span v-if="tab === 'week' && chartWeek[dayOfWeekIndex] && chartWeek[dayOfWeekIndex].persianDate !== undefined"
                    class="day-date body2">
                {{ getDateForHeader(dayOfWeekIndex) }}
              </span>
            </div>
          </div>
        </q-scroll-area>
        <q-scroll-area ref="secondRef"
                       visible
                       class="second-scroll"
                       @scroll="onScrollSecond">
          <div class="calendar-wrapper">
            <div class="calendar-body">
              <div class="calendar-weekly-view">
                <q-separator class="time-line"
                             :style="{top: calculateTimeHeight()}" />
                <div class="calendar-weekly-background">
                  <div v-for="day in 7"
                       :key="day"
                       class="day-col">
                    <div v-for="(hour, hourIndex) in hourList"
                         :key="hour"
                         class="hour-line">
                      <div v-if="day === 1"
                           class="hour">
                        <span v-if="hourIndex === 0">
                          ساعت
                        </span>
                        <span>
                          {{ hour }}
                        </span>
                      </div>
                      <q-separator class="separator"
                                   vertical />
                    </div>
                    <div v-if="chartWeek[day - 1]">
                      <div v-for="event in chartWeek[day - 1].events"
                           :key="event.id"
                           class="weekly-event cursor-pointer"
                           :style="{ top: calculateTop(event), height: calculateHeight(event), background: getBackgroundColor(event.backgroundColor)}">
                        <div class="row q-px-md event-info"
                             @click="openEvent(event)">
                          <div class="product_lesson_name col-12 q-mt-sm">{{ event.product.lesson_name }}</div>
                          <div v-for="event in event.contents.list"
                               :key="event.id"
                               class="event_title col-12 q-mt-xs">
                            {{event.title}}
                          </div>
                          <div class="event_start col-12 q-mt-xs">{{event.start.substring(0, 5)}} الی {{event.end.substring(0, 5)}}</div>
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
                                        @click="editPlan(event)">
                                  <q-item-section>ویرایش</q-item-section>
                                  <q-item-section avatar>
                                    <q-icon name="ph:pencil" />
                                  </q-item-section>
                                </q-item>
                                <q-item v-ripple
                                        clickable
                                        dense
                                        @click="copyPlan(event)">
                                  <q-item-section>کپی</q-item-section>
                                  <q-item-section avatar>
                                    <q-icon name="ph:copy" />
                                  </q-item-section>
                                </q-item>
                                <q-item v-ripple
                                        clickable
                                        dense
                                        @click="removePlan(event)">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <q-dialog v-model="eventDialog">
      <q-card class="new-theme event-dialog">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-Clock.png"
                     width="24px" />
              {{calculateEventDate()}} - {{selectedEvent.start.substring(0, 5)}} الی {{selectedEvent.end.substring(0, 5)}}
            </div>
            <q-btn flat
                   square
                   icon="close"
                   @click="eventDialog = false" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="q-pt-md">
            <plan-contents :plan="selectedEvent" />
          </div>
          <div class="event-description q-mt-md">
            {{selectedEvent.description}}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-right">
            <q-btn class="btn q-mx-sm"
                   label="بازگشت"
                   size="md"
                   color="positive"
                   @click="eventDialog = false" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="calendarDialog"
              persistent>
      <q-card class="calendar-dialog">
        <q-card-section class="row items-center content-section">
          <div class="calendar-dialog-header">
            {{ calendarMonth }}
            <q-select v-model="calendarYear"
                      class="no-title q-ml-md"
                      :options="[1402, 1403, 1404]" />
          </div>
          <div class="row month-row">
            <div v-for="item in monthList"
                 :key="item"
                 class="col-4">
              <div class="month-item"
                   :class="item === selectedMonth ? 'selected' : ''"
                   @click="setSelectedMonth(item)">
                {{ item }}
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="action-section">
          <q-btn v-close-popup
                 label="انصراف"
                 class="cancel-btn" />
          <q-btn v-close-popup
                 label="تایید"
                 class="submit-btn"
                 @click="setCalendarMonth(selectedMonth)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { colors } from 'quasar'
import moment from 'moment-jalaali'
import Time from 'src/plugins/time.js'
import { defineComponent, ref } from 'vue'
import { StudyPlanList } from 'src/models/StudyPlan.js'
// import PlanItem from 'components/DashboardTripleTitleSet/Dashboard/PlanItem.vue'
import planContents
  from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetStudyPlan/components/PlanContents.vue'

moment.loadPersian()

export default defineComponent({
  name: 'FullCalendar',
  components: { planContents },
  props: {
    hourStart: {
      type: Number,
      default: 0
    },
    hourEnd: {
      type: Number,
      default: 23
    },
    studyEvent: {
      type: Number,
      default: null
    },
    filteredLesson: {
      type: Number,
      default: null
    },
    events: {
      type: StudyPlanList,
      default: new StudyPlanList()
    },
    calendarTitle: {
      type: String,
      default: 'تقویم پارسی'
    },
    calendarIcon: {
      type: String,
      default: 'calendar_month'
    },
    currentDay: {
      type: String,
      default: null
    }
  },
  emits: ['changeDate', 'copyPlan', 'editPlan', 'removePlan'],
  setup (props, { emit }) {
    // const emit = defineEmits(['editPlan', 'removePlan'])
    const month = ref([
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ]
    ])
    const calendarHeight = ref(0)
    const baseHight = ref(80) // must be 40
    const chartWeek = ref([])
    const dayList = ref(['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'])
    const tab = ref('week')
    const calendarYear = ref(null)
    const calendarDate = ref(null)
    const persianDate = ref(null)
    const startOfMonth = ref(null)
    const startIndex = ref(null)
    const calendarMonth = ref(null)
    const dayNum = ref(null)
    const isLeapYear = ref(false)
    const dayOfWeek = ref(null)
    const startFrom = ref(null)
    const startTill = ref(null)
    const calendarDialog = ref(false)
    const thisMonth = ref(null)
    const selectedMonth = ref(null)
    const eventDialog = ref(false)
    const selectedEvent = ref(null)
    const loading = ref(false)
    const firstRef = ref(null)
    const secondRef = ref(null)

    const openCalendarDialog = () => {
      calendarDialog.value = true
    }

    const setSelectedMonth = (month) => {
      selectedMonth.value = month
    }

    const loadCalendar = (date, first) => {
      // assign variables data
      let dayCounter = 1
      calendarDate.value = moment(date)
      persianDate.value = new Intl.DateTimeFormat('fa-IR').format(calendarDate.value)
      startOfMonth.value = calendarDate.value.startOf('jMonth').format('dddd')
      startIndex.value = dayList.value.indexOf(startOfMonth.value)
      calendarMonth.value = moment(date).format('jMMMM')
      calendarYear.value = calendarDate.value.jWeekYear()
      dayNum.value = moment.jDaysInMonth(calendarYear.value, calendarDate.value.jMonth())
      isLeapYear.value = moment.jIsLeapYear(calendarDate.value.jWeekYear())
      dayOfWeek.value = calendarDate.value.startOf('jMonth')
      startFrom.value = moment(`${calendarYear.value}/${calendarDate.value.jMonth() + 1}/${moment().startOf('jMonth').jDate()}`, 'jYYYY/jM/jD').format('YYYY-M-D')
      startTill.value = moment(`${calendarYear.value}/${calendarDate.value.jMonth() + 1}/${dayNum.value}`, 'jYYYY/jM/jD').format('YYYY-M-D')
      if (first) {
        thisMonth.value = calendarMonth.value
      }
      selectedMonth.value = calendarMonth.value

      for (let w = 0; w < 6; w++) {
        for (let col = 0; col < 7; col++) {
          month.value[w][col] = {
            date: 0,
            is_holiday: false,
            num: 0,
            events: []
          }
        }
      }

      // import data to month view object
      for (let w = 0; w < 6; w++) {
        for (let col = 0; col < 7; col++) {
          if (col < startIndex.value && w === 0) {
            const dateOfDay = moment(new Date(date).getTime() - ((startIndex.value - col) * 24 * 60 * 60 * 1000))
            month.value[w][col].date = dateOfDay.format('YYYY/MM/DD')
            month.value[w][col].persianDate = new Date(dateOfDay).toLocaleDateString('fa-IR')
            month.value[w][col].monthName = moment(dateOfDay).locale('fa').format('jMMMM')
          } else if (dayCounter > dayNum.value) {
            const lastDay = col > 0 ? new Date(month.value[w][col - 1].date) : new Date(month.value[w - 1][6].date)
            const today = moment(lastDay.getTime() + 24 * 60 * 60 * 1000)
            month.value[w][col].date = today.format('YYYY/MM/DD')
            month.value[w][col].num = dayCounter - dayNum.value
            month.value[w][col].monthName = moment(today).locale('fa').format('jMMMM')
            const persianDate = new Date(today).toLocaleDateString('fa-IR')
            month.value[w][col].persianDate = persianDate
            dayCounter++
          } else {
            month.value[w][col].num = dayCounter
            month.value[w][col].date = calendarDate.value.startOf('jMonth').add(dayCounter - 1, 'd').format('YYYY/MM/DD')
            const persianDate = new Intl.DateTimeFormat('fa-IR').format(calendarDate.value.startOf('jMonth').add(dayCounter - 1, 'd'))
            month.value[w][col].persianDate = persianDate
            dayCounter++
          }
        }
      }

      // import data to weekly view object
      for (let w = 0; w < 6; w++) {
        for (let col = 0; col < 7; col++) {
          if (month.value[w][col].date === moment(date).format('YYYY/MM/DD')) {
            chartWeek.value = month.value[w]
          }
        }
      }
    }

    const setAttr = (event) => {
      // console.log(document.getSelection(), event)
    }

    const editPlan = (event) => {
      emit('editPlan', event)
    }

    const copyPlan = (event) => {
      emit('copyPlan', event)
    }
    const removePlan = (event) => {
      emit('removePlan', event)
    }
    let ignoreSource

    function scroll (source, position) {
      if (ignoreSource === source) {
        ignoreSource = null
        return
      }
      ignoreSource = source === 'first'
        ? 'second'
        : 'first'

      const areaRef = source === 'first'
        ? secondRef
        : firstRef

      areaRef.value.setScrollPosition('horizontal', position)
    }

    return {
      firstRef,
      secondRef,
      loading,
      editPlan,
      copyPlan,
      removePlan,
      calendarMonth,
      calendarHeight,
      startOfMonth,
      baseHight,
      startTill,
      chartWeek,
      month,
      tab,
      dayNum,
      startFrom,
      eventDialog,
      calendarYear,
      calendarDate,
      selectedMonth,
      selectedEvent,
      calendarDialog,
      openCalendarDialog,
      setSelectedMonth,
      loadCalendar,
      setAttr,
      thumbStyle: {
        right: '4px',
        borderRadius: '7px',
        backgroundColor: '#027be3',
        width: '4px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '8px',
        opacity: 0.2
      },
      onScrollFirst ({ horizontalPosition }) {
        scroll('first', horizontalPosition)
      },

      onScrollSecond ({ horizontalPosition }) {
        scroll('second', horizontalPosition)
      }
    }
  },
  data () {
    return {
      // hourStart: 2,
      // hourEnd: 20
      monthList: moment()._locale._jMonths
    }
  },
  computed: {
    filteredLessonId () {
      return this.filteredLesson
    },
    hourList () {
      const result = []
      for (let i = this.hourStart; i <= this.hourEnd; i++) {
        result.push(i.toString().padStart(2, '0') + ':00')
      }
      return result
    },
    localCurrentDay () {
      if (!this.currentDay && typeof window !== 'undefined') {
        return Time.now()
      }

      return this.currentDay
    }
  },
  mounted () {
    this.calcCalendarHeight()
    this.loadCalendar(this.localCurrentDay, true)
    this.loadStudyPlanData()
  },
  methods: {
    calcCalendarHeight () {
      const heightUnit = 'px'
      this.calendarHeight = ((this.hourEnd - this.hourStart + 1) * this.baseHight) + 20 + heightUnit
    },
    getDayOfWeekTitle (dayOfWeekIndex) {
      switch (dayOfWeekIndex) {
        case 0:
          return 'شنبه'
        case 1:
          return 'یکشنبه'
        case 2:
          return 'دوشنبه'
        case 3:
          return 'سه‌شنبه'
        case 4:
          return 'چهارشنبه'
        case 5:
          return 'پنجشنبه'
        case 6:
          return 'جمعه'
        default:
          return '-'
      }
    },
    getDateForHeader (dayOfWeekIndex) {
      return this.chartWeek[dayOfWeekIndex].persianDate.toString().split('/')[2] +
        ' ' +
        (this.chartWeek[dayOfWeekIndex].monthName || this.calendarMonth)
    },
    getBackgroundColor (color) {
      return colors.lighten(color, 60)
    },
    calculateTop (event) {
      const eventStartArray = event.start.split(':')
      const hourInt = parseInt(eventStartArray[0])
      const minuteInt = parseInt(eventStartArray[1])
      return this.getTopWithHourAndMinute(hourInt, minuteInt)
    },
    calculateHeight (event) {
      const heightUnit = 'px'
      const eventEndArray = event.end.split(':')
      const eventStartArray = event.start.split(':')
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
    calculateTimeHeight () {
      const hour = new Date().getHours()
      const minute = new Date().getMinutes()
      if (this.hourStart <= hour && hour <= this.hourEnd) {
        return this.getTopWithHourAndMinute(hour, minute)
      } else {
        return '-10px'
      }
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
    calculateEventDate () {
      return moment(this.selectedEvent.date).format('jYYYY/jM/jD')
    },
    openEvent (event) {
      this.eventDialog = true
      this.selectedEvent = event
    },
    loadStudyPlanData () {
      for (let w = 0; w < 6; w++) {
        for (let col = 0; col < 7; col++) {
          this.month[w][col].events = []
          for (let e = 0; e < this.events.list.length; e++) {
            if (this.events.list[e].plan_date === this.month[w][col].date.toString().split('/').join('-')) {
              this.events.list[e].plans.list.forEach(plan => {
                this.month[w][col].events.push(plan)
              })
            }
          }
        }
      }
    },
    goToSelectedDate (date) {
      this.loadCalendar(moment(date).format('YYYY-MM-DD HH:mm:ss.SSS'), false)
      this.$emit('changeDate', moment(date).format('YYYY-MM-DD HH:mm:ss'))
    },
    goToNextWeek () {
      const today = moment(this.localCurrentDay).add(1, 'weeks')
      const day0 = today.clone().weekday(0).format('YYYY-MM-DD HH:mm:ss')
      this.loadCalendar(day0, true)
      this.$emit('changeDate', day0)
    },
    goToPrevWeek () {
      // const today = new Date(this.calendarDate._i)
      const prevWeek = new Date(new Date(this.chartWeek[0].date).getTime() - 7 * 24 * 60 * 60 * 1000)
      this.loadCalendar(moment(prevWeek).format('YYYY-MM-DD HH:mm:ss.SSS'), false)
      this.$emit('changeDate', moment(prevWeek).format('YYYY-MM-DD HH:mm:ss'))
    },
    setCalendarMonth (selectedMonth) {
      const month = this.monthList.indexOf(selectedMonth)
      const shamsi = `${this.calendarYear}-${month + 1}-01`
      if (selectedMonth === this.thisMonth) {
        this.loadCalendar(Time.now(), false)
        this.$emit('changeDate', moment(Time.now()).format('YYYY-MM-DD HH:mm:ss'))
      } else {
        const newDate = moment(shamsi, 'jYYYY/jM/jD').format('YYYY-M-D HH:MM:SS')
        this.loadCalendar(newDate, false)
        this.$emit('changeDate', newDate)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.calender {
  //min-height: v-bind('calendarHeight');
  height: calc( 100vh - 200px );
  max-height: calc( 100vh - 250px );
  position: relative;

  @media screen and (width <= 1023px) {
    margin-bottom: 20px;
  }

  @media screen and (width <= 1023px) {
    margin-bottom: 16px;
  }

  @include media-max-width('md') {
    max-height: calc( 100vh - 360px );
  }

  @include media-max-width('sm') {
    max-height: calc( 100vh - 390px );
  }

  .calendar-header {
    margin-bottom: 10px;
    height: 65px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .calendar-title {
      padding: 20px 30px;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      text-align: right;
      letter-spacing: -0.03em;
      color: #434765;

      @media screen and (width <= 600px) {
        padding: 7px;
        position: absolute;
        top: 10px;
        left: 10px;
      }
    }

    .calendar-header--btn-next-prev {

    }

    .calendar-panel {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 16px 30px;

      @media screen and (width <= 600px) {
        padding: 16px 5px;
      }

      .calendar-date {
        padding: 10px 20px;
        margin-right: 22px;
        background: #F2F5F9;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .calendar-date-label {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          text-align: center;
          color: #434765;
          margin-left: 10px;

          @media screen and (width <= 600px) {
            font-size: 10px;
          }
        }

        @media screen and (width <= 600px) {
          padding: 10px;
          margin-right: 4px;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
        }
      }

      .calendar-view-type {
        background: #F2F5F9;
        border-radius: 20px;
        width: 110px;
        height: 40px;

        &:deep(.q-tab__indicator) {
          height: 40px;
          width: 53px;
          z-index: 0;
          background: #9690E4;
          border-radius: 20px;
        }

        &:deep(.q-tab) {
          width: 53px;
          height: 40px;
          min-height: 40px;
          padding: 0;
        }

        &:deep(.q-tab__label) {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          letter-spacing: -0.03em;
          z-index: 1;
        }

        &:deep(.q-hoverable:hover > .q-focus-helper) {
          background: transparent;
          border-radius: 20px;
        }
      }
    }

    @include media-max-width('sm') {
      $sm-btn-next-prev-width: 95px;
      .calendar-header--btn-next-prev {
        width: $sm-btn-next-prev-width;
        .q-btn {
          margin: $spacing-none;
        }
      }
      .calendar-panel {
        width: calc( 100% - #{$sm-btn-next-prev-width} );
      }
    }
  }

  .box {
    height: auto;
    background: #FFF;
    box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%) #{"/* rtl:ignore */"};
    border-radius: 16px;
    height: 100%;
    padding-top: 30px;
    position: relative;

    .first-scroll {
      &:deep(.q-scrollarea__thumb--h) {
        opacity: 0 !important;
      }
    }

    .second-scroll {
      height: v-bind('calendarHeight');
      max-height: calc( 100vh - 600px );
    }

    .calendar-first-row {
      width: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .calendar-col {
        width: 280px;
        min-width: 90px;
        //height: 59px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        // position: sticky;

        .day-name {
          text-align: center;

          //font-style: normal;
          //font-weight: 400;
          //font-size: 14px;
          //line-height: 24px;
          color: $grey-9;
        }

        .day-date {
          color: $grey-7;
        }

        &.weekly {
          width: 280px;
          min-width: 80px;
          justify-content: flex-start;
        }

        &.calendar-col--hour {
          width: 125px;
        }
      }

      &.weekly {
        //margin-left: 125px;
      }
    }

    .calendar-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .calendar-body {
        width: 100%;
        height: inherit;
        position: relative;

        .q-tab-panels {
          height: inherit;
        }

        .q-tab-panel {
          padding: 0;
        }

        .calendar-table {
          width: 100%;

          .calendar-table-row {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .calendar-table-col {
              width: 92px;
              height: 59px;
              border: 1px solid #F2F5F9;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 24px;
              text-align: center;
              color: #6D708B;

              &.holiday {
                color: #E86562;
              }

              &.top-left {
                border-radius: 0 15px 0 0;
              }

              &.top-right {
                border-radius: 15px 0 0;
              }

              &.bottom-left {
                border-radius: 0 0 15px;
              }

              &.bottom-right {
                border-radius: 0 0 0 15px;
              }
            }
          }
        }

        .calendar-weekly-view {
          width: 100%;
          height: max-content;

          .time-line {
            width: 1980px;
            z-index: 10;
            position: relative;
            height: 2px;
            left: 95px;
            background-color: lighten(#EF5350, 30%);
            border-radius: 6px;

            &::before {
              position: absolute;
              bottom: -4px;
              content: "";
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #E25D5F;
              margin-right: 10px;
            }
          }

          .calendar-weekly-background {
            display: flex;
            padding-left: 126px;

            .day-col {
              position: relative;

              .hour-line {
                width: 280px;
                height: 80px;
                border-top: 1px solid #E4E8EF;
                position: relative;
                display: flex;
                justify-content: center;

                .hour {
                  position: absolute;
                  top: 0;
                  left: -80px;
                  transform: translateY(-50%);
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 24px;
                  display: flex;
                  flex-flow: column;
                  align-items: center;
                  text-align: center;
                  color: #6D708B;
                }

                .separator {
                  margin-right: 280px;
                }
              }

              .weekly-event {
                position: absolute;
                width: 268px;
                background: #9690E4;
                border-radius: 8px;
                margin-left: 0;
                margin-top: 0;

                .event-info {
                  overflow: auto;
                  height: inherit;
                  display: flex;
                  align-content: flex-start;
                  align-items: flex-start;
                  justify-content: flex-start;
                  .product_lesson_name {
                    @include body1;
                  }
                  .event_title {
                    @include caption2;
                  }
                  .event_start {
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
            }
          }
        }

        @media screen and (width <= 720px) {
          min-width: 660px;
        }
      }

      @media screen and (width <= 720px) {
        overflow-x: auto;
      }
    }

    @media screen and (width <= 1439px) {
      margin-right: 0;
    }

    @media screen and (width <= 1200px) {
      margin-right: 0;
    }

  }
}

.calendar-dialog {
  position: relative;
  width: 335px;
  height: 392px;
  background: #FFF;
  border-radius: 16px;

  .content-section {
    padding-bottom: 0;

    .calendar-dialog-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 64px;
      background: $primary;
      border-radius: 16px 16px 0 0;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #FFF;
    }

    .month-row {
      margin: 64px 0 0;

      .month-item {
        width: 89px;
        height: 48px;
        background: #F6F9FF;
        border-radius: 10px;
        margin: 6px 5px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #434765;
        cursor: pointer;

        &.selected {
          background: #FFB74D;
          color: #FFF;
        }
      }
    }
  }

  .action-section {
    padding: 12px 24px 2px;
    display: flex;
    justify-content: flex-end;

    .submit-btn {
      width: 96px;
      height: 40px;
      background: $primary;
      border-radius: 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
      color: #FFF;
    }

    .cancel-btn {
      width: 96px;
      height: 40px;
      background: #F6F9FF;
      border-radius: 10px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #6D708B;
    }
  }
}

.event-dialog {
  max-width: 640px;
  width: 640px;

  .event-description {
    word-wrap: break-word;
  }
}
</style>
