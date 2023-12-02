<template>
  <div class="expansion-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="expansion-title">
          Expansion Item
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-12 col-md-6 flex flex-center q-pa-md">
        <expansion-item-component label="متن عنوان اصلی" />
      </div>
      <div class="col-12 col-md-6 bg-grey-1 flex flex-center q-pa-md">
        <expansion-item-component :hasAction="true"
                                  icon="ph:question"
                                  label="متن عنوان اصلی"
                                  :grey="true">
          <template v-slot:action>متن ۱</template>
          <template v-slot:body>
            adsfasdfasdfasdfasdf
          </template>
        </expansion-item-component>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ExpansionItemComponent from 'src/components/Utils/ExpansionItem.vue'

export default defineComponent({
  name: 'ExpansionItem',
  components: {
    ExpansionItemComponent
  },
  data () {
    return {
      current: 1
    }
  }
})
</script>

<style lang="scss" scoped>
  .expansion-container {
    padding: 40px;
    background: #F5F7FA;

    .expansion-title {
      font-size: 28px;
    }
  }
</style>
