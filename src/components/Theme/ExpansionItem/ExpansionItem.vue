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
        <expansion-item-component label="متن عنوان اصلی">

          <q-item>
            <q-item-section top
                            avatar>
              <q-avatar color="primary"
                        text-color="white"
                        icon="bluetooth" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption
                            lines="2">Secondary line text.</q-item-label>
            </q-item-section>
            <q-item-section side
                            top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star"
                      color="yellow" />
            </q-item-section>
          </q-item>
        </expansion-item-component>
      </div>
      <div class="col-12 col-md-6 bg-grey-1 flex flex-center q-pa-md">
        <expansion-item-component :hasAction="true"
                                  icon="ph:question"
                                  label="متن عنوان اصلی"
                                  :grey="true">
          <template v-slot:action>
            متن ۱
          </template>
          test

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
