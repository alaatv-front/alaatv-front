<template>
  <entity-create ref="EntityCreate"
                 v-model:value="actionInput"
                 :api="api"
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
              placeholder: 'انتخاب نمایید',
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
              placeholder: 'انتخاب نمایید',
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
              placeholder: 'انتخاب نمایید',
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
              placeholder: 'وارد نمایید',
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
    beforeDoAction(d) {
      if (d.events) {
        d.event_id = d.event.id
      }
      if (d.major) {
        d.major_id = d.major.id
      }
      if (d.region) {
        d.region_id = d.region.id
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
:deep(.title) {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.03em;
  color: #333333;
  margin-top: 20px;
}

.submitBtn {
  width: 189px;
  background: #ffc107;
  box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
  border-radius: 8px;
  color: white;
}

:deep(.outsideLabel) {
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  margin-bottom: 11px;
}

:deep(.q-field--labeled .q-field__native) {
  padding-top: 0;
  padding-bottom: 0;
  color: #aeaeae;

  &:focus {
    color: black;
  }
}

:deep(.q-field__inner) {
  background: #f6f7f9;
  border-radius: 8px;
}

:deep(.q-field--auto-height.q-field--labeled .q-field__control-container) {
  padding-top: 0;
  color: #aeaeae;

  &:focus {
    color: black;
  }
}

:deep(.q-field__control) {
  color: #ffc107;
  height: 48px;
}

:deep(.q-input) {
  border: 0px solid #f6f7f9;
  border-radius: 8px;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: 0px;
  height: 48px !important;
}

:deep(.q-field) {
  height: 48px !important;
}

:deep(.q-field__append) {
  height: 48px !important;
}
</style>
