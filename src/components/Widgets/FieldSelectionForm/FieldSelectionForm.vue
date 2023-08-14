<template>
  <div class="FieldSelectionForm">
    <q-tabs v-model="step"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
      <q-tab name="konkurRankFormData"
             label="فرم ثبت رتبه کنکور" />
      <q-tab name="RegisterKonkurRankFormResult"
             label="نتیجه فرم ثبت رتبه کنکور" />
      <q-tab name="RegisterKonkurFieldSelectionProducts"
             label="فرم انتخاب محصول" />
      <q-tab name="RegisterKonkurFieldSelectionForm"
             label="فرم ثبت نام انتخاب رشته" />
      <q-tab name="RegisterKonkurFieldSelectionGoToPayment"
             label="رفتن به درگاه" />
      <q-tab name="RegisterKonkurFieldSelectionTankYouPage"
             label="نتیجه ثبت انتخاب رشته" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="step"
                  animated>
      <q-tab-panel name="konkurRankFormData">
        <register-konkur-rank-form :konkur-rank-form="konkurRankForm"
                                   @onComplete="onCompleteKonkurRankForm" />
      </q-tab-panel>
      <q-tab-panel name="RegisterKonkurRankFormResult">
        <register-konkur-rank-form-result @onGoEditKarname="onGoEditKarname"
                                          @onGoSelectionField="onGoSelectionFieldProduts" />
      </q-tab-panel>
      <q-tab-panel name="RegisterKonkurFieldSelectionProducts">
        <register-konkur-field-selection-products @onBack="onGoEditKarname"
                                                  @onForward="onGoSelectionFieldForm" />
      </q-tab-panel>
      <q-tab-panel name="RegisterKonkurFieldSelectionForm">
        <register-konkur-field-selection-form />
      </q-tab-panel>
      <q-tab-panel name="RegisterKonkurFieldSelectionGoToPayment">
        <register-konkur-field-selection-go-to-payment />
      </q-tab-panel>
      <q-tab-panel name="RegisterKonkurFieldSelectionTankYouPage">
        Register Konkur Field Selection Tank You Page
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EventResult } from 'src/models/EventResult.js'
import { EventekhbReshte } from 'src/models/EventekhbReshte.js'
import RegisterKonkurRankForm from './components/RegisterKonkurRankForm.vue'
import RegisterKonkurRankFormResult from './components/RegisterKonkurRankFormResult.vue'
import RegisterKonkurFieldSelectionForm from './components/RegisterKonkurFieldSelectionForm.vue'
import RegisterKonkurFieldSelectionProducts from './components/RegisterKonkurFieldSelectionProducts.vue'
import RegisterKonkurFieldSelectionGoToPayment from './components/RegisterKonkurFieldSelectionGoToPayment.vue'

