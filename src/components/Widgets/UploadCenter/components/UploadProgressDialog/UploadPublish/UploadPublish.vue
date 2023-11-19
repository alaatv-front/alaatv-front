<template>
  <div class="upload-information-wrapper">
    <loading-content-in-step v-if="content.loading" />
    <div v-else
         class="row">
      <div class="col-6 upload-publish-col">
        <form-builder ref="publishForm"
                      v-model:value="inputs" />
      </div>
      <div class="col-6 video-box-col">
        <div class="video-box">
          <div class="video-box-title" />
          <video-player :source="content.getVideoSource()" />
        </div>
        <div class="link-box">
          <div class="link-title">لینک فیلم</div>
          <div class="link-url">{{content.stream.webm}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FormBuilder } from 'quasar-form-builder'
import VideoPlayer from 'src//components/ContentVideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import LoadingContentInStep
  from 'components/Widgets/UploadCenter/components/UploadProgressDialog/LoadingContentInStep.vue'

export default {
  name: 'UploadPublish',
  components: {
    LoadingContentInStep,
    FormBuilder,
    VideoPlayer
  },
  props: {
    content: Object,
    default: () => {}
  },
  emits: ['updateFormData'],
  data () {
    return {
      inputs: [
        {
          type: 'optionGroupRadio',
          responseKey: 'is_free',
          name: 'isFree',
          label: 'نوع محتوا',
          dense: 'false',
          options: [
            {
              value: 1,
              label: 'رایگان'
            },
            {
              value: 0,
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
          responseKey: 'date',
          name: 'date',
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
    timePlan () {
      return this.inputs[1].value
    },
    formData () {
      return {
        isFree: this.inputs[0].value,
        enable: this.inputs[1].value === 'public' || this.inputs[1].value === 'timePlan' ? 1 : 0,
        ...(this.inputs[1].value === 'timePlan' && { validSinceDate: `${this.inputs[2].value + ' ' + this.inputs[3].value}` })
      }
    }
  },
  watch: {
    timePlan (value) {
      if (value === 'timePlan') {
        this.inputs[2].type = 'date'
        this.inputs[3].type = 'time'
      } else {
        this.inputs[2].type = 'hidden'
        this.inputs[3].type = 'hidden'
      }
    },
    formData (value) {
      this.$emit('updateFormData', value)
    }
  },
  mounted () {
    this.$refs.publishForm.setInputValues(this.content, this.inputs)
  },
  methods: {
    videoSource () {
      return new PlayerSourceList(this.content.file.video)
    },
    publish () {
      const values = this.$refs.publishForm.getValues()
      const type = values.find(x => x.name === 'isFree').value
      const status = values.find(x => x.name === 'status').value
      const formData = {
        id: this.content.id,
        isFree: type,
        enable: status === 'public' || status === 'timePlan' ? 1 : 0,
        ...(status === 'timePlan' && { validSinceDate: values.find(x => x.name === 'date').value + values.find(x => x.name === 'time').value })
      }
      return formData
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
        color: #333;
      }

      .video {
        width: 100%;
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
