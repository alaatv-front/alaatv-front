<template>
  <div class="ItemSection"
       :class="{'separator': separator, 'selected': selected}">
    <template v-if="!separator">
      <div class="icon-section">
        <q-icon :name="icon" />
      </div>
      <div class="title-section">
        {{ title }}
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
@import "src/css/Theme/Typography/typography.scss";

.ItemSection {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: $space-3 $space-4;
  $icon-width: $space-6;
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
      font-size: $icon-width;
      color: $grey-7
    }
  }
  .title-section {
    @include subtitle1;
    width: calc( 100% - #{$icon-width} );
    margin-left: $space-2;
    color: $grey-9
  }
}
.ItemSection:hover{
  cursor: pointer;
  background: $grey-2;
  border-radius: $space-2;
}
</style>
