<template>
  <div class="row full-width">
    <div class="col-12">
      <q-tabs v-model="computedSize"
              class="full-width">
        <q-tab v-for="(sizeItem, index) in sizeOptions"
               :key="index"
               :name="sizeItem"
               :label="sizeItem" />
      </q-tabs>
    </div>
    <div class="col-12">
      <q-tab-panels v-model="computedSize"
                    animated>
        <q-tab-panel v-for="(sizeItem, index) in sizeOptions"
                     :key="index"
                     :name="sizeItem">
          <slot :name="sizeItem"
                :size="{value:sizeItem, index}" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResponsiveSizeTabPanel',
  props: {
    size: {
      type: String,
      default: 'xs'
    }
  },
  data () {
    return {
      sizeOptions: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  },
  computed: {
    computedSize: {
      get () {
        return this.size
      },
      set (value) {
        this.$emit('update:size', value)
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
