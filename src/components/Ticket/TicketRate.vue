<!--ToDo : refactor needed-->
<template>
  <div class="row">
    <div class="col-8">
      <div class="row">
        <div class="col-4 q-px-md">
          <div @click="rateImgSelection(firstImg.id)"
               class="rate">
            <q-img style="width: 70px; height: 70px"
                   :src="firstImg.url" />
            <div class="rate-title">
              جوابم رو گرفتم
            </div>
          </div>
        </div>
        <div class="col-4 q-px-md">
          <div @click="rateImgSelection(secondImg.id)"
               class="rate">
            <q-img style="width: 70px; height: 70px"
                   :src="secondImg.url" />
            <div class="rate-title">
              معمولی بود
            </div>
          </div>
        </div>
        <div class="col-4 q-px-md">
          <div @click="rateImgSelection(thirdImg.id)"
               class="rate">
            <q-img style="width: 70px; height: 70px"
                   :src="thirdImg.url" />
            <div class="rate-title">
              بد بود
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'TicketRate',
  props: {
    ticketId: {
      type: Number,
      default: null
    },
    rate: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      selectedId: 0,
      baseImg: {
        url: 'https://nodes.alaatv.com/upload/ticket-rate-1-off.png'
      },
      firstImg: {
        id: 3,
        url: 'https://nodes.alaatv.com/upload/ticket-rate-3-off.png'
      },
      secondImg: {
        id: 2,
        url: 'https://nodes.alaatv.com/upload/ticket-rate-2-off.png'
      },
      thirdImg: {
        id: 1,
        url: 'https://nodes.alaatv.com/upload/ticket-rate-1-off.png'
      },
      thirdImgOn: 'https://nodes.alaatv.com/upload/ticket-rate-1-on.png',
      secondImgOn: 'https://nodes.alaatv.com/upload/ticket-rate-2-on.png',
      firstImgOn: 'https://nodes.alaatv.com/upload/ticket-rate-3-on.png'
    }
  },
  methods: {
    rateImgSelection (rateId) {
      if (this.isSelected(this.selectedId, rateId)) {
        axios.post(API_ADDRESS.ticket.ticketRate(this.ticketId), {
          rate: rateId
        })
          .then((res) => {
            if (rateId === this.firstImg.id) {
              if (this.secondImg.url === this.secondImgOn) {
                this.secondImg.url = 'https://nodes.alaatv.com/upload/ticket-rate-2-off.png'
              }
              if (this.thirdImg.url === this.thirdImgOn) {
                this.thirdImg.url = 'https://nodes.alaatv.com/upload/ticket-rate-1-off.png'
              }
              this.firstImg.url = this.firstImgOn
            } else if (rateId === this.secondImg.id) {
              if (this.firstImg.url === this.firstImgOn) {
                this.firstImg.url = 'https://nodes.alaatv.com/upload/ticket-rate-3-off.png'
              }
              if (this.thirdImg.url === this.thirdImgOn) {
                this.thirdImg.url = 'https://nodes.alaatv.com/upload/ticket-rate-1-off.png'
              }
              this.secondImg.url = this.secondImgOn
            } else if (rateId === this.thirdImg.id) {
              if (this.firstImg.url === this.firstImgOn) {
                this.firstImg.url = 'https://nodes.alaatv.com/upload/ticket-rate-3-off.png'
              }
              if (this.secondImg.url === this.secondImgOn) {
                this.secondImg.url = 'https://nodes.alaatv.com/upload/ticket-rate-2-off.png'
              }
              this.thirdImg.url = this.thirdImgOn
            }
            this.selectedId = rateId
            this.$q.notify({
              message: res.data.message,
              type: 'positive'
            })
          })
      } else return false
    },
    isSelected (selectedId, id) {
      return selectedId !== id
    }
  },
  watch: {
    rate (newVal, oldVal) {
      setTimeout(() => {
        if (this.rate === this.firstImg.id) {
          this.firstImg.url = this.firstImgOn
        } else if (this.rate === this.secondImg.id) {
          this.secondImg.url = this.secondImgOn
        } else if (this.rate === this.thirdImg.id) {
          this.thirdImg.url = this.thirdImgOn
        }
      }, 50)
    }
  },
  computed: {
    getImg () {
      return (id) => {
        return 'https://nodes.alaatv.com/upload/ticket-rate-' + id + '-off.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rate{
  display: flex;
  cursor: pointer;
  .rate-title {
    display: flex;
    align-items: center;
    margin-left: 16px;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
