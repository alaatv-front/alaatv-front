<template>
  <q-dialog :model-value="dialog"
            persistent>
    <q-card class="custom-card signup-dialog-card">
      <q-card-section>
        <q-btn color="primary"
               flat
               icon="close"
               @click="toggleDialog" />
      </q-card-section>
      <q-card-section>
        <q-stepper ref="stepper"
                   v-model="step"
                   color="primary"
                   flat
                   header-class="stepper-fire-day-landing-header-less"
                   class="signup-dialog-stepper"
                   animated>
          <q-step :name="'signup'"
                  title="signup">
            <signup-step @gotoNextStep="gotoNextStep" />
          </q-step>
          <q-step v-if="verification"
                  :name="'verification'"
                  title="verification">
            <verification-step @gotoNextStep="gotoNextStep"
                               @gotoPrevStep="gotoPrevStep" />
          </q-step>
          <q-step :name="'info'"
                  title="info">
            <info-completion :options="options.userInputs"
                             @gotoPrevStep="gotoPrevStep" />
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import SignupStep from './SignupStep.vue'
import VerificationStep from './VerificationStep.vue'
import InfoCompletion from './InfoCompletion.vue'

export default {
  name: 'SignupModal',
  components: {
    SignupStep,
    VerificationStep,
    InfoCompletion
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialog: false,
      eventName: '',
      step: 'signup',
      verification: true
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
    this.$bus.on(this.eventName, this.toggleDialog)
  },
  methods: {
    loadConfig() {
      this.verification = this.options.verification
      this.eventName = this.options.eventName ? this.options.eventName : 'newsletter'
    },
    toggleDialog() {
      this.dialog = !this.dialog
    },
    gotoNextStep() {
      this.$refs.stepper.next()
    },
    gotoPrevStep() {
      this.$refs.stepper.previous()
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-dialog-card{
  width: 432px;
  height: 487px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

  &:deep(.q-stepper__header) {
    display: none !important;
  }
  &:deep(.q-stepper__step-inner) {
    padding: 0 !important;
  }
}

</style>
