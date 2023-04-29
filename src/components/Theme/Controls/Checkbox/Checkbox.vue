<template>
  <div class="checkbox-container">
    <div class="row">
      <div class="col-4">
        <div class="checkbox-group">
          <div class="group-title">
            default
          </div>
          <div class="with-title">
            <q-checkbox v-model="falseValue"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="trueValue"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="maybeValue"
                        left-label
                        label="عنوان" />
          </div>
          <div class="title-less">
            <q-checkbox v-model="falseValue"
                        left-label />
            <q-checkbox v-model="trueValue"
                        left-label />
            <q-checkbox v-model="maybeValue"
                        left-label />
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="checkbox-group">
          <div class="group-title">
            hover
          </div>
          <div class="with-title">
            <q-checkbox v-model="falseValue"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="trueValue"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="maybeValue"
                        left-label
                        label="عنوان" />
          </div>
          <div class="title-less">
            <q-checkbox v-model="falseValue"
                        left-label />
            <q-checkbox v-model="trueValue"
                        left-label />
            <q-checkbox v-model="maybeValue"
                        left-label />
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="checkbox-group">
          <div class="group-title">
            disable
          </div>
          <div class="with-title">
            <q-checkbox v-model="falseValue"
                        disable
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="trueValue"
                        disable
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="maybeValue"
                        disable
                        left-label
                        label="عنوان" />
          </div>
          <div class="title-less">
            <q-checkbox v-model="falseValue"
                        disable
                        left-label />
            <q-checkbox v-model="trueValue"
                        disable
                        left-label />
            <q-checkbox v-model="maybeValue"
                        disable
                        left-label />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Checkbox',
  data() {
    return {
      falseValue: false,
      trueValue: true,
      maybeValue: 'maybe'
    }
  }
})
</script>
