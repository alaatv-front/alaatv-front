<template>
  <div>
    <div class="detail-box col-3">
      <div class="detail-box-title">مبحث</div>
      <div class="input-container flex">
        <div class="input-box">
          <q-input v-model="tagsTitles"
                   dense
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
                         v-model:subjectsField="allSubjects"
                         @lessonSelected="lessonSelected" />
  </div>
</template>

<script>
import QuestionTreeModal from 'components/Utils/TreeModal.vue'
export default {
  name: 'TreeInput',
  components: { QuestionTreeModal },
  props: {
    showInput: {
      type: Boolean,
      default () {
        return false
      }
    },
    lessonsList: {
      type: Array,
      default () {
        return []
      }
    },
    groupsList: {
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
  computed: {
    doesHaveLessons () {
      return !!(this.lessonsList && this.lessonsList.length > 0)
    }
  },
  watch: {
    allSubjects: {
      handler () {
        this.updateTagsTitles()
        this.getTheLastSelectedNode()
      },
      deep: true
    }
  },
  methods: {
    lessonSelected (item) {
      this.$emit('lessonSelected', item)
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

<style scoped>

</style>
