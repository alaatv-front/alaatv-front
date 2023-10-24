<template>
  <div class="ItemsSection">
    <item-section v-for="(item, itemIndex) in items"
                  :key="itemIndex"
                  :icon="item.icon"
                  :title="item.title"
                  :separator="item.separator"
                  :selected="item.selected"
                  @click="onClickItem(item)" />
  </div>
</template>

<script>
import ItemSection from 'src/components/Template/SideBard/UserPanel/ItemSection.vue'
export default {
  name: 'ItemsSection',
  components: { ItemSection },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onClickItem'],
  methods: {
    onClickItem (item) {
      this.$emit('onClickItem', item)
    }
  }
}
</script>

<style scoped lang="scss">
.ItemsSection{

}
</style>
