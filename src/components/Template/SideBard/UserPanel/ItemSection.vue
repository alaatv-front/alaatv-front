<template>
  <div class="ItemSection"
       :class="{'separator': separator, 'selected': selected}">
    <template v-if="!separator">
      <div class="icon-section">
        <q-icon name:icon />
      </div>
      <div class="title-section">
        title-section
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ItemSection',
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";

.ItemSection {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 16px;
  $icon-width: 24px;
  &.selected {
    background: $secondary-1;
  }
  &.separator {
    background: $grey-2;
    height: 1.5px;
    padding: 0;
    margin: 12px 0;
  }
  .icon-section {
    width: $icon-width;
    .q-icon {
      font-size: $icon-width;
    }
  }
  .title-section {
    width: calc( 100% - #{$icon-width} );
    margin-left: $space-2;
  }
}
</style>
