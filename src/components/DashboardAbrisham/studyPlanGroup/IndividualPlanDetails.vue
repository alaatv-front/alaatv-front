<template>
  <div v-show="showPanelDetail"
       class="plan-details">
    <div v-if="selectedPlan.start !== null"
         class="plan-sheet">
      <div class="row">
        <div class="col-4 plan-sheet-title-1">
          از ساعت {{ selectedPlan.start.substr(0, 5) }}
        </div>
        <div class="col-4 text-center plan-sheet-title-2">
          {{ selectedPlan.title }}
        </div>
        <div class="col-4 text-right plan-sheet-title-3">
          تا ساعت {{ selectedPlan.end.substr(0, 5) }}
        </div>
      </div>
    </div>
    <div class="plan-sheet-details">
      <div class="row">
        <div v-if="filterByTypeVideo.length !== 0"
             v-ripple
             class="col-6 plan-sheet-details-card">
          <div class=" plan-sheet-details-title">
            فیلم
          </div>
          <div v-for="(content, id) in filterByTypeVideo"
               :key="id"
               v-ripple
               class="plan-sheet-details-video cursor-pointer"
               @click="contentClicked(content)">
            <div class="plan-sheet-details-video-box">
              <div class="plan-sheet-details-video-thumbnail">
                <img class="img"
                     alt="عکس درس"
                     :src="content.photo">
              </div>
              <div class="plan-sheet-details-video-title">
                {{ content.title }}
              </div>

            </div>
          </div>
        </div>
        <div v-if="filterByTypeVoice.length !== 0 "
             class="col-6 text-right plan-sheet-details-voice">
          <v-card elevation="0">
            <v-col class="text-right plan-sheet-details-title">
              {{content.title}}
            </v-col>
            <v-card v-for="(content, id) in filterByTypeVoice"
                    :key="id"
                    class="plan-sheet-details-voice-card">
              <audio controls
                     class="plan-sheet-details-voice-audio">
                <source :src="content.file.voice"
                        type="audio/ogg">
                <source :src="content.file.voice"
                        type="audio/mpeg">
                مرورگر شما از پخش  کننده صدا پشتیبانی نمیکند.
              </audio>
            </v-card>
          </v-card>
        </div>
        <div v-if="selectedPlan.long_description !== null"
             class="col-12 plan-sheet-details-card">
          <v-card elevation="0">
            <v-col class="text-right plan-sheet-details-title">
              توضیحات
            </v-col>
            <v-col class="text-right plan-sheet-details-info">
              {{ selectedPlan.long_description }}
            </v-col>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plan } from 'src/models/Plan'

