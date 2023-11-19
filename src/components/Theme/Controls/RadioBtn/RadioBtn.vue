<template>
  <div class="radio-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="radio-title">
          Radio Button
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-3">
        <div class="radio-group">
          <div class="group-title">
            default
          </div>
          <div class="with-title">
            <q-radio v-model="value"
                     left-label
                     :val="false"
                     label="عنوان" />
            <q-radio v-model="value"
                     :val="true"
                     left-label
                     label="عنوان" />
          </div>
          <div class="title-less">
            <q-radio v-model="value"
                     :val="false"
                     left-label />
            <q-radio v-model="value"
                     :val="true"
                     left-label />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="radio-group hover">
          <div class="group-title">
            hover
          </div>
          <div class="with-title">
            <q-radio v-model="value"
                     :val="false"
                     class="hovered"
                     left-label
                     label="عنوان" />
            <q-radio v-model="value"
                     :val="true"
                     class="hovered"
                     left-label
                     label="عنوان" />
          </div>
          <div class="title-less">
            <q-radio v-model="value"
                     :val="false"
                     class="hovered"
                     left-label />
            <q-radio v-model="value"
                     :val="true"
                     class="hovered"
                     left-label />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="radio-group">
          <div class="group-title">
            disable
          </div>
          <div class="with-title">
            <q-radio v-model="value"
                     :val="false"
                     disable
                     left-label
                     label="عنوان" />
            <q-radio v-model="value"
                     :val="true"
                     disable
                     left-label
                     label="عنوان" />
          </div>
          <div class="title-less">
            <q-radio v-model="value"
                     :val="false"
                     disable
                     left-label />
            <q-radio v-model="value"
                     :val="true"
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
      value: false
    }
  }
})
</script>

<style lang="scss" scoped>
.radio-container {
  padding: 40px 0;

  .radio-title {
    font-size: 28px;
  }
}
</style>
