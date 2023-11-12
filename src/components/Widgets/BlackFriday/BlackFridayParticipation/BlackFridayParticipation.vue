<template>
  <div class="participation-container">
    <div class="participation-slogan">
      <div class="slogan-header">
        <div class="slogan-title">
          <div class="slogan-title__icon">
            <lazy-img :src="'https://nodes.alaatv.com/upload/alaaPages/2023-11/pinkstar1699710628.png'" />
          </div>
          <div class="slogan-title__text">
            سرعت بی نهایت
          </div>
        </div>
        <div class="slogan-chance">
          <div class="slogan-chance__text">شانس امروز : </div>
          <div class="slogan-chance__number">۱ عدد</div>
        </div>
      </div>
      <div class="slogan-body">
        به مدت ۷ روز، هر روز شانس برنده شدن "سرعت بی نهایت" یا همون ثبت نام رایگان توی همه دوره های آلا تا کنکور ۱۴۰۳ داری. این یعنی، سرعت بی نهایت به سمت هدفت. آلا همیشه کنارته رفیق!
      </div>
    </div>
    <div class="participation-action">
      امتحان کن!
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'components/lazyImg.vue'

export default defineComponent({
  name: 'BlackFridayParticipation',
  components: {
    LazyImg
  }
})
</script>

<style lang="scss" scoped>
.participation-container {
  background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/19201699707964.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 228px;
  padding: 48.5px 80px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (max-width: 1919px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/19201699707964.png');
  }
  @media screen and (max-width: 1439px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/10241699714534.png');
  }
  @media screen and (max-width: 1023px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/6001699714668.png');
  }
  @media screen and (max-width: 599px) {
    background: url('https://nodes.alaatv.com/upload/alaaPages/2023-11/3601699714708.png');
  }

  .participation-slogan {
    max-width: 336px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1439px) {
      max-width: 261px;
    }

    .slogan-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .slogan-title {
        display: flex;
        align-items: center;
        color: #ffffff;

        &__icon {
          width: 20px;
          height: 20px;
          margin-right: 4px;
          color: #F7AFA4;
        }
        &__text {
          font-family: ModamFaNumWeb;
          font-size: 24px;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          letter-spacing: -0.72px;
        }
      }

      .slogan-chance {
        display: flex;
        align-items: center;
        color: #ffffff;
        font-family: ModamFaNumWeb;
        font-size: 16px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        letter-spacing: -0.48px;

        &__number {
          margin-left: 1px;
        }
      }
    }
    .slogan-body {
      color: #ffffff;
      font-family: ModamFaNumWeb;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.54px;
      margin-top: 16px;
    }
  }

  .participation-action {
    position: absolute;
    left: 45%;
    display: inline-flex;
    align-self: center;
    height: 97.2px;
    padding: 19.2px 19.2px 17.84px 14px;
    align-items: center;
    flex-shrink: 0;
    height: 97.2px;
    border-radius: 81px;
    background:#FFF;
    box-shadow: 4.5px 4.5px 11.7px 0px rgba(198, 75, 58, 0.90), -4.5px -4.5px 9px 0px rgba(242, 91, 70, 0.90), 4.5px -4.5px 9px 0px rgba(198, 75, 58, 0.20), -4.5px 4.5px 9px 0px rgba(198, 75, 58, 0.20), -0.9px -0.9px 1.8px 0px rgba(198, 75, 58, 0.50) inset, 0.9px 0.9px 1.8px 0px rgba(242, 91, 70, 0.30) inset;
    cursor: pointer;

    animation-name: ripple;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }
}

@keyframes ripple {
    0% {
        box-shadow: 0 0 0 0 #fff4, 0 0 0 0 #fff4;
    }

    80% {
        box-shadow: 0 0 0 30px #fff0, 0 0 0 50px #fff0;
    }

    100% {
        box-shadow: 0 0 0 0 #fff0, 0 0 0 0 #fff0;
    }
}

</style>
