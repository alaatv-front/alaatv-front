<template>
  <div>
    <div class="detail-box">
      <div class="detail-box-title outsideLabel">درخت دانش</div>
      <div class="input-container">
        <div class="input-box">
          <q-input v-model="tagsTitles"
                   dense
                   outlined
                   disable />
        </div>
        <div class="icon-box">
          <q-btn unelevated
                 icon="isax:tree"
                 class="open-modal-btn default-detail-btn"
                 @click="dialogValue = true" />
        </div>
      </div>
    </div>
    <question-tree-modal ref="questionTreeModal"
                         v-model:dialogValue="dialogValue"
                         v-model:subjectsField="allSubjects" />
  </div>
</template>

<script>
import QuestionTreeModal from 'components/Utils/TreeModal.vue'
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'

export default {
  name: 'TreeInput',
  components: { QuestionTreeModal },
  mixins: [inputMixin],
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dialogValue: false,
      allSubjects: {},
      tagsTitles: [],
      allSubjectsFlat: [],
      lastSelectedNodes: []
    }
  },
  watch: {
    allSubjects: {
      handler () {
        this.updateTagsTitles()
        this.getTheLastSelectedNode()
        this.updateValue()
      },
      deep: true
    },
    value: {
      handler (newVal) {
        if (!newVal) {
          this.clearFormBuilderValue()
          return
        }
        if (newVal.length > 0 && typeof newVal[0] === 'string') {
          return
        }
        if (newVal && newVal.length > 0 && typeof newVal[0] === 'object' && this.hasValueChanged(newVal)) {
          this.loadTreeModalNodes(newVal)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.loadTreeModalNodes(this.value)
  },
  methods: {
    clearFormBuilderValue () {
      if (this.allSubjectsFlat.length === 0) {
        return
      }
      this.allSubjects = {}
      this.allSubjectsFlat = []
    },
    hasValueChanged (val) {
      let status = true
      val.forEach(item => {
        if (this.allSubjectsFlat.find(node => node.id === item.id)) {
          status = false
        }
      })
      return status
    },
    updateValue () {
      this.change(this.allSubjectsFlat.map(node => node.id))
    },
    loadTreeModalNodes (value) {
      this.fillAllGivenSubjects(value)
    },
    fillAllGivenSubjects (val) {
      if (!(val && val.length > 0)) {
        return
      }
      val.forEach((tag, index) => {
        const lastAncestors = tag.ancestors[tag.ancestors.length - 1]
        if (!this.allSubjects[lastAncestors.id]) {
          this.allSubjects[lastAncestors.id] = {
            nodes: []
          }
        }
        Object.assign(this.allSubjects[lastAncestors.id].nodes, { [index]: { ...tag } })
      })
    },
    getUniqueListBy (arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    },
    updateTagsTitles () {
      const fieldText = []
      const flatSelectedNodes = []
      if (Object.keys(this.allSubjects).length !== 0) {
        for (const key in this.allSubjects) {
          if (this.allSubjects[key].nodes && this.allSubjects[key].nodes.length > 0) {
            this.allSubjects[key].nodes.forEach(val => {
              fieldText.push(val.title)
              flatSelectedNodes.push(val)
            })
          }
        }
      }
      this.allSubjectsFlat = flatSelectedNodes
      this.tagsTitles = fieldText
    },
    getTheLastSelectedNode () {
      const foundedNodes = []
      let cleaned = []
      this.allSubjectsFlat.forEach((selectedNode) => {
        selectedNode.ancestors.forEach((parentNode) => {
          if (this.allSubjectsFlat.find(item => item.id === parentNode.id)) {
            foundedNodes.push(parentNode)
          }
        })
      })
      cleaned = this.getUniqueListBy(foundedNodes, 'id')
      this.lastSelectedNodes = this.allSubjectsFlat.filter((selectedNode) => {
        return !(cleaned.find(item => item.id === selectedNode.id))
      })
    }
  }
}
</script>

<style scoped lang="scss">
.input-container {
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>
