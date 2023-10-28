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
  padding: $space-2 $space-4;
  justify-content: flex-start;
  .title-section{
    @include body1;
    margin-left: $space-2;
    color: $grey-9
  }
}
.SubItem:hover{
  cursor: pointer;
  background: $grey-2;
  border-radius: $space-2;
}
</style>
