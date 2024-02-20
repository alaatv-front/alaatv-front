<template>
  <q-dialog :model-value="dialog"
            class="new-theme"
            persistent>
    <q-card class="form-card">
      <q-card-section class="form-header">
        <div class="header-title">
          <q-icon name="event_available"
                  color="positive"
                  class="q-mr-xs" />
          <div class="header-text">
            انتخاب برنامه مطالعاتی
          </div>
        </div>
        <div class="header-action">
          <q-btn v-close-popup
                 color="grey"
                 flat
                 square
                 icon="ph:x"
                 @click="toggleDialog(true)" />
        </div>
      </q-card-section>
      <q-card-section class="form-section">
        <div v-if="!studyPlanSelected"
             class="form-inputs-wrapper">
          <div class="form-title">
            برای شروع دوره باید برنامه مطالعاتی خودتو انتخاب کنی
          </div>
          <div class="form-inputs">
            <div class="row q-col-gutter-md">
              <div class="col-12 ">
                <q-select v-model="formData.study_method_id"
                          :options="inputsOptions.studyPlans"
                          :option-label="opt => opt.title"
                          :option-value="opt => opt.id"
                          placeholder="انتخاب کنید"
                          emit-value
                          map-options
                          label="برنامه"
                          outlined />
              </div>
              <div class="col-12 col-md-6 form-col">
                <q-select v-model="formData.grade_id"
                          :options="inputsOptions.grades"
                          :option-label="opt => opt.title"
                          :option-value="opt => opt.id"
                          label="مقطع"
                          placeholder="انتخاب کنید"
                          emit-value
                          map-options
                          outlined />
              </div>
              <div class="col-12 col-md-6">
                <q-select v-model="formData.major_id"
                          :options="inputsOptions.majors"
                          :option-label="opt => opt.title"
                          :option-value="opt => opt.id"
                          label="رشته"
                          placeholder="انتخاب کنید"
                          emit-value
                          map-options
                          outlined />
              </div>
            </div>
          </div>
        </div>
        <div v-else
             class="success-message">
          <div class="success-icon">
            <q-icon name="done"
                    color="positive"
                    size="132px" />
          </div>
          <div class="success-text">
            برنامه شما با موفقیت تنظیم شد؛ همچنین بعدا میتونید از قسمت برنامه مطالعاتی، اونو تنظیم کنید و یا تغییر بدین.
          </div>
        </div>
      </q-card-section>
      <q-card-actions v-if="!studyPlanSelected"
                      align="right">
        <q-btn v-close-popup
               label="انصراف"
               @click="toggleDialog(true)" />
        <q-btn label="تایید"
               color="positive"
               @click="submitStudyPlan" />
      </q-card-actions>
      <q-card-actions v-else
                      align="right">
        <q-btn v-close-popup
               label="متوجه شدم"
               color="positive"
               @click="toggleDialog(false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinTripleTitleSet, mixinAuth } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'StudyPlanSelectionDialog',
  mixins: [mixinTripleTitleSet, mixinAuth],
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleDialog', 'confirm'],
  data () {
    return {
      inputsOptions: {
        grades: [],
        majors: [],
        studyPlans: []
      },
      formData: {
        study_method_id: null,
        major_id: null,
        grade_id: null
      },
      studyPlanSelected: false
    }
  },
  methods: {
    afterSetEvent () {
      this.getOptions()
    },
    getOptions () {
      APIGateway.studyPlan.getSelectPlanOptions({ category_id: this.event.study_plan.category_id })
        .then(options => {
          this.inputsOptions = options
        })
        .catch(() => {})
    },
    submitStudyPlan () {
      APIGateway.studyPlan.updateMyStudyPlan(this.formData)
        .then(() => {
          this.studyPlanSelected = true
        })
        .catch(() => {})
    },
    toggleDialog (rout = false) {
      this.$emit('toggleDialog')
      if (rout) {
        this.$router.go(-1)
      }
    },
    onConfirm () {
      this.$emit('confirm')
    }
  }
})
</script>

<style lang="scss" scoped>
.form-card {
  width: 488px;
  padding: 24px;
  border-radius: 12px;
  background:#FFF;
  box-shadow: 0 2px 4px -2px rgb(16 24 40 / 6%), 0 4px 8px -2px rgb(16 24 40 / 10%);

  @media only screen and (width <= 600px) {
    width: 100%;
    padding: 10px;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px;

    .header-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;
    }
  }

  .form-section {
    padding: 20px 0;

    .form-inputs-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .form-title {
        text-align: left;
        color:#424242;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
        margin-bottom: 24px;
      }

      .form-inputs {
        width: 100%;

        .input-label {
          text-align: left;
          color:#424242;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.32px;
          margin-bottom: 8px;
        }
      }
    }

    .success-message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .success-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 48px;

        &:deep(.q-icon) {
          background-color: #E6F7F1 !important;
          border-radius: 50% !important;
        }
      }

      .success-text {
        color:#424242;
        text-align: justify;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}
</style>
