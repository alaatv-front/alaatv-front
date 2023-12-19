<template>
  <div class="SurpriseBox">
    <div class="BodyMovin-container"
         :class="{'animateCompleted': animateCompleted}">
      <webm-player :responsive-src="bodyMovin"
                   autoplay
                   loop
                   @click="onComplete" />
    </div>
    <div class="main">
      <div class="title">
        هدیه‌ای از مادر به فرزند
      </div>
      <div class="description">
        مادر نازنین، این هدیه‌ای برای ثمره زندگی شما، یعنی فرزندتونه. با این کد میتونه کاملا رایگان، یک درس از دوره‌ های ویژه امتحانات نهایی آلا رو ثبت نام کنه.
      </div>
      <div class="discount-box">
        <div class="discount-box-title">
          کد تخفیف  :
        </div>
        <div class="discount-box-input">
          <div class="value">
            {{ discountCode }}
          </div>
          <div class="divider" />
          <div class="action-box">
            <q-icon name="ph:copy-simple"
                    class="btn-copy"
                    @click="copyCode" />
            <q-icon name="ph:share-network"
                    class="btn-share-network">
              <q-popup-proxy :offset="[10, 10]"
                             transition-show="flip-up"
                             transition-hide="flip-down">
                <share-network :url="pageUrl"
                               @on-select="shareCode" />
              </q-popup-proxy>
            </q-icon>
          </div>
        </div>
      </div>
      <div class="banners">
        <lazy-img v-for="(banner, bannerIndex) in banners"
                  :key="bannerIndex"
                  :src="banner.src" />
      </div>
    </div>
    <div class="footer">
      <div class="logo">
        <svg width="130"
             height="32"
             viewBox="0 0 130 32"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_3916_4493)">
            <path d="M94.7738 12.4629C92.9919 12.4629 91.5431 13.8875 91.5431 15.6335V16.7301C91.5431 17.6791 90.7584 18.4519 89.7903 18.4519H88.1313L88.2364 18.2692C88.574 17.6879 88.7484 17.0273 88.7484 16.358C88.7484 14.2134 86.9709 12.4651 84.7843 12.4651H83.4429C83.179 12.4651 82.9622 12.6765 82.9622 12.9407V13.7906C82.9622 14.0504 83.1768 14.2662 83.4429 14.2662H84.7843C85.9604 14.2662 86.9173 15.2064 86.9173 16.3602C86.9173 17.5139 85.9604 18.4563 84.7843 18.4563H83.4429C83.179 18.4563 82.9622 18.6677 82.9622 18.9319V19.7818C82.9622 20.0438 83.1768 20.2574 83.4429 20.2574H89.7903C90.7181 20.2574 91.5968 19.9095 92.2697 19.2776L92.3592 19.1939L92.4464 19.282C93.0612 19.9117 93.8862 20.2574 94.7738 20.2574C96.5513 20.2574 98.0001 18.8372 98.0001 17.089V15.6402C98.0001 13.8919 96.5513 12.4695 94.7738 12.4695V12.4629ZM96.1667 17.0824C96.1667 17.8354 95.5407 18.4519 94.7738 18.4519C94.007 18.4519 93.3765 17.8354 93.3765 17.0824V15.6335C93.3765 14.8761 94.0025 14.2618 94.7738 14.2618C95.5452 14.2618 96.1667 14.8761 96.1667 15.6335V17.0824Z"
                  fill="#424242" />
            <path d="M3.09744 17.9302C2.99236 18.4234 3.37468 18.8616 3.86208 18.8616H4.27794C4.51493 18.8616 4.70497 19.0487 4.70497 19.2821V19.8348C4.70497 20.066 4.51493 20.2553 4.27794 20.2553H1.28421C1.04722 20.2553 0.857178 20.066 0.857178 19.8348V19.2821C0.857178 19.0487 1.04722 18.8616 1.28421 18.8616H1.79397L1.75597 18.7383C1.68889 18.5291 1.65535 18.3133 1.65535 18.0931V18.0425C1.68218 16.8711 2.66146 15.9287 3.85984 15.9287H4.2757C4.51269 15.9287 4.70274 16.1159 4.70274 16.3493V16.9019C4.70274 17.1353 4.51269 17.3225 4.2757 17.3225H3.88444C3.51106 17.3225 3.17122 17.5691 3.0952 17.928L3.09744 17.9302Z"
                  fill="#424242" />
            <path d="M13.0378 12.4544V17.2874C13.0378 18.9234 11.683 20.2555 10.0173 20.2555H6.63454C6.37072 20.2555 6.15161 20.0441 6.15161 19.7799V18.93C6.15161 18.668 6.36848 18.4544 6.63454 18.4544H7.45731L6.27234 12.7824C6.21868 12.527 6.38637 12.276 6.64796 12.2232L7.49979 12.0514C7.75914 11.9986 8.01402 12.1637 8.06768 12.4191L9.32867 18.4522H10.0173C10.6321 18.4522 11.1374 17.992 11.2 17.4063L11.2067 12.45C11.2067 12.1901 11.4214 11.9766 11.6897 11.9766H12.5594C12.8254 11.9766 13.0423 12.1879 13.0423 12.4522L13.0378 12.4544Z"
                  fill="#424242" />
            <path d="M19.9888 9.28112C18.786 11.1131 16.6485 10.8004 15.591 10.327C15.5038 10.2962 15.4189 10.2609 15.3317 10.2301C14.2563 9.81837 13.7465 9.6246 13.1406 10.6771C13.0199 10.8841 12.7382 10.9721 12.519 10.8708L11.9623 10.6132C11.6985 10.4921 11.6091 10.1927 11.7522 9.94167C13.0601 7.69138 14.7593 8.34093 15.9063 8.7813C15.9957 8.81433 16.0851 8.84955 16.1746 8.88258L16.2282 8.9046C16.5077 9.0279 17.8536 9.54974 18.6272 8.47744C18.7524 8.3035 19.023 8.23524 19.2197 8.32552L19.7876 8.58754C20.0514 8.71084 20.1453 9.03891 19.9866 9.28112H19.9888Z"
                  fill="#424242" />
            <path d="M16.3824 11.981H15.5127C15.246 11.981 15.0298 12.1939 15.0298 12.4566V19.7579C15.0298 20.0205 15.246 20.2335 15.5127 20.2335H16.3824C16.6492 20.2335 16.8654 20.0205 16.8654 19.7579V12.4566C16.8654 12.1939 16.6492 11.981 16.3824 11.981Z"
                  fill="#424242" />
            <path d="M25.8846 11.556C25.8846 12.1593 25.3838 12.6503 24.769 12.6503C24.1541 12.6503 23.6533 12.1593 23.6533 11.556C23.6533 10.9527 24.1519 10.4595 24.769 10.4595C25.3861 10.4595 25.8846 10.9505 25.8846 11.556Z"
                  fill="#424242" />
            <path d="M36.6722 22.3887V23.2408C36.6722 23.5006 36.4576 23.7142 36.1893 23.7142H32.375C32.109 23.7142 31.8921 23.5028 31.8921 23.2408V22.3887C31.8921 22.1289 32.1067 21.9131 32.375 21.9131H36.1893C36.4553 21.9131 36.6722 22.1267 36.6722 22.3887Z"
                  fill="#424242" />
            <path d="M36.896 14.7881V17.285C36.896 18.921 35.5433 20.2531 33.8777 20.2531H29.8488V20.6934C29.8488 22.3294 28.4916 23.6615 26.826 23.6615H22.7613C21.0934 23.6615 19.7385 22.3294 19.7385 20.6934V15.7657C19.7385 15.5059 19.9532 15.2923 20.2215 15.2923H21.0934C21.3595 15.2923 21.5763 15.5037 21.5763 15.7657V20.6934C21.5763 21.3386 22.1085 21.8604 22.7613 21.8604H26.8305C27.4855 21.8604 28.0177 21.3364 28.0177 20.689V14.7881C28.0177 14.5261 28.2323 14.3125 28.5006 14.3125H29.3725C29.6386 14.3125 29.8555 14.5239 29.8555 14.7881V18.4564H33.8844C34.5395 18.4564 35.0716 17.9323 35.0716 17.285V14.7881C35.0716 14.5261 35.2862 14.3125 35.5545 14.3125H36.422C36.6881 14.3125 36.9049 14.5239 36.9049 14.7881H36.896Z"
                  fill="#424242" />
            <path d="M49.119 11.556C49.119 12.1593 48.6204 12.6503 48.0034 12.6503C47.3863 12.6503 46.8877 12.1593 46.8877 11.556C46.8877 10.9527 47.3885 10.4595 48.0034 10.4595C48.6182 10.4595 49.119 10.9505 49.119 11.556Z"
                  fill="#424242" />
            <path d="M51.4821 14.7568V17.2867C51.4821 18.9226 50.1295 20.2548 48.4638 20.2548H38.7202C38.4542 20.2548 38.2373 20.0434 38.2373 19.7792V18.9293C38.2373 18.6672 38.4519 18.4537 38.7202 18.4537H39.543L38.358 12.7817C38.3044 12.5263 38.4721 12.2753 38.7337 12.2224L39.5833 12.0507C39.8448 11.9978 40.0997 12.163 40.1534 12.4184L41.4121 18.4515H42.1008C42.7558 18.4515 43.2902 17.9252 43.2902 17.2845V12.4536C43.2902 12.1916 43.5048 11.978 43.7731 11.978H44.6406C44.9067 11.978 45.1235 12.1894 45.1235 12.4536V17.2779C45.1235 17.6236 45.0632 17.967 44.9447 18.2907L44.8843 18.4537H48.4616C49.025 18.4537 49.4967 18.0661 49.6197 17.5509L49.651 17.5817V14.7568C49.651 14.4947 49.8656 14.2812 50.1339 14.2812H51.0014C51.2675 14.2812 51.4844 14.4925 51.4844 14.7568H51.4821Z"
                  fill="#424242" />
            <path d="M58.5271 9.28112C57.3243 11.1131 55.1869 10.8004 54.1293 10.327C54.0422 10.2962 53.9572 10.2609 53.8722 10.2301C52.7946 9.81837 52.2871 9.6246 51.6789 10.6771C51.5582 10.8841 51.2765 10.9721 51.0574 10.8708L50.5007 10.6132C50.2368 10.4921 50.1474 10.1927 50.2905 9.94167C51.5962 7.68918 53.2954 8.34093 54.4424 8.7813C54.5318 8.81433 54.6235 8.84955 54.7107 8.88258L54.7665 8.9046C55.046 9.0279 56.3897 9.54974 57.1656 8.47744C57.2908 8.3035 57.5613 8.23524 57.758 8.32552L58.3259 8.58754C58.592 8.71084 58.6837 9.03891 58.5249 9.28112H58.5271Z"
                  fill="#424242" />
            <path d="M54.8514 11.981H53.9817C53.715 11.981 53.4988 12.1939 53.4988 12.4566V19.7579C53.4988 20.0205 53.715 20.2335 53.9817 20.2335H54.8514C55.1181 20.2335 55.3344 20.0205 55.3344 19.7579V12.4566C55.3344 12.1939 55.1181 11.981 54.8514 11.981Z"
                  fill="#424242" />
            <path d="M78.0121 14.7375V17.2894C78.0121 18.9254 76.655 20.2575 74.9893 20.2575H64.9864C63.5532 20.2575 62.3929 19.1103 62.3951 17.699L62.3996 15.638H61.1229C60.4656 15.638 59.9313 16.1599 59.9313 16.8028V19.2931C59.9313 19.5529 59.7166 19.7687 59.4506 19.7687H58.5808C58.3148 19.7687 58.0979 19.5551 58.0979 19.2931V16.8028C58.0979 15.1668 59.455 13.8369 61.1207 13.8369H63.4325C63.8752 13.8369 64.2329 14.1892 64.2329 14.6274L64.224 17.6043C64.224 18.0755 64.6108 18.4586 65.0892 18.4586H74.9871C75.6399 18.4586 76.1743 17.9323 76.1743 17.2872V14.7397C76.1743 14.4799 76.3889 14.2663 76.6572 14.2663H77.5292C77.7952 14.2663 78.0121 14.4777 78.0121 14.7397V14.7375Z"
                  fill="#424242" />
            <path d="M81.386 14.7376V18.3574C81.386 19.9229 80.5968 21.3739 79.2732 22.2503L78.4393 22.7985C78.2179 22.9438 77.9205 22.8866 77.7708 22.6708L77.2856 21.9618C77.1358 21.7438 77.1961 21.4488 77.4175 21.3013L78.2514 20.753C79.0653 20.218 79.5527 19.3196 79.5527 18.3552V14.7376C79.5527 14.4777 79.7673 14.2642 80.0356 14.2642H80.9031C81.1691 14.2642 81.386 14.4755 81.386 14.7376Z"
                  fill="#424242" />
            <path d="M125.363 13.6661C125.226 13.2129 124.886 12.8359 124.428 12.6321C124.228 12.5428 124.062 12.4579 123.914 12.3828C122.475 11.6505 121.787 12.0312 120.787 13.1637C119.406 14.7298 117.051 14.9629 115.425 13.6936C115.213 13.5282 115.037 13.4081 114.853 13.3037C114.817 13.2837 114.781 13.2643 114.747 13.2459C113.076 12.2486 111.173 11.8474 109.09 12.0518L109.03 12.0594C106.462 12.4385 104.429 13.639 102.989 15.6275C102.853 15.8152 102.44 16.3863 102.613 17.0855C102.786 17.7831 103.42 18.1173 103.627 18.2271C103.892 18.3672 104.154 18.4916 104.4 18.6068C104.756 18.7733 105.086 18.8571 105.396 18.8571C105.962 18.8571 106.456 18.5759 106.888 18.0108C108.214 16.2759 110.553 15.8514 112.329 17.0244L112.959 17.4062C114.72 18.5483 116.745 19.008 118.98 18.7739L119.04 18.7657C121.666 18.3602 123.72 17.0952 125.147 15.0072C125.421 14.607 125.499 14.1182 125.363 13.6661Z"
                  fill="#FFCA28" />
          </g>
          <defs>
            <clipPath id="clip0_3916_4493">
              <rect width="129.143"
                    height="32"
                    fill="white"
                    transform="translate(0.857178)" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="copy-right">
        © 2012 AlaaTV.com
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { copyToClipboard } from 'quasar'
import WebmPlayer from './WebmPlayer.vue'
import LazyImg from 'src/components/lazyImg.vue'
import ShareNetwork from 'components/ShareNetwork.vue'

