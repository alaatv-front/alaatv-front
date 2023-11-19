<template>
  <div class="row justify-center q-my-md new-theme">
    <div class="col-md-9">
      <h2>
        Dropdown
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
        <div class="col-md-4">sss
          <q-select v-model="selectedValue"
                    label="انتخاب کنید"
                    hint="متن راهنما"
                    clearable
                    outlined
                    :multiple="false"
                    placeholder="placeholder"
                    :options="options" />
        </div>
        <div class="col-md-4">
          <q-select v-model="selectedValue"
                    label=""
                    hint="متن راهنما"
                    disable
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <q-select v-model="selectedValue"
                    label="انتخاب کنید"
                    hint="متن راهنما"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <q-select v-model="value"
                    label="انتخاب کنید"
                    hint="متن راهنما"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4" />
        <div class="col-md-4">
          <q-select v-model="value"
                    label="انتخاب کنید"
                    hint="متن ارور"
                    :class="{'on-error' : errorMode}"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <q-select v-model="value"
                    label="انتخاب کنید"
                    hint="متن راهنما"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <q-select dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    hint="متن راهنما"
                    disable
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <q-select v-model="selectedValue"
                    label="انتخاب کنید"
                    hint="متن راهنما"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <q-select v-model="value"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    hint="متن راهنما"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4" />
        <div class="col-md-4">
          <q-select v-model="value"
                    label="انتخاب کنید"
                    hint="متن ارور"
                    :class="{'on-error' : errorMode}"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <q-select v-model="value"
                    hint="متن راهنما"
                    label="انتخاب کنید"
                    :options="options">
            <template v-slot:prepend>
              <q-icon name="ph:android-logo" />
            </template>
          </q-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      options: [
        'انتخاب 1',
        'انتخاب 2',
        'انتخاب 3'
      ],
      disabled: false,
      errorMode: true,
      value: '',
      selectedValue: 'آیتم انتخاب شده'
    }
  }
}
</script>
