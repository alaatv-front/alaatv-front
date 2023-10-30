<template>
  <div class="SubItem">
    <div class="title-section">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'subItem',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";
@import "src/css/Theme/Typography/typography.scss";
.SubItem{
  display: flex;
  align-items: center;
  width:100%;
  padding: $space-2 $space-3;
  justify-content: flex-start;
  .title-section{
    @include body1;
    color: $grey-9
  }
  &.selected {
    background: $secondary-1;
    border-radius: $space-2;
    .title-section{
      color: $secondary-6
    }
  }
}
.SubItem:hover{
  cursor: pointer;
  .title-section{
    color: $secondary-6
  }
}
</style>
