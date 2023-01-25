<template>
  <div>
    <div class="detail-box col-3">
      <div class="detail-box-title">مبحث</div>
      <div class="input-container flex">
        <div class="input-box">
          <q-input v-model="lessonsTitles"
                   dense
                   disable />
        </div>
        <div class="icon-box">
          <q-btn unelevated
                 icon="isax:tree"
                 class="open-modal-btn default-detail-btn"
                 :disable="!isTreeModalAvailable"
                 @click="dialogValue = true" />
        </div>
      </div>
    </div>
    <question-tree-modal ref="questionTreeModal"
                         v-model:dialogValue="dialogValue"
                         v-model:subjectsField="allSubjects"
                         :lessons-list="lessonsList"
                         @lessonSelected="lessonSelected" />
  </div>
</template>

<script>
import QuestionTreeModal from 'components/Utils/TreeModal'
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
      lessonsTitles: [],
      allSubjectsFlat: [],
      lastSelectedNodes: []
    }
  },
  computed: {
    doesHaveLessons () {
      return !!(this.lessonsList && this.lessonsList.length > 0)
    },
    isTreeModalAvailable () {
      return this.doesHaveLessons && this.editable
    }
  },
  watch: {
    'question.id': function () {
      this.loadQuestionDataFromResponse()
    },
    allSubjects: {
      handler () {
        this.updateLessonsTitles()
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
    fillLessonFromResponse () {
      const firstTag = this.question.tags.list[0]
      const lesson = firstTag.ancestors[firstTag.ancestors.length - 1]
      // this.$refs.questionTreeModal.lesson = new TreeNode(lesson)
      this.$refs.questionTreeModal.lessonSelected(lesson)
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
