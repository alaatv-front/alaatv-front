<template>
  <div class="ItemsSection">
    <component :is="getItemTypeComponent(item)"
               v-for="(item, itemIndex) in items"
               :key="itemIndex"
               :item="item"
               :icon="item.icon"
               :title="item.title"
               :route="item.route"
               :separator="item.separator"
               :selected="item.selected"
               :expandable="item.expandable"
               :subItems="item.subItems"
               @onClick="onClickItem" />
  </div>
</template>

<script>
import ItemExpansionSection from 'src/components/Template/SideBard/UserPanel/ItemExpansionSection.vue'
import ItemSection from 'src/components/Template/SideBard/UserPanel/ItemSection.vue'
export default {
  name: 'ItemsSection',
  components: { ItemSection, ItemExpansionSection },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onClickItem', 'onClickSubItem'],
  methods: {
    onClickSubItem(subItem) {
      this.$emit('onClickSubItem', subItem)
    },
    onClickItem (item) {
      this.$emit('onClickItem', item)
    },
    getItemTypeComponent (item) {
      return !item.expandable ? 'item-section' : 'item-expansion-section'
    }
  }
}
</script>

<style scoped lang="scss">
.ItemsSection{

}
</style>
