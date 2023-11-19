<template>
  <div class="row justify-center q-my-md new-theme bg-white">
    <div class="col-md-9">
      <h2>
        Text Input
      </h2>
      <div class="row text-center q-col-gutter-md">
        <div class="col-md-4">
          fill
        </div>
        <div class="col-md-4">
          default (emoty/icon)
        </div>
        <div class="col-md-4">
          default (empty /text)
        </div>
      </div>
      <div class="row text-center q-col-gutter-md">
        <div class="col-md-4">
          error
        </div>
        <div class="col-md-4">
          active/focus
        </div>
        <div class="col-md-4">
          disable
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="Label (stacked)"
                   placeholder="placeholder"
                   hint="hint" />
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   error
                   label="error"
                   placeholder="placeholder"
                   hint="hint" />
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   error
                   label="append with error"
                   placeholder="placeholder"
                   hint="hint">
            <template #append>
              append
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="append icon"
                   placeholder="placeholder"
                   hint="hint">
            <template #append>
              <q-icon name="ph:apple-logo" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="prepend icon"
                   placeholder="placeholder"
                   hint="hint">
            <template #prepend>
              <!--              <q-btn flat-->
              <!--                     icon="ph:telegram-logo" />-->
              <q-icon name="ph:telegram-logo" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="append prepend icon"
                   placeholder="placeholder"
                   hint="hint">
            <template #append>
              <q-icon name="ph:apple-logo" />
              <q-icon name="ph:apple-logo" />
            </template>
            <template #prepend>
              <q-icon name="ph:apple-logo" />
              <q-icon name="ph:apple-logo" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="append button"
                   placeholder="placeholder"
                   hint="hint">
            <template #append>
              <q-btn flat
                     icon="ph:apple-logo" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="prepend button"
                   placeholder="placeholder"
                   hint="hint">
            <template #prepend>
              <q-btn square
                     flat
                     icon="ph:telegram-logo" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="append prepend button"
                   placeholder="placeholder"
                   hint="hint">
            <template #append>
              <q-btn flat
                     icon="ph:telegram-logo" />
              <q-btn flat
                     icon="ph:telegram-logo" />
            </template>
            <template #prepend>
              <q-btn flat
                     icon="ph:apple-logo" />
              <q-btn flat
                     icon="ph:apple-logo" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="after"
                   placeholder="placeholder"
                   hint="hint">
            <template #after>
              <q-btn>
                after
              </q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="before"
                   placeholder="placeholder"
                   hint="hint">
            <template #before>
              <q-btn>
                before
              </q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="after before"
                   placeholder="placeholder"
                   hint="hint">
            <template #after>
              <q-btn>
                after
              </q-btn>
            </template>
            <template #before>
              <q-btn>
                before
              </q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   disable
                   label="disable"
                   placeholder="placeholder"
                   hint="hint"
                   stack-label />
        </div>
        <div class="col-md-4">
          <q-input v-model="input1"
                   label="Label (stacked)"
                   placeholder="placeholder"
                   hint="hint"
                   stack-label />
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input1"
                   label="متن ورودی"
                   class="field-md"
                   hint="متن راهنما" />
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input1"
                   hint="متن راهنما"
                   label="متن ورودی"
                   class="field-md">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="unfold_more"
                      size="sm" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   hint="متن راهنما"
                   class="field-md">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              تومان
            </template>
          </q-input>
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input4"
                   label="متن ورودی"
                   class="field-md q-field--error"
                   :rules="[
                     val => (!!val || 'متن ارور مورد نظر')
                   ]"
                   lazy-rules
                   hint="متن راهنما">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="unfold_more"
                      size="sm" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input4"
                   hint="متن راهنما"
                   label="متن ورودی"
                   class="field-md q-field--focused q-field--float">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="unfold_more"
                      size="sm" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel disabled">عنوان</div>
          <q-input label="متن ورودی"
                   class="field-md"
                   disable
                   hint="متن راهنما" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input1"
                   label="متن ورودی"
                   class="field-lg"
                   hint="متن راهنما" />
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input1"
                   class="field-lg"
                   hint="متن راهنما"
                   label="متن ورودی" />
          <!--          <div class="help-text">متن راهنما</div>-->
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input label="متن ورودی"
                   hint="متن راهنما"
                   class="field-lg" />
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input4"
                   label="متن ورودی"
                   class="field-lg q-field--error"
                   :rules="[
                     val => (!!val || 'متن ارور مورد نظر')
                   ]"
                   lazy-rules
                   hint="متن راهنما">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="unfold_more"
                      size="sm" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-input v-model="input4"
                   hint="متن راهنما"
                   label="متن ورودی"
                   class="field-lg q-field--focused q-field--float">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="unfold_more"
                      size="sm" />
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel disabled">عنوان</div>
          <q-input label="متن ورودی"
                   hint="متن راهنما"
                   disable
                   class="field-lg" />
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
