<template>
  <div class="upload-information-wrapper">
    <div class="row">
      <div class="col-6 upload-publish-col">
        <form-builder ref="publishForm"
                      v-model:value="inputs" />
      </div>
      <div class="col-6 video-box-col">
        <div class="video-box">
          <div class="video-box-title" />
          <video-player class="video"
                        :sources="videoSource()"
                        :hlsSource="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'" />
        </div>
        <div class="link-box">
          <div class="link-title">لینک فیلم</div>
          <div class="link-url">office.alaa.tv.18080/c/createset+1897</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FormBuilder } from 'quasar-form-builder'
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'UploadPublish',
  components: {
    FormBuilder,
    VideoPlayer
  },
  data() {
    return {
      inputs: [
        {
          type: 'optionGroupRadio',
          responseKey: 'type',
          name: 'type',
          label: 'نوع محتوا',
          dense: 'false',
          options: [
            {
              value: 'free',
              label: 'رایگان'
            },
            {
              value: 'paid',
              label: 'پولی'
            }
          ],
          col: 'col-md-12'
        },
        {
          type: 'optionGroupRadio',
          responseKey: 'status',
          name: 'status',
          label: 'وضعیت انتشار',
          inline: 'true',
          dense: 'false',
          options: [
            {
              value: 'subscribed',
              label: 'خصوصی',
              caption: 'فقط شما و افراد منتخب می‌توانند ویدیو را مشاهده کنند'
            },
            {
              value: 'public',
              label: 'عمــومـی',
              caption: 'همه کاربران می‌توانند ویدیو را مشاهده کنند'
            },
            {
              value: 'timePlan',
              label: 'برنامه زمانی',
              caption: 'زمانی را برای انتشار ویدیوی خود انتخاب کنید'
            }
          ],
          col: 'col-md-12'
        },
        {
          type: 'hidden',
          responseKey: 'time',
          name: 'time',
          label: 'روز',
          col: 'col-md-6'
        },
        {
          type: 'hidden',
          responseKey: 'time',
          name: 'time',
          label: 'ساعت',
          col: 'col-md-6'
        }
      ]
    }
  },
  computed: {
    timePlan() {
      return this.inputs[1].value
    }
  },
  watch: {
    timePlan(value) {
      if (value === 'timePlan') {
        this.inputs[2].type = 'date'
        this.inputs[3].type = 'time'
      } else {
        this.inputs[2].type = 'hidden'
        this.inputs[3].type = 'hidden'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-information-wrapper {
  overflow-y: auto;
  max-height: 520px;

  .upload-publish-col {
    padding: 10px;
  }
  .video-box-col{
    padding: 10px;
    .video-box {
      width: 580px;
      height: 326.25px;
      background: #E9E9E9;
      display: flex;
      align-items: center;
      justify-content: center;

      .video-box-title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        color: #333333;
      }
    }
    .link-box {
      width: 580px;
      height: 80px;
      background: #F8F8F8;
      padding: 18px 40px;

      .link-title {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #363636;
      }

      .link-url {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #686868;
        cursor: pointer;
      }
    }
  }
}
</style>
