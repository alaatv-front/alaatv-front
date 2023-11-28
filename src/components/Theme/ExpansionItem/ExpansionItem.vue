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
        <expansion-item-component />
      </div>
      <div class="col-12 col-md-6 bg-grey-1 flex flex-center q-pa-md">
        <expansion-item-component :hasAction="true"
                                  :grey="true">
          <template v-slot:action>متن ۱</template>
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
