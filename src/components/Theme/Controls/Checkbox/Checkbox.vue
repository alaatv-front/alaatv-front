<template>
  <div class="checkbox-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="checkbox-title">
          Checkbox
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-3">
        <div class="checkbox-group">
          <div class="group-title">
            default
          </div>
          <div class="with-title">
            <q-checkbox v-model="falseValue"
                        color="secondary"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="trueValue"
                        color="secondary"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="maybeValue"
                        left-label
                        color="secondary"
                        label="عنوان" />
          </div>
          <div class="title-less">
            <q-checkbox v-model="falseValue"
                        color="secondary"
                        left-label />
            <q-checkbox v-model="trueValue"
                        color="secondary"
                        left-label />
            <q-checkbox v-model="maybeValue"
                        color="secondary"
                        left-label />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="checkbox-group hover">
          <div class="group-title">
            hover
          </div>
          <div class="with-title">
            <q-checkbox v-model="falseValue"
                        color="secondary"
                        class="hovered"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="trueValue"
                        color="secondary"
                        class="hovered"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="maybeValue"
                        color="secondary"
                        class="hovered"
                        left-label
                        label="عنوان" />
          </div>
          <div class="title-less">
            <q-checkbox v-model="falseValue"
                        color="secondary"
                        class="hovered"
                        left-label />
            <q-checkbox v-model="trueValue"
                        color="secondary"
                        class="hovered"
                        left-label />
            <q-checkbox v-model="maybeValue"
                        color="secondary"
                        class="hovered"
                        left-label />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="checkbox-group">
          <div class="group-title">
            disable
          </div>
          <div class="with-title">
            <q-checkbox v-model="falseValue"
                        color="secondary"
                        disable
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="trueValue"
                        color="secondary"
                        disable
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="maybeValue"
                        color="secondary"
                        disable
                        left-label
                        label="عنوان" />
          </div>
          <div class="title-less">
            <q-checkbox v-model="falseValue"
                        color="secondary"
                        disable
                        left-label />
            <q-checkbox v-model="trueValue"
                        color="secondary"
                        disable
                        left-label />
            <q-checkbox v-model="maybeValue"
                        color="secondary"
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
  data () {
    return {
      falseValue: false,
      trueValue: true,
      maybeValue: 'maybe'
    }
  }
})
</script>
