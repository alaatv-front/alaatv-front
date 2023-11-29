<template>
  <div class="child-product-container">
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-6">
            <div class="flex items-center">
              <q-checkbox v-model="productIsSelect"
                          @update:model-value="selectChildren" />
              <div class="subtitle2">{{ product.title }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="row items-center justify-end">
              <div v-if="product.price.discount">
                <q-badge :label="product.discount" />
              </div>
              <div v-if="product.price.base === 0"
                   class="q-mr-sm">
                رایگان
              </div>
              <h5>
                {{product.price.base}}
              </h5>
              <div class="q-ml-xs">
                تومان
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section />
    </q-card>
  </div>
</template>

<script>
import { Product } from 'src/models/Product'

export default {
  name: 'ChildProduct',
  props: {
    product: {
      type: Product,
      default: new Product()
    }
  },
  emits: ['addChildToProduct'],
  data () {
    return {
      productIsSelect: false
    }
  },
  methods: {
    selectChildren () {
      this.$emit('addChild', this.product.id)
    }
  }
}
</script>

<style scoped lang="scss">
.child-product-container {
  margin: 8px 0;
}
</style>
