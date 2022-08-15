<template>
  <q-option-group
    v-model="inputData.entity_type"
    :options="options"
    @update:model-value="onChangeLineType"
    color="primary"
    type="radio"
    dense
    inline
  />
  <div
    v-if="inputData.entity_type !== 'nothing'"
  >

    <q-input
      v-model="inputData.altNames"
      label="کد موجودیت را وارد کنید:"
    />

  </div>
</template>

<script>
import { inputMixin } from 'quasar-form-builder'
export default {
  name: 'ItemEntity',
  data() {
    return {
      options: [
        {
          entity_id: 0,
          entity_type: 'nothing',
          value: 'nothing',
          display_name: 'هیچ کدام',
          label: 'هیچ کدام',
          altNames: []
        },
        {
          entity_id: 1,
          entity_type: 'product',
          value: 'product',
          display_name: 'محصول',
          label: 'محصول',
          altNames: []
        },
        {
          entity_id: 2,
          entity_type: 'set',
          value: 'set',
          display_name: 'دسته محتوا',
          label: 'دسته محتوا',
          altNames: []
        },
        {
          entity_id: 3,
          entity_type: 'content',
          value: 'content',
          display_name: 'محتوا',
          label: 'محتوا',
          altNames: []
        }
      ]
    }
  },
  props: {
    value: {
      default: null
    },
    name: {
      type: String,
      default: 'ali'
    }
  },
  mixins: [inputMixin],
  methods: {
    onChangeLineType () {
      const name = this.options.find(item => item.entity_type === this.inputData.entity_type).display_name
      const id = this.options.find(item => item.entity_type === this.inputData.entity_type).entity_id
      const data = { entity_id: id, entity_type: this.inputData.entity_type, display_name: name, altNames: [] }
      console.log(data)
      this.change(data)
      // this.setLineFlow()
    }
  }

}
</script>

<style scoped>

</style>
