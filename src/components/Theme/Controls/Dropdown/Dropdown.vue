<template>
  <div class="q-pa-md">
    <div>Dropdown</div>
    <div class="outsideLabel"
         :class="{'disabled':disabled }">md عنوان </div>
    <q-select v-model="value"
              dropdown-icon="isax:arrow-down-1"
              placeholder="انتخاب کنید"
              class="select-md"
              bottom-slots
              :options="options"
              :loading="loading"
              :disabled="disabled"
              :class="{'disabled':disabled}">
      <template v-slot:hint>
        متن راهنما
      </template>
    </q-select>
    <div class="outsideLabel q-mt-md"
         :class="{'disabled':disabled}">lg عنوان </div>
    <q-select v-model="value"
              dropdown-icon="isax:arrow-down-1"
              placeholder="انتخاب کنید"
              class="select-lg"
              bottom-slots
              :options="options"
              :loading="loading"
              :disabled="disabled"
              :class="{'disabled':disabled, 'on-error' : errorMode}">
      <template v-slot:hint>
        <div class="select-error">
          متن ارور
        </div>
      </template>
    </q-select>
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
      loading: false,
      disabled: false,
      errorMode: true,
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
