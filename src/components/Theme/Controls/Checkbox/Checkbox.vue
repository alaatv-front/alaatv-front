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
      <div class="col-md-3">
        <div class="checkbox-group hover">
          <div class="group-title">
            hover
          </div>
          <div class="with-title">
            <q-checkbox v-model="falseValue"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="trueValue"
                        class="true"
                        left-label
                        label="عنوان" />
            <q-checkbox v-model="maybeValue"
                        class="true"
                        left-label
                        label="عنوان" />
          </div>
          <div class="title-less">
            <q-checkbox v-model="falseValue"
                        left-label />
            <q-checkbox v-model="trueValue"
                        class="true"
                        left-label />
            <q-checkbox v-model="maybeValue"
                        class="true"
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

<style lang="scss" scoped>
.checkbox-container {
  margin: 40px 0 20px;
  padding: 40px 0;
  background: #ffffff;

  .checkbox-title {
    font-size: 28px;
    font-weight: 300;
    line-height: 3.75rem;
    letter-spacing: -0.00833em;
  }
  .checkbox-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.hover {

      &:deep(.q-checkbox){

        &.true{
          .q-checkbox__inner{
            border-radius: 4px !important;
            background: rgba($color: $primary, $alpha: .15);
          }
        }
        .q-checkbox__inner{
          border-radius: 4px !important;
          background: #F5F5F5;
        }
      }
    }

    .with-title {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-bottom: 10px;
    }

    .title-less {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }
}
</style>
