<template>
  <div class="Postcard">
    <div class="action-area">
      <q-btn flat>
        <svg xmlns="http://www.w3.org/2000/svg"
             width="48"
             height="49"
             viewBox="0 0 48 49"
             fill="none">
          <g clip-path="url(#clip0_4067_2044)">
            <path d="M47.25 24.5116C47.25 37.3184 36.8139 47.75 24 47.75C11.1861 47.75 0.75 37.3184 0.75 24.5116C0.75 11.6811 11.1865 1.25 24 1.25C36.8135 1.25 47.25 11.6811 47.25 24.5116Z"
                  fill="#303030"
                  fill-opacity="0.12"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="3.8637" />
            <path d="M31.75 24.4999C31.7505 24.7121 31.6961 24.9208 31.5921 25.1058C31.488 25.2907 31.3379 25.4456 31.1562 25.5554L19.9 32.4413C19.7102 32.5575 19.4929 32.621 19.2704 32.6251C19.0479 32.6292 18.8283 32.5738 18.6344 32.4647C18.4423 32.3573 18.2822 32.2007 18.1708 32.0109C18.0593 31.8212 18.0003 31.6051 18 31.3851V17.6147C18.0003 17.3947 18.0593 17.1786 18.1708 16.9889C18.2822 16.7991 18.4423 16.6425 18.6344 16.5351C18.8283 16.426 19.0479 16.3706 19.2704 16.3747C19.4929 16.3788 19.7102 16.4423 19.9 16.5585L31.1562 23.4444C31.3379 23.5542 31.488 23.7091 31.5921 23.894C31.6961 24.079 31.7505 24.2877 31.75 24.4999Z"
                  fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_4067_2044">
              <rect width="48"
                    height="48"
                    fill="white"
                    transform="translate(0 0.5)" />
            </clipPath>
          </defs>
        </svg>
        <div class="text-of-btn">
          <div class="top-text">
            عنوان سوپرایز شماره 1
          </div>
          <div class="bottom-text">
            مشاهده ویدیو تبریک
          </div>
        </div>
      </q-btn>
    </div>
    <div class="poem">
      <div class="poem-title">
        {{ poemTitle }}
      </div>
      <div class="poem-body"
           v-html="poemBody" />
    </div>
    <div class="message">
      <div class="message-text"
           v-html="messageText" />
      <div class="message-from">
        {{ messageFrom }}
        - از طرف
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Postcard',
  props: {
    poemTitle: {
      type: String,
      default: ''
    },
    poemBody: {
      type: String,
      default: ''
    },
    messageText: {
      type: String,
      default: ''
    },
    messageFrom: {
      type: String,
      default: ''
    },
    backgrounds: {
      type: Object,
      default: () => {
        return {
          size1920: '',
          size1440: '',
          size1024: '',
          size600: '',
          size360: ''
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    backgroundUrls () {
      const items = {}
      Object.keys(this.backgrounds).forEach(key => {
        items[key] = 'url(' + this.backgrounds[key] + ')'
      })

      return items
    }
  }
})
</script>

<style lang="scss" scoped>
$backgrounds-size-1920: v-bind('backgroundUrls.size1920');
$backgrounds-size-1440: v-bind('backgroundUrls.size1440');
$backgrounds-size-1024: v-bind('backgroundUrls.size1024');
$backgrounds-size-600: v-bind('backgroundUrls.size600');
$backgrounds-size-360: v-bind('backgroundUrls.size360');

.Postcard {
  /* page > 1920 */
  width: 784px;
  height: 784px;
  position: relative;
  background-size: cover;
  background-image: $backgrounds-size-1920;
  .poem {
    position: absolute;
    width: 272px;
    top: 56px;
    left: 56px;
    padding-top: 16px;
    color: #FFF;
    font-family: IranNastaliq;
    .poem-title {
      text-align: center;
      font-size: 32px;
      font-style: normal;
      font-weight: 400;
      line-height: 48px; /* 150% */
      margin-bottom: 32px;
    }
    .poem-body {
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 48px; /* 200% */
    }
  }
  .action-area {
    position: absolute;
    width: max-content;
    height: 79px;
    top: 56px;
    right: 56px;
    :deep(.q-btn) {
      width: 100%;
      height: 100%;
      min-height: 100%;
      padding: 12px 16px;
      .q-focus-helper {
        opacity: 0;
      }
      .q-btn__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        $svg-width: 48px;
        svg {
          width: $svg-width;
          height: $svg-width;
        }
        .text-of-btn {
          width: calc( 100% - #{$svg-width} );
          padding-left: 12px;
          text-align: left;
          .top-text {
            color: #FFF;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: -0.54px;
            margin-bottom: 4px;
          }
          .bottom-text {
            color: #FFF;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.48px;
          }
        }
      }
    }
  }
  .message {
    position: absolute;
    width: 250px;
    bottom: 64px;
    left: 56px;
    padding-left: 8px;
    color: #FFF;
    .message-text {
      text-align: justify;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.48px;
      margin-bottom: 12px;
    }
    .message-from {
      text-align: left;
      font-feature-settings: 'clig' off, 'liga' off;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.48px;
    }
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {
    width: 784px;
    height: 784px;
    background-image: $backgrounds-size-1440;
    .poem {
      width: 272px;
      top: 56px;
      left: 56px;
      padding-top: 16px;
      .poem-title {
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 150% */
      }
      .poem-body {
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 200% */
      }
    }
    .action-area {
      height: 79px;
      top: 56px;
      right: 56px;
      :deep(.q-btn) {
        padding: 12px 16px;
        .q-btn__content {
          $svg-width: 48px;
          svg {
            width: $svg-width;
            height: $svg-width;
          }
          .text-of-btn {
            width: calc( 100% - #{$svg-width} );
            padding-left: 12px;
            .top-text {
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.54px;
              margin-bottom: 4px;
            }
            .bottom-text {
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.48px;
            }
          }
        }
      }
    }
    .message {
      width: 250px;
      bottom: 64px;
      left: 56px;
      text-align: justify;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.48px;
      .message-text {
        text-align: justify;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.48px;
      }
      .message-from {
        text-align: left;
        font-feature-settings: 'clig' off, 'liga' off;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.48px;
      }
    }
  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
    width: 540px;
    height: 638px;
    background-image: $backgrounds-size-1024;
    .poem {
      width: 227px;
      top: 40px;
      left: 32px;
      .poem-title {
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 200% */
        margin-bottom: 20px;
      }
      .poem-body {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px; /* 200% */
      }
    }
    .action-area {
      height: 79px;
      top: 48px;
      right: 32px;
      :deep(.q-btn) {
        .q-btn__content {
          .text-of-btn {
            .top-text {
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.54px;
              margin-bottom: 4px;
            }
            .bottom-text {
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.48px;
            }
          }
        }
      }
    }
    .message {
      width: 190px;
      height: 180px;
      bottom: 48px;
      left: 32px;
      padding-left: 4px;
      .message-text {
        text-align: justify;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.42px;
      }
      .message-from {
        font-feature-settings: 'clig' off, 'liga' off;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.42px;
      }
    }
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
    width: 536px;
    height: 654px;
    background-image: $backgrounds-size-600;
    .poem {
      padding-top: 0;
      width: 227px;
      top: 119px;
      left: 50%;
      transform: translateX(-50%);
      .poem-title {
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 200% */
        margin-bottom: 12px;
      }
      .poem-body {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 120% */
      }
    }
    .action-area {
      height: 55px;
      top: 40px;
      right: 50%;
      transform: translateX(50%);
      :deep(.q-btn) {
        padding: 8px 16px;
        .q-btn__content {
          $svg-width: 32px;
          svg {
            width: $svg-width;
            height: $svg-width;
          }
          .text-of-btn {
            width: calc( 100% - #{$svg-width} );
            padding-left: 8px;
            .top-text {
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.42px;
              margin-bottom: 0;
            }
            .bottom-text {
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.36px;
            }
          }
        }
      }
    }
    .message {
      width: 193px;
      height: 159px;
      bottom: 40px;
      left: 40px;
      padding-left: 0;
      .message-text {
        text-align: left;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.42px;
      }
      .message-from {
        text-align: left;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
    width: 320px;
    height: 704px;
    background-image: $backgrounds-size-360;
    .poem {
      width: 204px;
      top: 111px;
      left: 50%;
      transform: translateX(-50%);
      .poem-title {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 240% */
      }
      .poem-body {
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 133.333% */
      }
    }
    .action-area {
      height: 55px;
      top: 32px;
      right: 50%;
      transform: translateX(50%);
      :deep(.q-btn) {
        padding: 8px 16px;
        .q-btn__content {
          $svg-width: 32px;
          svg {
            width: $svg-width;
            height: $svg-width;
          }
          .text-of-btn {
            width: calc( 100% - #{$svg-width} );
            padding-left: 8px;
            .top-text {
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.42px;
              margin-bottom: 0;
            }
            .bottom-text {
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.36px;
            }
          }
        }
      }
    }
    .message {
      width: 256px;
      height: 102px;
      bottom: 275px;
      left: 50%;
      transform: translateX(-50%);
      .message-text {
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.36px;
      }
      .message-from {
        text-align: center !important;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
}
</style>
