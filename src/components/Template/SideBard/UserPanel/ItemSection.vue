<template>
  <div class="ItemSection"
       :class="{'separator': separator, 'selected': selected}">
    <template v-if="!separator">
      <div v-if="!expandable"
           class="parent-item">
        <div class="icon-section">
          <q-icon :name="icon" />
        </div>
        <div class="title-section">
          {{ title }}
        </div>
        <div v-if="expandable"
             class="icon-expand">
          <q-icon name="ph:caret-down" />
        </div>
      </div>
      <q-expansion-item v-else
                        :icon="icon"
                        :label="title"
                        class="expansion-item">
        <div class="vertical-separator" />
        <sub-item v-for="(subItem, itemIndex) in subItems"
                  :key="itemIndex"
                  :title="subItem.title" />
      </q-expansion-item>
    </template>
  </div>
</template>

<script>
import SubItem from 'components/Template/SideBard/UserPanel/SubItem.vue'

export default {
  name: 'ItemSection',
  components: { SubItem },
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    separator: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: false
    },
    subItems: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";
@import "src/css/Theme/Typography/typography.scss";

.ItemSection {
  $icon-width: $space-6;
  .parent-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: $space-3 $space-4;
  }
  .parent-item:hover{
    cursor: pointer;
    background: $grey-2;
    border-radius: $space-2;
  }
  .childItem{
        .vertical-separator{
          border-left: 6px solid green;
          height: 500px;
          position: absolute;
          left: 50%;
          top: 0;
          background: $secondary-4;
    }
  }
  &.selected {
    background: $secondary-1;
    border-radius: $space-2;
    .title-section{
      color: $secondary-6
    }
    .icon-section{
      .q-icon{
        color: $secondary-6
      }
    }
  }
  &.separator {
    background: $grey-2;
    height: 1.5px;
    padding: 0;
    margin: $space-3 0;
  }
  .icon-section {
    width: $icon-width;
    .q-icon {
      color: $grey-7;
      font-size: $icon-width;
    }
  }
  .title-section {
    @include subtitle1;
    width: calc( 100% - #{$icon-width} );
    margin-left: $space-2;
    color: $grey-9
  }
  .expansion-item{
    .q-expansion-item{
      .q-item:hover{
        cursor: pointer;
        background: $grey-2;
        border-radius: $space-2;
      }
    }
  }
}
</style>
