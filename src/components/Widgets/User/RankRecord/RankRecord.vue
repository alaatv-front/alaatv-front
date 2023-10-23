<template>
  <entity-create ref="EntityCreate"
                 v-model:value="actionInput"
                 :api="api"
                 :before-send-data="beforeSendData"
                 :after-send-data="afterSendData"
                 :default-layout="false">
    <template #after-form-builder>
      <div class="col-12 q-my-md flex justify-end">
        <q-btn class="submitBtn"
               label="ثبت رتبه کنکور"
               @click="submitAction" />
      </div>
    </template>
  </entity-create>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'RankRecord',
  components: { EntityCreate },
  data() {
    return {
      actionInput: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12 custom-card q-mt-md',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'ثبت رتبه کنکور',
              col: 'col-xs-12 title'
            },
            {
              type: 'select',
              name: 'event_id',
              label: 'رویداد',
              responseKey: 'data.events',
              optionLabel: 'title',
              optionValue: 'id',
              options: [],
              outlined: true,
              multiple: false,
              col: 'col-xs-6'
            },
            {
              type: 'select',
              name: 'major_id',
              label: 'رشته شما',
              responseKey: 'data.major',
              optionLabel: 'name',
              optionValue: 'id',
              options: [],
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'select',
              name: 'region_id',
              label: 'منطقه یا سهمیه',
              responseKey: 'data.region',
              optionLabel: 'title',
              optionValue: 'id',
              options: [],
              outlined: true,
              multiple: false,
              col: 'col-xs-6'
            },
            {
              type: 'input',
              name: 'rank',
              responseKey: 'data.rank',
              label: 'رتبه شما در منطقه',
              outlined: true,
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'input',
              name: 'participationCode',
              responseKey: 'data.participationCode',
              label: 'شماره داوطلبی شما',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6'
            },
            {
              type: 'file',
              name: 'reportFile',
              label: 'آپلود فایل کارنامه',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'checkbox',
              name: 'enableReportPublish',
              responseKey: 'data.enableReportPublish',
              label: 'اجازه انتشار رتبه خود را در سایت میدهم',
              outlined: true,
              placeholder: 'وارد نمایید',
              value: false,
              col: 'col-md-12'
            }
          ]
        }
      ],
      api: APIGateway.user.APIAdresses.eventResult
    }
  },
  mounted() {
    this.$store.commit('loading/loading', true)
    APIGateway.user.createEventResult()
      .then((eventResult) => {
        this.$refs.EntityCreate.setInputAttributeByName('event_id', 'options', eventResult.events)
        this.$refs.EntityCreate.setInputAttributeByName('major_id', 'options', eventResult.majors)
        this.$refs.EntityCreate.setInputAttributeByName('region_id', 'options', eventResult.regions)
        this.$store.commit('loading/loading', false)
        this.getRankRecord()
      })
      .catch((e) => {
        this.$store.commit('loading/loading', false)
      })
  },
  methods: {
    getRankRecord() {
      APIGateway.user.eventResult()
        .then(eventResult => {
          const firstEventResult = eventResult[0]
          if (firstEventResult) {
            this.$refs.EntityCreate.setInputAttributeByName('event_id', 'value', firstEventResult.event)
            this.$refs.EntityCreate.setInputAttributeByName('major_id', 'value', firstEventResult.major)
            this.$refs.EntityCreate.setInputAttributeByName('region_id', 'value', firstEventResult.region)
            this.$refs.EntityCreate.setInputAttributeByName('rank', 'value', firstEventResult.rank)
            this.$refs.EntityCreate.setInputAttributeByName('enableReportPublish', 'value', firstEventResult.enable_report_publish === 1)
          }
        })
        .catch()
    },
    afterSendData() {
      this.$store.commit('loading/loading', false)
    },
    beforeSendData(formData) {
      const isPublished = formData.get('enableReportPublish')
      if (isPublished) {
        formData.set('enableReportPublish', 1)
      } else {
        formData.set('enableReportPublish', 0)
      }
    },
    onActionSuccess() {
      this.$store.commit('loading/loading', false)
    },
    onActionError() {
      this.$store.commit('loading/loading', false)
    },
    submitAction() {
      this.$store.commit('loading/loading', true)

      this.$refs.EntityCreate.createEntity()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
