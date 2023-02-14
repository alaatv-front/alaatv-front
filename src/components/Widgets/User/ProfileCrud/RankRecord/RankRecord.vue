<template>
  <entity-action ref="entityAction"
                 v-model:value="actionInput"
                 :action-method="'post'"
                 :action-api="actionApi"
                 :beforeDoAction="beforeDoAction"
                 :defaultLayout="false"
                 @onActionSuccess="onActionSuccess"
                 @onActionError="onActionError">
    <template #after-form-builder>
      <div class="col-12 q-my-md flex justify-end">
        <q-btn class="submitBtn"
               label="ثبت رتبه کنکور"
               @click="submitAction" />
      </div>
    </template>
  </entity-action>
</template>

<script>
import { EntityAction } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'RankRecord',
  components: { EntityAction },
  data() {
    return {
      actionInput: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12 custom-card  q-mt-md',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'ثبت رتبه کنکور',
              col: 'col-md-12 title'
            },
            {
              type: 'select',
              name: 'major',
              label: 'رشته شما',
              placeholder: 'انتخاب نمایید',
              responseKey: 'data.major',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-md-6'
            },
            {
              type: 'select',
              name: 'region',
              label: 'منطقه یا سهمیه',
              placeholder: 'انتخاب نمایید',
              responseKey: 'data.region',
              optionLabel: 'name',
              options: [
                {
                  id: 1,
                  name: 'منطقه ۱',
                  title: 'منطقه ۱'
                },
                {
                  id: 2,
                  name: 'منطقه ۲',
                  title: 'منطقه ۲'
                },
                {
                  id: 3,
                  name: 'منطقه ۳',
                  title: 'منطقه ۳'
                },
                {
                  id: 4,
                  name: 'شاهد',
                  title: 'شاهد'
                },
                {
                  id: 5,
                  name: 'هیئت علمی',
                  title: 'هیئت علمی'
                }
              ],
              outlined: true,
              multiple: false,
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'rank',
              responseKey: 'data.rank',
              label: 'رتبه شما در منطقه',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'participationCode',
              responseKey: 'data.participationCode',
              label: 'شماره داوطلبی شما',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'file',
              name: 'reportFile',
              responseKey: 'data.reportFile',
              label: 'آپلود فایل کارنامه',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
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
      actionApi: API_ADDRESS.user.eventresult
    }
  },
  mounted() {
    this.$store.commit('loading/loading', true)
    this.$refs.entityAction
      .getAxiosPromise('get', this.actionApi)
      .then((d) => {
        this.$store.commit('loading/loading', false)
      })
      .catch((e) => {
        this.$store.commit('loading/loading', false)
      })
  },
  methods: {
    beforeDoAction(d) {
      if (d.major) {
        d.major_id = d.major.id
      }
      if (d.region) {
        d.region_id = d.region.id
      }
      this.$axios
        .get(API_ADDRESS.user.eventresult)
        .then((response) => {
          // TODO: Since  eventresult has not been implemented,
          // completing this part will be done after getting this from BackEnd
        })
    },
    onActionSuccess() {
      this.$store.commit('loading/loading', false)
    },
    onActionError() {
      this.$store.commit('loading/loading', false)
    },
    submitAction() {
      this.$store.commit('loading/loading', true)

      this.$refs.entityAction.doAction()
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
