<template>
  <div class="option-panel-container">
    <div v-for="item in item"
         :key="item">
      <div class="row">
        <div class="col-6">
          <q-input v-model="item.label" />
        </div>
      </div>
      <recursive-component :options="item" />
    </div>
  </div>
<!--    <div class="row q-col-gutter-md">-->
<!--      <div class="col-md-6">-->
<!--        <div class="outSideLabel">-->
<!--          productGroupLayout-->
<!--        </div>-->
<!--        <q-radio v-model="localOptions.layout"-->
<!--                 label="ProductTab"-->
<!--                 val="ProductTab" />-->
<!--        <q-radio v-model="localOptions.layout"-->
<!--                 label="ProductShelf"-->
<!--                 val="ProductShelf" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div v-for="(item, index) in data"-->
<!--         :key="index">-->
<!--      <q-card class="custom-card">-->
<!--        <q-card-section>-->
<!--          <q-expansion-item expand-separator>-->
<!--            <template v-slot:header>-->
<!--              <q-btn color="negative"-->
<!--                     icon="close"-->
<!--                     class="q-mr-sm"-->
<!--                     @click="removeTabPanel(index)" />-->
<!--              <q-input v-model="item.options.label"-->
<!--                       autogrow-->
<!--                       class="full-width"-->
<!--                       label="label" />-->
<!--            </template>-->
<!--            <recursive-component :data="item.data" />-->
<!--          </q-expansion-item>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--    </div>-->
</template>

<script>
// import recursiveComponent from 'components/Widgets/Product/ProductsTabPanel/recursiveComponent.vue'
// import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'groupListShelfOptionPanel',
  components: { recursiveComponent: defineAsyncComponent(() => import('../recursiveComponent.vue')) },
  // mixins: [mixinOptionPanel],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    item: {
      get() {
        return this.data
      },
      set(newVal) {
        this.$emit('update:data', newVal)
      }
    }
  },
  mounted() {
    console.log(this.data)
  },
  methods: {
    removeTabPanel (itemIndex) {
      this.item.splice(itemIndex, 1)
    }
  }
}
</script>

<style scoped>

</style>
