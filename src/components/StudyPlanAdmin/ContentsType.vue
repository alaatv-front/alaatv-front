<template>
  <div>
    <div class="row items-center">
      <div class="col-9"><form-builder ref="contentType"
                                       :value="inputs" /></div>
      <div class="col-3 text-right">
        <q-btn icon="add"
               rounded
               unelevated
               color="green"
               @click="addContent" />
      </div>
    </div>
    <div v-for="(content, index) in inputData"
         :key="index"
         class="row items-center q-mb-sm">
      <div class="col-3">{{content.id}}</div>
      <div class="col-3">{{content.title}}</div>
      <div class="col-3">{{ getType(content.type_id) }}</div>
      <div class="col-3 text-right">
        <q-btn icon="clear "
               rounded
               unelevated
               color="red"
               @click="deleteContent(content)" />
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script>
// import { inputMixin, FormBuilder } from 'quasar-form-builder'
import FormBuilder from 'quasar-form-builder/src/FormBuilder.vue'
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'

export default {
  name: 'ContentsType',
  components: { FormBuilder },
  mixins: [inputMixin],
  props: {
    value: {
      default: []
    }
  },
  data: () => ({
    inputs: [
      { type: 'input', responseKey: 'id', name: 'id', label: 'کد', col: 'col-md-4' },
      { type: 'input', responseKey: 'title', name: 'title', label: 'عنوان', col: 'col-md-4' },
      {
        type: 'select',
        responseKey: 'type',
        name: 'type',
        label: 'نوع',
        optionLabel: 'display_name',
        optionValue: 'type_id',
        col: 'col-md-4',
        options: [{ display_name: 'ویس مشاوره', type_id: 1 }, { display_name: 'فیلم مشاوره', type_id: 2 }, { display_name: 'متن مشاوره', type_id: 3 }, { display_name: 'فیلم تدریس', type_id: 4 }, { display_name: 'تست ها', type_id: 5 }]
      }
    ],
    inputData: []
  }),
  mounted () {
    this.setData()
    this.inputData = this.value
  },
  methods: {
    getType (id) {
      const option = this.inputs[2].options.find(item => item.type_id === id)
      if (option) {
        return option.display_name
      }
      return ''
    },
    addContent () {
      this.inputData.push({
        title: this.inputs[0].value,
        id: this.inputs[1].value,
        type_id: this.inputs[2].value
      })
      this.changeData()
    },
    deleteContent (content) {
      this.inputData = this.inputData.filter(item => item.id !== content.id)
      this.changeData()
    },
    setData () {
      this.$nextTick(() => {
      })
    },
    changeData () {
      this.change(this.inputData)
    }
  }
}
</script>
