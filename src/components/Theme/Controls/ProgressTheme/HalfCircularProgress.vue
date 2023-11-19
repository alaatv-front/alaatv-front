<template>
  <div class="progress-wrapper">
    <q-circular-progress :value="computedValue"
                         rounded
                         :size="`${size}px`"
                         :max="100"
                         :show-value="showValue"
                         :min="0"
                         :angle="270"
                         :thickness="thickness"
                         :color="color"
                         :track-color="trackColor"
                         :font-size="fontSize"
                         class="circular">
      <slot v-if="showValue"
            name="value">
        <template v-if="icon && iconRight">
          <q-icon :name="icon" />
        </template>
        {{ value }}
        <template v-if="icon && !iconRight">
          <q-icon :name="icon" />
        </template>
      </slot>

    </q-circular-progress>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HalfCircularProgress',
  props: {
    value: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    trackColor: {
      type: String,
      default: 'white'
    },
    thickness: {
      type: Number,
      default: 0.22
    },
    showValue: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '16px'
    }
  },
  computed: {
    computedValue() {
      const percent = (((this.value - this.min) / (this.max - this.min)) * 100)
      return ((percent * (this.max - this.min)) / 100)
    },
    computedHeight() {
      return `${this.size / 2}px`
    }
  }
})
</script>
<style lang="scss" scoped>
.progress-wrapper {
  height: v-bind(computedheight);
  overflow-y: hidden;

  &:deep(.q-circular-progress__text) {
    margin-top: -25%;
  }
}
</style>
