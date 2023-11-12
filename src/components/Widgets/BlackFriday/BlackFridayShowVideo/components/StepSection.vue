<template>
  <div class="StepSection">
    <div class="items">
      <div v-for="(video, videoIndex) in localBlackFridayCampaignData.videos.list"
           :key="videoIndex"
           class="item"
           :class="{ 'unlock': video.is_actice, 'lock': !video.is_actice, 'current': isCurrent(videoIndex) }">
        <q-btn @click="onSelectStep(videoIndex)">
          <svg v-if="!video.is_actice"
               xmlns="http://www.w3.org/2000/svg"
               width="19"
               height="18"
               viewBox="0 0 19 18"
               fill="none">
            <path d="M14.9106 5.625H12.6606V3.9375C12.6606 3.04239 12.3051 2.18395 11.6721 1.55101C11.0392 0.918079 10.1808 0.5625 9.28564 0.5625C8.39054 0.5625 7.53209 0.918079 6.89916 1.55101C6.26622 2.18395 5.91064 3.04239 5.91064 3.9375V5.625H3.66064C3.36228 5.625 3.07613 5.74353 2.86515 5.9545C2.65417 6.16548 2.53564 6.45163 2.53564 6.75V14.625C2.53564 14.9234 2.65417 15.2095 2.86515 15.4205C3.07613 15.6315 3.36228 15.75 3.66064 15.75H14.9106C15.209 15.75 15.4952 15.6315 15.7061 15.4205C15.9171 15.2095 16.0356 14.9234 16.0356 14.625V6.75C16.0356 6.45163 15.9171 6.16548 15.7061 5.9545C15.4952 5.74353 15.209 5.625 14.9106 5.625ZM9.28564 11.5312C9.11877 11.5312 8.95564 11.4818 8.81688 11.3891C8.67813 11.2963 8.56998 11.1646 8.50612 11.0104C8.44226 10.8562 8.42555 10.6866 8.45811 10.5229C8.49066 10.3592 8.57102 10.2089 8.68902 10.0909C8.80702 9.97288 8.95737 9.89252 9.12104 9.85996C9.28471 9.82741 9.45436 9.84412 9.60853 9.90798C9.76271 9.97184 9.89448 10.08 9.9872 10.2187C10.0799 10.3575 10.1294 10.5206 10.1294 10.6875C10.1294 10.9113 10.0405 11.1259 9.88227 11.2841C9.72403 11.4424 9.50942 11.5312 9.28564 11.5312ZM11.5356 5.625H7.03564V3.9375C7.03564 3.34076 7.2727 2.76847 7.69465 2.34651C8.11661 1.92455 8.68891 1.6875 9.28564 1.6875C9.88238 1.6875 10.4547 1.92455 10.8766 2.34651C11.2986 2.76847 11.5356 3.34076 11.5356 3.9375V5.625Z"
                  fill="#D0CCF4" />
          </svg>
          <svg v-else-if="!isCurrent(videoIndex)"
               xmlns="http://www.w3.org/2000/svg"
               width="21"
               height="20"
               viewBox="0 0 21 20"
               fill="none">
            <path d="M19.7245 7.10235L9.69246 17.1336C9.57639 17.2497 9.43857 17.3418 9.2869 17.4046C9.13522 17.4675 8.97266 17.4998 8.80848 17.4998C8.6443 17.4998 8.48173 17.4675 8.33006 17.4046C8.17838 17.3418 8.04057 17.2497 7.92449 17.1336L2.32918 11.5086C2.09518 11.2742 1.96375 10.9566 1.96375 10.6254C1.96375 10.2942 2.09518 9.97655 2.32918 9.74219L4.20418 7.86719C4.4378 7.63351 4.75443 7.50184 5.08486 7.50097C5.41528 7.50009 5.73261 7.63007 5.96746 7.8625L8.82996 10.618L8.83856 10.6266L16.0831 3.48828C16.3174 3.25499 16.6345 3.12402 16.9651 3.12402C17.2957 3.12402 17.6129 3.25499 17.8472 3.48828L19.7222 5.32891C19.8392 5.44493 19.9322 5.58296 19.9957 5.73506C20.0593 5.88715 20.0921 6.05031 20.0923 6.21514C20.0925 6.37997 20.0601 6.54321 19.997 6.69548C19.9339 6.84774 19.8413 6.98602 19.7245 7.10235Z"
                  fill="#D0CCF4" />
          </svg>
          <svg v-else
               xmlns="http://www.w3.org/2000/svg"
               width="25"
               height="24"
               viewBox="0 0 25 24"
               fill="none">
            <path d="M20.6785 6.75H17.3897C17.4263 6.71906 17.4638 6.68906 17.4994 6.65625C17.7841 6.40329 18.0136 6.0943 18.1735 5.74861C18.3333 5.40292 18.4201 5.02796 18.4285 4.64718C18.4408 4.23063 18.3678 3.81595 18.2141 3.42861C18.0603 3.04127 17.8291 2.68944 17.5344 2.39471C17.2398 2.09999 16.888 1.8686 16.5007 1.71474C16.1134 1.56088 15.6988 1.48781 15.2822 1.5C14.9013 1.5082 14.5261 1.59495 14.1803 1.75482C13.8344 1.91468 13.5253 2.14422 13.2722 2.42906C12.922 2.8349 12.6374 3.29291 12.4285 3.78656C12.2196 3.29291 11.9349 2.8349 11.5847 2.42906C11.3317 2.14422 11.0225 1.91468 10.6767 1.75482C10.3308 1.59495 9.95565 1.5082 9.57472 1.5C9.15816 1.48781 8.7435 1.56088 8.35621 1.71474C7.96891 1.8686 7.61715 2.09999 7.32251 2.39471C7.02788 2.68944 6.79659 3.04127 6.64285 3.42861C6.4891 3.81595 6.41615 4.23063 6.42847 4.64718C6.4368 5.02796 6.52361 5.40292 6.68347 5.74861C6.84333 6.0943 7.0728 6.40329 7.35753 6.65625C7.39315 6.68718 7.43065 6.71718 7.46722 6.75H4.17847C3.78064 6.75 3.39911 6.90803 3.11781 7.18934C2.8365 7.47064 2.67847 7.85217 2.67847 8.25V11.25C2.67847 11.6478 2.8365 12.0294 3.11781 12.3107C3.39911 12.592 3.78064 12.75 4.17847 12.75V18.75C4.17847 19.1478 4.3365 19.5294 4.61781 19.8107C4.89911 20.092 5.28064 20.25 5.67847 20.25H11.3035C11.4029 20.25 11.4983 20.2105 11.5686 20.1402C11.639 20.0698 11.6785 19.9745 11.6785 19.875V11.25H4.17847V8.25H11.6785V11.25H13.1785V8.25H20.6785V11.25H13.1785V19.875C13.1785 19.9745 13.218 20.0698 13.2883 20.1402C13.3586 20.2105 13.454 20.25 13.5535 20.25H19.1785C19.5763 20.25 19.9578 20.092 20.2391 19.8107C20.5204 19.5294 20.6785 19.1478 20.6785 18.75V12.75C21.0763 12.75 21.4578 12.592 21.7391 12.3107C22.0204 12.0294 22.1785 11.6478 22.1785 11.25V8.25C22.1785 7.85217 22.0204 7.47064 21.7391 7.18934C21.4578 6.90803 21.0763 6.75 20.6785 6.75ZM8.35128 5.53125C8.22014 5.4125 8.11497 5.26791 8.04237 5.10658C7.96977 4.94525 7.93131 4.77065 7.9294 4.59375C7.92466 4.38647 7.96134 4.18033 8.03728 3.9874C8.11322 3.79448 8.22691 3.61865 8.37167 3.47022C8.51643 3.32179 8.68936 3.20375 8.88032 3.12301C9.07129 3.04226 9.27645 3.00044 9.48378 3H9.52972C9.70662 3.0019 9.88122 3.04037 10.0426 3.11297C10.2039 3.18556 10.3485 3.29073 10.4672 3.42187C11.2538 4.31062 11.5313 5.78437 11.6288 6.69562C10.7138 6.59906 9.24097 6.32156 8.35128 5.53125ZM16.5075 5.53125C15.6178 6.31875 14.1413 6.59625 13.2263 6.69375C13.3378 5.70843 13.6472 4.26562 14.3972 3.42281C14.516 3.29167 14.6605 3.1865 14.8219 3.1139C14.9832 3.0413 15.1578 3.00284 15.3347 3.00093H15.3807C15.588 3.00223 15.793 3.0449 15.9836 3.12644C16.1743 3.20798 16.3467 3.32675 16.4909 3.47579C16.635 3.62483 16.748 3.80115 16.8231 3.99441C16.8983 4.18766 16.9341 4.39397 16.9285 4.60125C16.9254 4.77695 16.8863 4.95016 16.8136 5.11013C16.7409 5.2701 16.636 5.41344 16.5057 5.53125H16.5075Z"
                  fill="white" />
          </svg>
        </q-btn>
        <div v-if="isCurrent(videoIndex)"
             class="curren-info">
          <div class="curren-info-title">
            نکته
            {{ videoIndex }}
            از ۷
          </div>
          <div class="curren-info-caption"
               v-html="video.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { BlackFridayCampaignData } from 'src/models/BlackFridayCampaignData.js'

