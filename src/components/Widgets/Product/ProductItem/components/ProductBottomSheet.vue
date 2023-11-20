<template>
  <q-dialog :model-value="dialog"
            full-width
            full-height>
    <q-card class="custom-card ShowLiveClassesLink">
      <q-card-section>
        <q-btn color="primary"
               flat
               icon="close"
               @click="toggleDialog" />
      </q-card-section>
      <q-card-section class="product-page-section">
        <product-page :options="{productId: productId}" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import ProductPage from 'src/components/Widgets/Product/ProductPage/ProductPage.vue'

export default defineComponent({
  name: 'ProductBottomSheet',
  components: {
    ProductPage
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    productId: {
      type: Number,
      default: null
    }
  },
  emits: ['toggleDialog'],
  methods: {
    toggleDialog () {
      this.$emit('toggleDialog')
    }
  }
})
</script>

<style lang="scss" scoped>
.product-page-section {
  overflow-y: auto;
}
</style>
