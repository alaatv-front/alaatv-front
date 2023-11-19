<template>
  <div class="row">
    <q-input v-for="i in length"
             v-bind="$attrs"
             :key="i"
             :ref="el => updateFieldRef(el, i - 1)"
             v-model="fieldValues[i - 1]"
             lazy-rules
             :rules="rules"
             :error="error"
             class="otp-input"
             maxlength="1"
             @keyup="onKeyUp($event, i - 1)"
             @update:model-value="onUpdate($event, i - 1)" />
  </div>
  <div class="col-md-12">
    <div v-if="hint"
         class="otp-hint">
      {{ hint }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'OtpInput',
  props: {
    inputLength: {
      type: Number,
      default: 6
    },
    rules: {
      type: Array,
      default: () => []
    },
    error: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fields: [],
      fieldValues: []
    }
  },
  computed: {
    length() {
      return this.inputLength
    },
    composite() {
      const nonNullFields = this.fieldValues.filter((value) => value)
      if (this.length !== nonNullFields.length) {
        return ''
      }
      return nonNullFields.join('')
    }
  },
  watch: {
    composite(newValue) {
      if (newValue) {
        // You should emit this value, e.g.
        this.$emit('update:modelValue', newValue)
        // Notify.create({
        //   message: `New input: ${composite}`,
        //   type: 'positive'
        // })
      }
    }
  },
  beforeUpdate() {
    this.fields = []
  },
  methods: {
    updateFieldRef(element, index) {
      if (element) {
        this.fields[index] = element
      }
    },
    onUpdate(value, index) {
      if (value) {
        this.focus(index + 1)
      }
    },
    onKeyUp(event, index) {
      const key = event.key

      if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(key)) {
        return
      }

      if (['Delete'].includes(key)) {
        return
      }

      if (key === 'ArrowLeft' || key === 'Backspace') {
        this.focus(index - 1)
      } else if (key === 'ArrowRight') {
        this.focus(index + 1)
      }
    },
    focus(index) {
      if (index >= 0) {
        if (index < this.length) {
          this.fields[index].select()
        } else {
          if (this.composite.length > 0) {
            this.fields[index - 1].blur()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.otp-input {
  margin: 0 4px;

  &:deep(.q-field__control) {
    padding-left: 17px;
    height: 56px;
    text-align: center;
    border-radius: 8px;
    width: 46px;
  }
}

.otp-hint {
  color: #EF5350;
  margin-left: 4px;
  margin-top: 8px;
}
</style>
