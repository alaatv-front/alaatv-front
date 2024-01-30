<template>
  <q-card class="InsideDialog">
    <q-card-section v-if="header"
                    class="InsideDialog__header">
      <div class="InsideDialog__header-content">
        <div v-if="headerIcon"
             class="InsideDialog__header-icon">
          <slot name="header-icon" />
        </div>
        <div class="InsideDialog__header-title">
          <slot name="header" />
        </div>
      </div>
      <q-btn v-close-popup
             flat
             icon="ph:x"
             square
             color="grey"
             clase="size-xs" />
    </q-card-section>
    <q-separator v-if="header" />
    <q-card-section v-if="body"
                    class="InsideDialog__body">
      <slot name="body" />
    </q-card-section>
    <q-card-section v-if="action"
                    class="InsideDialog__action">
      <slot name="action" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'InsideDialog',
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
    }
  },
  data () {
    return {
      dialog: false,
      bottomSheet: false
    }
  }
}
</script>

<style scoped lang="scss">
.InsideDialog {
  width: 100%;
  .InsideDialog__header {
    display: flex;
    padding: $space-4 $space-6;
    align-items: center;
    justify-content: space-between;
    gap: $space-2;
    align-self: stretch;
    .InsideDialog__header-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: $space-2;
      .InsideDialog__header-icon {
      }
      .InsideDialog__header-title {

      }
    }
  }
  .InsideDialog__body {
    padding: $space-6 !important;
  }
  .InsideDialog__action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $space-3;
    padding: $spacing-none $space-6 $space-6 !important;
  }
}
</style>
