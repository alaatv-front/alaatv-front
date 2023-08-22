<template>
  <div class="row justify-center q-my-md new-theme">
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

      <div class="row text-center q-col-gutter-md q-mb-lg q-mt-xl">
        <div class="col-md-4">
          error
        </div>
        <div class="col-md-4">active</div>
        <div class="col-md-4">
          default
        </div>
      </div>
      <div class="row q-my-md">
        <div class="col-md-4">
          <otp-input :input-length="6"
                     :error="true"
                     :hint="'کد اشتباه است لطفا مجددا امتحان کنید'" />
        </div>
        <div class="col-md-4">
          <otp-input :input-length="6" />
        </div>
        <div class="col-md-4">
          <otp-input :input-length="6" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OtpInput from 'components/OtpInput/OtpInput.vue'

export default {
  name: 'TextInput',
  components: { OtpInput },
  data() {
    return {
      input1: 'متن وارد شده',
      input4: ''
    }
  }
}
</script>

<style scoped>

</style>
