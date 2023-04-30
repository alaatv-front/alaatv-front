<template>
  <q-input v-for="i in length"
           v-bind="$attrs"
           :key="i"
           :ref="el => updateFieldRef(el, i - 1)"
           v-model="fieldValues[i - 1]"
           class="otp-input"
           maxlength="1"
           @keyup="onKeyUp($event, i - 1)"
           @update:model-value="onUpdate($event, i - 1)" />
</template>
<script>
export default {
  name: 'OtpInput',
  props: {
    inputLength: {
      type: Number,
      default: 6
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

<style scoped>

</style>
