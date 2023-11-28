<template>
  <q-expansion-item expand-separator
                    :class="{'grey-mode': grey}">
    <template v-slot:header>
      <q-item-section>
        <q-item-section class="header-label-section">
          <q-icon v-if="icon"
                  :name="icon"
                  class="header-icon"
                  size="20px"
                  color="grey9" />
          <slot name="beforeLabel" />
          <div class="expansion-label ellipsis">
            {{ label }}
          </div>
          <slot name="afterLabel" />
        </q-item-section>
        <q-item-section class="responsive-action-section">
          <div class="action-wrapper">
            <div class="action">
              <slot name="action" />
            </div>
          </div>
        </q-item-section>
      </q-item-section>

      <q-item-section v-if="hasAction"
                      class="header-action-section">
        <div class="action-wrapper">
          <div class="action">
            <slot name="action" />
          </div>
        </div>
      </q-item-section>
    </template>
    <slot name="body" />
  </q-expansion-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpansionItem',
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    separated: {
      type: Boolean,
      default: true
    },
    expanded: {
      type: Boolean,
      default: false
    },
    grey: {
      type: Boolean,
      default: false
    },
    hasAction: {
      type: Boolean,
      default: false
    }

  }
})
</script>

<style lang="scss" scoped>

</style>
