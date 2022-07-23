<template>
  <div class="product-review">
    <p class="review-title"> بررسی محصول</p>
    <q-card class="custom-card">
      <q-card-section v-html="description.long"/>

    </q-card>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
import { QuasarTemplateBuilderAppLayout } from 'quasar-template-builder'
import * as getters from 'src/store/AppLayout/getters'

export default {
name: "productReview",
  mixins:[mixinWidget],

  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      description: {
        long: '',
        short: '',
        slogan: '',
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler (newValue) {
        Object.assign(this.description, newValue)
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
