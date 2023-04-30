<template>
  <div class="row justify-center q-my-md">
    <div class="col-md-9">
      <h2>
        Text Input
      </h2>
      <div class="row text-center q-col-gutter-md">
        <div class="col-md-4">
          disable
        </div>
        <div class="col-md-4">
          default (fill)
        </div>
        <div class="col-md-4">
          default (empty)
        </div>
      </div>
      <div class="row text-center q-col-gutter-md">
        <div class="col-md-4" />
        <div class="col-md-4">
          error
        </div>
        <div class="col-md-4">
          active/focus
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   class="disable-input"
                   hint="متن راهنما"
                   disable />
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input1"
                   hint="متن راهنما"
                   label="متن ورودی" />
          <!--          <div class="help-text">متن راهنما</div>-->
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   hint="متن راهنما" />
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4" />
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input4"
                   hint="متن ارور مورد نظر"
                   :rules="[
                     val => (!!val)
                   ]"
                   lazy-rules
                   label="متن ورودی" />
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   hint="متن راهنما" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   class="largeInput"
                   hint="متن راهنما"
                   disable />
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input1"
                   class="largeInput"
                   hint="متن راهنما"
                   label="متن ورودی" />
          <!--          <div class="help-text">متن راهنما</div>-->
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   hint="متن راهنما"
                   class="largeInput" />
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4" />
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input4"
                   class="largeInput"
                   hint="متن ارور مورد نظر"
                   :rules="[
                     val => (!!val)
                   ]"
                   lazy-rules
                   label="متن ورودی" />
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   hint="متن راهنما"
                   class="largeInput" />
        </div>
      </div>

      <div class="row text-center q-col-gutter-md q-my-xl">
        <div class="col-md-4">
          error
        </div>
        <div class="col-md-4">active</div>
        <div class="col-md-4">
          default
        </div>
      </div>
      <div class="row q-my-lg text-center">
        <div class="col-md-12">
          <v-otp-input ref="otpInput"
                       v-model:value="bindModal"
                       class="otp-input"
                       input-classes="otp-input"
                       separator=""
                       :num-inputs="6"
                       :should-auto-focus="true"
                       input-type="letter-numeric"
                       :conditionalClass="['one', 'two', 'three', 'four','five','six']"
                       :placeholder="[]"
                       @on-change="handleOnChange"
                       @on-complete="handleOnComplete" />
          <!--          <div class="row justify-center">-->
          <!--            <q-input v-for="i in inputLength"-->
          <!--                     :key="i"-->
          <!--                     v-model="fieldValues[i - 1]"-->
          <!--                     maxlength="1"-->
          <!--                     v-bind="$attrs"-->
          <!--                     class="otp-input"-->
          <!--                     @keyup="onKeyUp($event, i - 1)" />-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VOtpInput from 'vue3-otp-input'

export default {
  name: 'TextInput',
  components: { VOtpInput },
  data() {
    return {
      input1: 'متن وارد شده',
      input4: '',
      bindModal: '000000',
      otpValue: null
    }
  },
  methods: {
    handleOnChange(value) {

    },
    handleOnComplete(value) {
      this.otpValue = value
    }
  }
}
</script>

<style scoped>

</style>