export default defineComponent({
  name: 'StepSection',
  props: {
    blackFridayCampaignData: {
      type: BlackFridayCampaignData,
      default: new BlackFridayCampaignData()
    }
  },
  data () {
    return {

    }
  },
  computed: {
    localBlackFridayCampaignData: {
      get () {
        return this.blackFridayCampaignData
      },
      set (newValue) {
        this.$emit('update:blackFridayCampaignData', newValue)
      }
    },
    selectedVideo () {
      if (this.localBlackFridayCampaignData.videos.list.length === 0) {
        return null
      }

      const selectedIndex = this.localBlackFridayCampaignData.videos.list.findIndex(video => video.selected) || 0

      return this.localBlackFridayCampaignData.videos.list[selectedIndex]
    }
  },
  methods: {
    onSelectStep (videoIndex) {
      this.$emit('onSelectStep', videoIndex)
    },
    isCurrent (videoIndex) {
      if (this.localBlackFridayCampaignData.videos.list.length === 0) {
        return false
      }

      const lastActiveIndex = this.getLastActiveIndex()

      return videoIndex === lastActiveIndex
    },
    getLastActiveIndex () {
      let activeIndex = 0
      this.localBlackFridayCampaignData.videos.list.forEach((video, videoIndex) => {
        if (video.is_actice && activeIndex < videoIndex) {
          activeIndex = videoIndex
        }
      })

      return activeIndex
    }
  }
})
</script>

