<template>
  <div class="ItemSection"
       :class="{'separator': localItem.separator, 'selected': localItem.selected}"
       @click="onClick">
    <template v-if="!localItem.separator">
      <div class="icon-section">
        <q-icon v-if="localItem.icon"
                :name="localItem.icon" />
      </div>
      <div v-if="localItem.title"
           class="title-section">
        {{ localItem.title }}
      </div>
    </template>
  </div>
</template>

<script>
import UserPanelMixin from 'src/components/Template/SideBard/components/UserPanelMixin.js'
export default {
  name: 'ItemSection',
  mixins: [UserPanelMixin],
  data () {
    return {
      defaultItem: {
        icon: null,
        title: null,
        route: null,
        separator: false,
        selected: false
      }
    }
  },
  methods: {
    onClick () {
      if (this.separator) {
        return
      }
      this.$emit('onClick', this.item)
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
  $icon-width: $space-6;
  padding: $space-3 $space-4;
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
}
.ItemSection:hover{
  cursor: pointer;
  .title-section{
    color: $secondary-6
  }
  .icon-section{
    .q-icon{
      color: $secondary-6
    }
  }
}
</style>