export default defineComponent({
  name: 'SurpriseBox',
  components: { ShareNetwork, WebmPlayer, LazyImg },
  props: {
    discountCode: {
      type: String,
      default: ''
    },
    banners: {
      type: Array,
      default: () => []
    },
    bodyMovin: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      animateCompleted: false
    }
  },
  computed: {
    pageUrl () {
      if (typeof window === 'undefined') {
        return '-'
      }
      return window.location.href
    }
  },
  methods: {
    onComplete () {
      this.animateCompleted = true
    },
    shareCode ({ name, url }) {
      window.open(url, '_blank')
    },
    copyCode () {
      copyToClipboard(this.discountCode.toString())
        .then(() => {
          this.$q.notify({
            message: 'کد تخفیف کپی شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در کپی کردن  رخ داده اس.'
          })
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.SurpriseBox {
  /* page > 1920 */
  width: 322px;
  height: 784px;
  padding: 40px 32px;
  background: #FFF;
  box-shadow: 0 40px 72px -12px rgba(21, 17, 51, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex-shrink: 0;
  position: relative;
  .BodyMovin-container {
    $top-gap: 104px;
    position: absolute;
    left: 0;
    top: $top-gap;
    width: 100%;
    height: calc( 100% - #{$top-gap} );
    z-index: 5;
    &.animateCompleted {
      display: none;
    }
  }
  .main {
    width: 100%;
    .title {
      color: #424242;
      height: 28px;
      align-self: stretch;
      text-align: left;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.48px;
      margin-bottom: 40px;
    }
    .description {
      color: #424242;
      text-align: left;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.42px;
      margin-bottom: 40px;
    }
    .discount-box {
      margin-bottom: 40px;
      .discount-box-title {
        color: #424242;
        text-align: left;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.48px;
        margin-bottom: 12px;
      }
      .discount-box-input {
        background: #F5F7FA;
        display: flex;
        height: 56px;
        padding: 0 16px;
        justify-content: center;
        align-items: center;
        gap: 12px;
        align-self: stretch;
        .value {
          flex: 1 0 0;
          color: #616161;
          text-align: left;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.48px;
        }
        .divider {
          width: 1px;
          height: 20px;
          background-color: #C0C6D3;
        }
        .action-box {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          .q-icon {
            font-size: 24px;
            color: #616161;
            cursor: pointer;
          }
        }
      }
    }
    .banners {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 16px;
      align-self: stretch;
      :deep(.lazy-img) {
        width: 100%;
        align-self: stretch;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    .copy-right {
      color: #424242;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.36px;
      direction: rtl;
    }
    .logo {
      width: 129.14287px;
      height: 32px;
      display: flex;
      align-items: center;
    }
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {

  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
    width: 218px;
    height: 638px;
    padding: 24px;
    .BodyMovin-container {
      $top-gap: 56px;
      top: $top-gap;
      height: calc( 100% - #{$top-gap} );
    }
    .main {
      .title {
        margin-bottom: 16px;
      }
      .description {
        margin-bottom: 20px;
      }
      .discount-box {
        margin-bottom: 20px;
        .discount-box-title {
          margin-bottom: 8px;
        }
        .discount-box-input {
          display: flex;
          height: 92px;
          padding: 0 16px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          align-self: stretch;
          .value {
            height: 24px;
            max-height: 24px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
          .divider {
            width: 138px;
            height: 1px;
            background-color: #C0C6D3;
          }
          .action-box {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            .q-icon {
              font-size: 20px;
            }
          }
        }
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      align-self: stretch;
      .logo {
        width: 96.857px;
        height: 24px;
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }
    }
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
    width: 536px;
    height: auto;
    padding: 24px 24px 20px 24px;
    .main {
      margin-bottom: 24px;
      .title {
        margin-bottom: 4px;
        font-size: 14px;
        letter-spacing: -0.42px;
      }
      .description {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.36px;
      }
      .discount-box {
        .discount-box-title {
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          letter-spacing: -0.42px;
        }
        .discount-box-input {
          display: flex;
          height: 40px;
          padding: 0 16px;
          flex-flow: row;
          justify-content: center;
          align-items: center;
          gap: 16px;
          align-self: stretch;
          .value {
            height: 21px;
            max-height: 24px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .divider {
            width: 1px;
            height: 20px;
            background-color: #C0C6D3;
          }
          .action-box {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            .q-icon {
              font-size: 16px;
            }
          }
        }
      }
    }
    .footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      .logo {
        width: 129.14287px;
        height: 32px;
        margin-bottom: 0;
      }
    }
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
    width: 322px;
    padding: 24px 24px 20px 24px;
  }
}
</style>