export default {
  props: {
    showPanelDetail: {
      type: Boolean,
      default: () => false
    },
    selectedPlan: {
      type: Plan,
      default: () => new Plan()
    }
  },
  data () {
    return {}
  },
  computed: {
    filterByTypeVideo () {
      return this.filterBy(4)
    },
    filterByTypeVoice () {
      return this.filterBy(1)
    }
  },
  methods: {
    contentClicked (content) {
      this.$emit('contentClicked', {
        date: this.selectedPlan.date,
        content
      })
    },
    filterBy (id) {
      return this.selectedPlan.contents.list.filter((content) => (content.type.id !== null) && (parseInt(content.type.id) === parseInt(id)))
    }
  }

}
</script>
<style lang="scss" scoped>
.plan-details {
    border-radius: 10px;
    padding-right: 22px;
    padding-left: 22px;

    @media only screen and (width <= 768px){
        padding-right: 6px;
        padding-left: 6px;
        padding-bottom: 12px;
    }

    .plan-sheet {
        font-size: 18px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        background-color: #eff3ff;
        color: #3e5480;
        border-color: #FFF;
        padding-top: 7px;
        padding-bottom: 5px;
        border-radius: 10px;

        @media only screen and (width <= 768px){
            font-size: 12px;
        }

            .plan-sheet-title-3 {
                padding-right: 70px;

                @media only screen and (width <= 1920px){
                  padding-right: 50px;
                }

                @media only screen and (width <= 1200px){
                  padding-right: 62px;
                }

                @media only screen and (width <= 990px){
                  padding-right: 42px;
                }

                @media only screen and (width <= 768px){
                    padding-right: 28px;
                }
            }

    }

    .plan-sheet-details {
        margin-top: 12px;
        margin-right: 10px;

        .plan-sheet-details-card {
            padding-right: 0;
            padding-top: 0;
            margin-bottom: 15px;

            @media only screen and (width <= 768px){
                padding-right: 4px;
                padding-top: 10px;
                padding-bottom: 5px;
            }
        }
    }

        .plan-sheet-title-1 {
            @media only screen and (width <= 1920px){
                padding-left: 50px;
            }

            @media only screen and (width <= 1200px){
              padding-left: 62px;
            }

            @media only screen and (width <= 990px){
              padding-left: 42px;
            }

            @media only screen and (width <= 768px){
              padding-left: 28px;
            }
        }

        .plan-sheet-details-title {
            font-size: 18px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #3e5480;
            padding-top: 6px;
            padding-bottom: 8px;

            @media only screen and (width <= 1200px){
                padding-bottom: 7px;
            }

            @media only screen and (width <= 990px){
                display: none;
            }
        }

        .plan-sheet-details-video {
            border-radius: 10px;
            box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
            background-color: #eff3ff;
            padding-top: 0;
            padding-bottom: 9px;

            @media only screen and (width <= 990px){
                padding-top: 0;
                padding-bottom: 0;
                margin-top: 15px;
            }

            @media only screen and (width <= 768px){
                padding-top: 0;
                padding-bottom: 0;
                margin-top: 0;
                padding-right: 7px;
            }

            @media only screen and (width <= 578px){
                padding-right: 5px;
            }

            .plan-sheet-details-video-box {
                display: flex;
                flex-direction: row;
                align-items: center;

                .plan-sheet-details-video-thumbnail {
                    border-radius: 5px;
                    background-color: #ffceab;
                    height: 36px;
                    width: 64px;
                    margin-top: 9px;
                  margin-left: 10px;

                    @media only screen and (width <= 990px){
                        height: 30px;
                        width: 64px;
                        margin-top: 5px;
                        margin-bottom: 10px;
                    }

                    @media only screen and (width <= 768px){
                        height: 30px;
                        width: 54px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                        border-radius: 5px;
                    }

                    @media only screen and (width <= 768px){
                        height: 30px;
                    }

                  .img{
                    border-radius: 5px !important;
                    height: 36px;

                    @media only screen and (width <= 768px){
                      height: 30px;
                    }
                  }
                }

                .plan-sheet-details-video-title{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    height: 25px;
                    width: 600px;
                    white-space: nowrap;
                    font-size: 16px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 2.13;
                    letter-spacing: normal;
                    text-align: right;
                    color: #3e5480;
                    background-color: #eff3ff;
                    padding-left: 10px;

                    @media only screen and (width <= 990px){
                        width: 331px;
                        padding-top: 8px;
                        height: 50px;
                    }

                    @media only screen and (width <= 768px){
                        padding-top: 0;
                        font-size: 12px;
                        width: 221px;
                        height: 26px;
                    }

                    @media only screen and (width <= 406px){
                        width: 120px;
                    }
                }
            }
        }

        .plan-sheet-details-voice{
            padding-top: 22px;
            padding-right: 0;

            @media only screen and (width <= 768px) {
                padding-top: 10px;
                padding-bottom: 0;
            }
        }

        .plan-sheet-details-voice-card{
            border-radius: 40px !important;
            box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
            background-color: #fff;
            height: 40px;
            margin-top: 10px;

            @media only screen and (width <= 768px){
                height: 40px;
            }

            .plan-sheet-details-voice-audio{
                width: 100%;
                height: 40px;
                border-radius: 40px !important;
            }

        }

        .plan-sheet-details-info{
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #3e5480;

            @media only screen and (width <= 1200px){
                padding-top: 0;
                padding-right: 0;
            }

            @media only screen and (width <= 768px){
                font-size: 12px;
            }

            @media only screen and (width <= 768px){
                padding-bottom: 0;
            }
        }

    .theme--light{
        &.v-image {
            border-radius: 5px !important;
            height: 36px;

            @media only screen and (width <= 768px){
                height: 30px;
            }
        }
    }

    .v-responsive__sizer {
        padding-bottom: 30px !important;
    }
}

</style>