<style scoped lang="scss">
.StepSection {
  display: flex;
  justify-content: center;
  .items {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 1130px;
    padding-top: 50px;
    padding-bottom: 78px;

    &::-webkit-scrollbar{
      width: 10px ;
      height: 10px;
      border-radius: 6px ;
      background-color: #D14835;
    }

    &::-webkit-scrollbar-track{
      border-radius: 6px ;
      background-color: #F5F5F5 ;
    }

    &::-webkit-scrollbar-thumb{
      border-radius: 6px ;
      background-color: #D14835;
    }

    @media screen and (max-width: 1439px) {
      width: 964px;
      padding-right: 82px;
      padding-left: 82px;
    }
    @media screen and (max-width: 1023px) {
      width: 540px;
      padding-top: 48px;
      padding-right: 0;
      padding-left: 0;
    }
    @media screen and (max-width: 599px) {
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;
      justify-content: flex-start;
      padding-bottom: 102px;
      padding-top: 40px;
    }
    .item {
      position: relative;
      z-index: 1;
      &:after {
        content: ' ';
        position: absolute;
        z-index: -1;
        height: 24px;
        left: 5px;
        top: calc( 50% - 12px );
        width: 160px;
        background: #19172E;
        @media screen and (max-width: 1439px) {
          width: 140px;
        }
        @media screen and (max-width: 1023px) {
          width: 75px;
          height: 20px;
          top: calc( 50% - 10px );
        }
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
      .q-btn {
        width: 56px;
        height: 56px;
        padding: 18px;
        @media screen and (max-width: 1023px) {
          width: 48px;
          height: 48px;
          padding: 15px;
        }
        border-radius: 100px;
        background: #5E57AC;
        box-shadow: 0 0 32px 0 rgba(51, 51, 51, 0.09);
      }
      &.current {
        position: relative;
        .q-btn {
          width: 64px;
          height: 64px;
          padding: 20px;
          @media screen and (max-width: 1023px) {
            width: 56px;
            height: 56px;
            padding: 18px;
          }
          border-radius: 100px;
          background: #D14835;
          box-shadow: 0 0 50px 0 rgba(85, 32, 24, 0.32);
        }
        .curren-info {
          position: absolute;
          top: calc( 64px + 24px );
          left: calc( (75px - 32px) * -1 );
          width: 150px;
          text-align: center;
          .curren-info-title {
            color: #D75F4E;
            text-align: center;
            font-family: ModamFaNumWeb,serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.6px;
          }
          .curren-info-caption {
            color: #FFF;
            text-align: center;
            font-family: ModamFaNumWeb,serif;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.54px;
          }
        }
      }
      @media screen and (max-width: 599px) {
        margin-right: 18px;
        &:first-child {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
