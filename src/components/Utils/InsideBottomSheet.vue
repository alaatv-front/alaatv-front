<template>
  <q-card class="InsideBottomSheet">
    <div v-touch-swipe.mouse.down="handleSwipe"
         class="InsideBottomSheet__top-btn" />
    <q-card-section v-if="header"
                    class="InsideBottomSheet__header">
      <div class="InsideBottomSheet__header-content">
        <div v-if="headerIcon"
             class="InsideBottomSheet__header-icon">
          <slot name="header-icon" />
        </div>
        <div class="InsideBottomSheet__header-title">
          <slot name="header" />
        </div>
      </div>
      <q-btn v-close-popup
             flat
             :icon="closeButtonIcon"
             square
             color="grey"
             clase="size-xs" />
    </q-card-section>
    <q-separator v-if="header" />
    <q-card-section v-if="body"
                    class="InsideBottomSheet__body">
      <slot name="body" />
    </q-card-section>
    <q-card-section v-if="action"
                    class="InsideBottomSheet__action">
      <slot name="action" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'InsideBottomSheet',
  props: {
    header: {
      type: Boolean,
      default: true
    },
    headerIcon: {
      type: Boolean,
      default: true
    },
    body: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: true
    },
    closeButtonIcon: {
      type: String,
      default: 'ph:x'
    }
  },
  emits: ['closeBottomSheet'],
  data () {
    return {
      dialog: false,
      bottomSheet: false
    }
  },
  methods: {
    handleSwipe () {
      this.$emit('closeBottomSheet')
    }
  }
}
</script>

<style scoped lang="scss">
.InsideBottomSheet {
  width: 100%;
  border-bottom-left-radius: $radius-none;
  border-bottom-right-radius: $radius-none;

  &__top-btn {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%);
    width: 48px;
    height: 6px;
    z-index: 9;
    border-radius: $radius-round;
    background: $grey-3;
  }
  .InsideBottomSheet__header {
    display: flex;
    padding: $space-4 $space-6;
    align-items: center;
    justify-content: space-between;
    gap: $space-2;
    align-self: stretch;
    .InsideBottomSheet__header-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: $space-2;
      .InsideBottomSheet__header-icon {
      }
      .InsideBottomSheet__header-title {

      }
    }
  }
  .InsideBottomSheet__body {
    padding: $space-6 !important;
  }
  .InsideBottomSheet__action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $space-3;
    padding: $spacing-none $space-6 $space-6 !important;
  }
}
</style>
