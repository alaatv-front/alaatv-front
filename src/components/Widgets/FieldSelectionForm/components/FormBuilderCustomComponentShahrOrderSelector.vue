<template>
  <div class="FormBuilderCustomComponentShahrOrderSelector">
    <q-input v-model="countOfSelected"
             readonly
             @click="openModal">
      <template #append>
        <q-icon name="add" />
      </template>
    </q-input>
    <q-dialog v-model="dialogState">
      <select-shahr-with-order-card v-model:selecteds="bufferSelected"
                                    style="width: 700px; max-width: 90vw;"
                                    @update:selecteds="onChangeSelected" />
    </q-dialog>
  </div>
</template>

<script>
import SelectShahrWithOrderCard from './SelectShahrWithOrderCard.vue'
export default {
  name: 'FormBuilderCustomComponentShahrOrderSelector',
  components: { SelectShahrWithOrderCard },
  props: {
    value: {
      type: [Array, Object],
      default: () => []
    }
  },
  emits: ['update:value'],
  data () {
    return {
      dialogState: false,
      countOfSelected: 0 + ' شهر انتخاب شده',
      bufferSelected: []
    }
  },
  methods: {
    openModal () {
      this.dialogState = true
    },
    onChangeSelected (newValue) {
      this.$emit('update:value', JSON.stringify(newValue))
      this.countOfSelected = newValue.length + ' شهر انتخاب شده'
    }
  }
}
</script>

<style lang="scss" scoped>
.FormBuilderCustomComponentShahrOrderSelector {
  :deep(.q-input) {
    input {
      color: #9E9E9E;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.28px;
    }
  }
}
</style>
