<template>
  <div class="ItemExpansionSection">
    <q-expansion-item :icon="localItem.icon"
                      :label="localItem.title"
                      class="expansion-item">
      <sub-item v-for="(subItem, itemIndex) in localItem.subItems"
                :key="itemIndex"
                :title="subItem.title"
                @click="onClick(subItem)" />
    </q-expansion-item>
  </div>
</template>

<script>
import SubItem from 'components/Template/SideBard/UserPanel/SubItem.vue'
import UserPanelMixin from 'src/components/Template/SideBard/UserPanel/UserPanelMixin.js'

export default {
  name: 'ItemExpansionSection',
  components: { SubItem },
  mixins: [UserPanelMixin],
  data () {
    return {
      defaultItem: {
        icon: null,
        title: null,
        route: null,
        subItems: [],
        selected: false
      }
    }
  },
  methods: {
    onClick (subItem) {
      this.$emit('onClick', subItem)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";
@import "src/css/Theme/Typography/typography.scss";

.ItemExpansionSection {
  display: flex;
  align-items: center;
  $icon-width: $space-6;
  justify-content: flex-start;
  .expansion-item {
    &.q-expansion-item {
      width:100%;
      :deep(.q-expansion-item__container){
        .q-item{
          &.q-hoverable:hover {
            & > .q-focus-helper {
              background: none;
            }
            .q-item__section{
              .q-item__label{
                color: $secondary-6
              }
              &.q-item__section--avatar{
                .q-icon{
                  color: $secondary-6
                }
              }
            }
          }
          .q-item__section{
            .q-item__label{
              color: $grey-9;
              @include subtitle1;
              margin-left: $space-2;
              width: calc( 100% - #{$icon-width} );
            }
            &.q-item__section--avatar{
              padding-right: 0;
              min-width: unset;
              .q-icon{
                color: $grey-7
              }
            }
          }
        }
        .q-expansion-item__content{
            padding-left: $space-7;
          &:before{
            left: $space-6;
            top: 0;
            content: ' ';
            height: 100%;
            position: absolute;
            border-left: 2px solid $secondary-6;
          }
        }
      }
    }
  }
}

</style>
