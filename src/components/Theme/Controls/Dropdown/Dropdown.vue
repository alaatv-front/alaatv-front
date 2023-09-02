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
        <div class="col-md-4">
          <div class="outsideLabel disabled">عنوان</div>
          <q-select dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-md"
                    bottom-slots
                    disable
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="selectedValue"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-md"
                    bottom-slots
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="value"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-md"
                    bottom-slots
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4" />
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="value"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-md"
                    bottom-slots
                    :class="{'on-error' : errorMode}"
                    :options="options">
            <template v-slot:hint>
              متن ارور
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="value"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-md"
                    bottom-slots
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-lg"
                    bottom-slots
                    disable
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="selectedValue"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-lg"
                    bottom-slots
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="value"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-lg"
                    bottom-slots
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-lg">
        <div class="col-md-4" />
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="value"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-lg"
                    bottom-slots
                    :class="{'on-error' : errorMode}"
                    :options="options">
            <template v-slot:hint>
              متن ارور
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <div class="outsideLabel">عنوان</div>
          <q-select v-model="value"
                    dropdown-icon="isax:arrow-down-1"
                    label="انتخاب کنید"
                    class="field-lg"
                    bottom-slots
                    :options="options">
            <template v-slot:hint>
              متن راهنما
            </template>
            <template v-slot:prepend>
              <q-icon name="isax:arrow-down-1" />
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

<style scoped>

</style>
