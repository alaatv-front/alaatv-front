<template>
  <q-option-group v-model="inputData.entity_type"
                  :options="entityOptions"
                  color="primary"
                  type="radio"
                  dense
                  inline
                  @update:model-value="onChangeLineType" />
  <div v-if="inputData.entity_type !== 'nothing' && inputData.entity_type">
    <q-input v-model="inputData.altNames"
             label="کد موجودیت را وارد کنید:" />

  </div>
</template>

<script>
import { inputMixin } from 'quasar-form-builder'
export default {
  name: 'ItemEntity',
  mixins: [inputMixin],
  props: {
    value: {
      default: null
    }
  },
  data() {
    return {
      entityOptions: [
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
  methods: {
    onChangeLineType () {
      const name = this.entityOptions.find(item => item.entity_type === this.inputData.entity_type).display_name
      const id = this.entityOptions.find(item => item.entity_type === this.inputData.entity_type).entity_id
      const data = { entity_id: id, entity_type: this.inputData.entity_type, display_name: name, altNames: [] }
      this.change(data)
      // this.setLineFlow()
    }
  }

}
</script>
