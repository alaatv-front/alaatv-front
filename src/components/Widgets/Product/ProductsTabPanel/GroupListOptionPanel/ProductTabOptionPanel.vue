<template>
  <div class="option-panel-container">
    <div v-for="item in localData"
         :key="item">
      <div class="row">
        <div class="col-3">
          <q-input v-model="item.options.activeColor" />
        </div>
        <div class="col-3">
          <q-input v-model="item.options.activeBgColor" />
        </div>
        <div class="col-3">
          <q-input v-model="item.options.indicatorColor" />
        </div>
      </div>
      <recursive-component :options="item" />
    </div>
  </div>
<!--  <div class="row q-col-gutter-md">-->
<!--    <div class="col-md-6">-->
<!--      <div class="outSideLabel">-->
<!--        productGroupLayout-->
<!--      </div>-->
<!--      <q-radio v-model="localOptions.layout"-->
<!--               label="ProductTab"-->
<!--               val="ProductTab" />-->
<!--      <q-radio v-model="localOptions.layout"-->
<!--               label="ProductShelf"-->
<!--               val="ProductShelf" />-->
<!--    </div>-->
<!--  </div>-->
<!--  <div v-for="(item, index) in data"-->
<!--       :key="index">-->
<!--    <q-card class="custom-card">-->
<!--      <q-card-section>-->
<!--        <q-expansion-item expand-separator>-->
<!--          <template v-slot:header>-->
<!--            <q-btn color="negative"-->
<!--                   icon="close"-->
<!--                   class="q-mr-sm"-->
<!--                   @click="removeTabPanel(index)" />-->
<!--            <q-input v-model="item.options.label"-->
<!--                     autogrow-->
<!--                     class="full-width"-->
<!--                     label="label" />-->
<!--          </template>-->
<!--          <div v-if="item.type === 'GroupListOptionPanel'">-->

<!--            <div v-if="item.options.label === 'ProductShelf'">-->
<!--              <group-list-shelf-option-panel :data="item.data"-->
<!--                                             :options="item.options" />-->
<!--            </div>-->
<!--            <div v-else-if="item.options.label === 'ProductTab'">-->
<!--              <group-list-tab-option-panel :data="item.data"-->
<!--                                           :options="item.options" />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div v-else-if="item.type === 'ProductList'">-->
<!--            <div v-if="item.options.rowLayout === 'ScrollRow'">-->
<!--              <product-list-scroll-option-panel />-->
<!--            </div>-->
<!--            <div v-else-if="item.options.rowLayout === 'GridRow'">-->
<!--              <product-list-grid-option-panel />-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-expansion-item>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--  </div>-->
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'groupListTabOptionPanel',
  components: { recursiveComponent: defineAsyncComponent(() => import('../recursiveComponent.vue')) },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    localData: {
      get() {
        return this.data
      },
      set(newVal) {
        this.$emit('update:data', newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
