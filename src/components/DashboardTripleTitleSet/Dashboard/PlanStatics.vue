<template>
  <div v-if="showChart"
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
// let highcharts
// if (typeof window !== 'undefined') {
//   import('highcharts-vue')
//     .then(({ Chart }) => {
//       highcharts = Chart
//     })
// }
export default defineComponent({
  name: 'PlanStatics',
  components: {
    // highcharts
  },
  props: {
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
      showChart: false
      // chartOptionsExam: {
      //   chart: {
      //     height: '150',
      //     width: '150',
      //     type: 'pie',
      //     plotShadow: false
      //   },
      //   credits: {
      //     enabled: false
      //   },
      //   tooltip: {
      //     shared: false,
      //     useHTML: true,
      //     borderWidth: 0,
      //     backgroundColor: 'rgba(255,255,255,0)',
      //     shadow: false
      //     // formatter: function () {
      //     //   const point = this.point
      //     //   return '<span class="myTooltip" style="padding:5px;border-radius:5px;background-color:' + point.color + ';">' + point.y + '&nbsp' + 'سوال' + '</span>'
      //     // }
      //   },
      //   plotOptions: {
      //     pie: {
      //       innerSize: '98%',
      //       startAngle: 0,
      //       endAngle: 0,
      //       borderWidth: 20,
      //       center: ['50%', '52%'],
      //       size: '150%',
      //       borderColor: null,
      //       backgroundColor: '#F2F5F9',
      //       slicedOffset: 16,
      //       dataLabels: {
      //         connectorWidth: 0
      //       }
      //     }
      //   },
      //   title: {
      //     y: 20,
      //     style: {
      //       useHTML: true,
      //       fontSize: '12px'
      //     },
      //     verticalAlign: 'middle',
      //     floating: true,
      //     text: ' '
      //   },
      //   series: [{
      //     id: 'idData',
      //     data: [
      //       { name: '', y: 0, color: '#9690E4' }
      //     ]
      //   }]
      // }
    }
  },
  computed: {
    percent() {
      return Math.floor((this.watched * 100) / (this.watched + this.remained)) || 0
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      this.showChart = true
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