export default {
  name: 'Newsletter',
  components: {
    RegisterKonkurRankForm,
    RegisterKonkurRankFormResult,
    RegisterKonkurFieldSelectionForm,
    RegisterKonkurFieldSelectionProducts,
    RegisterKonkurFieldSelectionGoToPayment
  },
  mixins: [mixinWidget],
  data() {
    return {
      step: 'RegisterKonkurFieldSelectionForm',
      konkurRankForm: new EventResult(),
      defaultOptions: {
        eventName: 'newsletter',
        verification: true,
        eventId: 13,
        products: [1239, 1240, 1241, 1242, 1243],
        userInputs: {
          first_name: true,
          last_name: true,
          major: true,
          grade: true
        }
      }
    }
  },
  mounted() {
    // this.showProperForm()
  },
  methods: {
    showProperForm () {
      return new Promise((resolve, reject) => {
        this.checkHasPurchased(resolve, reject)
      })
    },
    checkHasPurchased (resolve, reject) {
      this.hasPurchased()
        .then((hasPurchased) => {
          this.checkKonkurResultFormData(hasPurchased, resolve, reject)
        })
        .catch(() => {
          reject()
        })
    },
    checkKonkurResultFormData (hasPurchased, resolve, reject) {
      if (hasPurchased) {
        this.step = 'RegisterKonkurFieldSelectionTankYouPage'
      } else {
        this.getKonkurResultFormData()
          .then((eventResult) => {
            this.checkFieldSelectionFormData(eventResult, resolve, reject)
          })
          .catch(() => {
            reject()
          })
      }
    },
    checkFieldSelectionFormData (eventResult, resolve, reject) {
      if (eventResult.id) {
        this.getFieldSelectionFormData()
          .then((eventekhbReshte) => {
            if (eventekhbReshte.id) {
              this.step = 'RegisterKonkurFieldSelectionGoToPayment'
            } else {
              this.step = 'RegisterKonkurFieldSelectionForm'
            }
          })
          .catch(() => {
            reject()
          })
      } else {
        this.step = 'konkurRankFormData'
      }
    },
    hasPurchased () {
      return new Promise((resolve, reject) => {
        APIGateway.user.hasPurchased(this.localOptions.products)
          .then((items) => {
            // ToDo: fake data
            // const hasPurchased = items.find(item => item.is_purchased === 1)
            // resolve(hasPurchased)
            resolve(false)
          })
          .catch(() => {
            reject()
          })
      })
    },
    getKonkurResultFormData () {
      return new Promise((resolve, reject) => {
        this.konkurRankForm.loading = true
        APIGateway.user.getEventResult(this.localOptions.eventId)
          .then((eventResult) => {
            // ToDo: fake data
            // this.konkurRankForm = new EventResult(eventResult)
            this.konkurRankForm = new EventResult()
            this.konkurRankForm.loading = false
            resolve(this.konkurRankForm)
          })
          .catch(() => {
            this.konkurRankForm.loading = false
            reject()
          })
      })
    },
    getFieldSelectionFormData () {
      return new Promise((resolve, reject) => {
        APIGateway.user.getEntekhabReshte()
          .then((eventekhbReshte) => {
            resolve(new EventekhbReshte(eventekhbReshte))
          })
          .catch(() => {
            reject()
          })
      })
    },
    onCompleteKonkurRankForm () {
      this.getKonkurResultFormData()
      this.onGoSelectionField()
    },
    onGoEditKarname () {
      this.step = 'konkurRankFormData'
    },
    onGoSelectionFieldProduts () {
      this.step = 'RegisterKonkurFieldSelectionProducts'
    },
    onGoSelectionFieldForm () {
      this.step = 'RegisterKonkurFieldSelectionForm'
    }
  }
}
</script>

<style lang="scss" scoped>
.FieldSelectionForm{
  :deep(.q-tab-panels) {
    background: transparent;
    .title-text {
      color: #424242;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.36px;
    }
    .content-text {
      color: #424242;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.28px;
    }
    .caption-text {
      color: #9E9E9E;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.24px;
    }
    .state-photo {
      width: 200px;
      height: 200px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 64px;
    }
    .q-field {
      .q-field__inner {
        .q-field__control {
          .q-field__append {
            .q-icon {
              color: #9E9E9E;
            }
          }
        }
      }
    }
    .q-btn:not(.accept-btn) {
      color: #424242 !important;
    }
    .q-radio {
      .q-radio__inner--truthy {
        color: #4DB6AC !important;
      }
    }
    .q-checkbox {
      .q-checkbox__inner {
        .q-checkbox__bg {
          color: #4DB6AC !important;
        }
        &.q-checkbox__inner--truthy {
          .q-checkbox__bg {
            background: #4DB6AC !important;
            border-color: #4DB6AC !important;
          }
        }
      }
    }
    .q-banner {
      border-radius: 6px;
      border-width: 1px;
      border-style: solid;
      color: #424242;
      .q-banner__avatar {
        margin: 8px 4px;
      }
      &.bg-success {
        border-color: #9DDEC7;
        background: #E6F7F1;
        .q-icon {
          color: #09AC73;
        }
      }
    }
  }
  :deep(.entity-crud-formBuilder) {
    .form-builder-separator-col {
      .form-builder-separator {
        color: #757575;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
        position: relative;
        width: 100%;
        display: flex;
        margin-top: 24px;
        margin-bottom: 8px;
        &:after {
          content: ' ';
          position: relative;
          border-bottom: solid 0.5px #BDBDBD;
          left: 0;
          bottom: 10px;
          width: 100%;
        }
        b {
          width: max-content;
          white-space: nowrap;
          padding-right: 16px;
        }
      }
    }
    .outsideLabel {
      color: #424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.32px;
    }
    .q-field {
      border-radius: 8px;
      .q-field__inner {
        .q-field__control {
          padding: 0;
          &:before {
            border: 1.5px solid #E0E0E0;
          }
          .q-field__control-container {
            .q-field__native {
              padding: 9px 16px 10px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
