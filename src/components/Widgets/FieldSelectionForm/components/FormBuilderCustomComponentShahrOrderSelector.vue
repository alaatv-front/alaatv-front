<template>
  <div class="FormBuilderCustomComponentShahrOrderSelector">
    <q-input @click="openModal">
      <template #append>
        <q-icon name="add" />
      </template>
    </q-input>
    <q-dialog v-model="dialogState">
      <select-shahr-with-order-card v-model:selecteds="localValue" />
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
  emits: ['update:selected'],
  data () {
    return {
      dialogState: false
    }
  },
  computed: {
    localValue: {
      get () {
        return this.selected
      },
      set (newValue) {
        this.$emit('update:value', newValue)
      }
    }
  },
  mounted () {
  },
  methods: {
    openModal () {
      this.dialogState = true
    }
  }
}
</script>

<style lang="scss" scoped>
.FormBuilderCustomComponentShahrOrderSelector {

}
</style>
