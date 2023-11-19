<template>
  <q-dialog v-model="modal"
            :persistent="persistent">
    <q-card class="tree-card">
      <div class="fit row wrap tree-inner-container">
        <div class="choose-tree-box question-details col-6">
          <div class="details-container-2 default-details-container">
            <div class="detail-box-container row">
              <div class="col-12 col-md-6 detail-box q-pr-sm">
                <div class="detail-box-title">پایه تحصیلی</div>
                <q-select v-model="grade"
                          filled
                          dense
                          dropdown-icon="isax:arrow-down-1"
                          option-label="title"
                          :options="gradesList"
                          @update:model-value="gradeSelected" />
              </div>
              <div class="col-12 col-md-6 detail-box q-pl-sm">
                <div class="detail-box-title"> نام درس</div>
                <q-select ref="lessonSelector"
                          v-model="lesson"
                          filled
                          dense
                          dropdown-icon="isax:arrow-down-1"
                          option-label="title"
                          :options="lessonsList"
                          :disable="!doesHaveLessons"
                          @update:model-value="lessonSelected" />
              </div>
            </div>
            <div class="question-tree">
              <tree ref="tree"
                    :key="treeKey"
                    :no-nodes-label="'لطفا یک پایه و درس را انتخاب کنید'"
                    tick-strategy="strict"
                    :get-node-by-id="getNodeById"
                    @ticked="updateNodes"
                    @lazy-loaded="syncAllCheckedIds" />
            </div>
          </div>
        </div>
        <div class="tree-result-box question-details col-6 ">
          <div class="details-container-2 default-details-container ">
            <div class="detail-box"
                 style="padding-right:0;">
              <div class="box-btn-title flex justify-between">
                <div class="detail-box-title">انتخاب ها</div>
                <q-btn class="delete-all-btn"
                       flat
                       label="حذف همه"
                       color="primary"
                       @click="deleteAllNodes" />
              </div>
              <div class="tree-chips-box">
                <div v-if="getAllSubjects[0]">
                  <q-chip v-for="item in getAllSubjects"
                          :key="item"
                          class="tree-chips"
                          icon-remove="mdi-close"
                          removable
                          @remove="removeNode(item)">
                    {{ item.title }}
                  </q-chip>
                </div>
              </div>
            </div>
          </div>
          <div class="action-btn-box text-right">
            <slot name="tree-dialog-action-box">
              <q-btn v-close-popup
                     class="close-btn"
                     label="بستن"
                     color="primary"
                     :disable="persistent" />
            </slot>
          </div>
        </div>
      </div>
      <q-inner-loading :showing="dialogLoading"
                       dark />
    </q-card>
  </q-dialog>
</template>
<script>

import Tree from 'components/Tree/Tree.vue'
import mixinTree from 'src/mixin/Tree.js'
import { TreeNode } from 'src/models/TreeNode.js'

export default {
  name: 'TreeModal',
  components: {
    Tree
  },
  mixins: [
    mixinTree
  ],
  props: {
    dialogValue: {
      type: Boolean
    },
    subjectsField: {
      type: Object
    },
    singleListChoiceMode: {
      type: Boolean,
      default () {
        return false
      }
    },
    initialLesson: {
      type: [Object, TreeNode],
      default () {
        return new TreeNode()
      }
    },
    persistent: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  emits: [
    'gradeSelected',
    'lessonSelected',
    'update:dialogValue',
    'update:subjectsField'
  ],
  data () {
    return {
      dialogLoading: false,
      lesson: '',
      grade: '',
      selectedNodesIDs: [],
      loading: false,
      currentTreeNode: [],
      lastTreeNodes: [],
      treeKey: 0,
      areNodesSynced: false,
      gradesList: [],
      lessonsList: []
    }
  },
  computed: {
    getAllSubjects () {
      const fieldText = []
      if (Object.keys(this.chosenSubjects).length === 0) {
        return fieldText
      }

      for (const key in this.chosenSubjects) {
        if (this.chosenSubjects[key].nodes && this.chosenSubjects[key].nodes.length > 0) {
          this.chosenSubjects[key].nodes.forEach(val => {
            fieldText.push(val)
          })
        }
      }
      return fieldText
    },
    doesHaveLessons () {
      return !!(this.lessonsList && this.lessonsList.length > 0)
    },
    modal: {
      get () {
        return this.dialogValue
      },
      set (value) {
        this.$emit('update:dialogValue', value)
      }
    },
    // main storage
    chosenSubjects: {
      get () {
        return this.subjectsField
      },
      set (value) {
        this.$emit('update:subjectsField', value)
      }
    }
  },
  watch: {
    modal (newVal) {
      this.updateChosenSubjects()
      if (!newVal) {
        this.lesson = ''
      }
    },
    currentTreeNode (newVal) {
      if (newVal.length > 0) {
        this.updateChosenSubjects()
      }
    },
    lesson (newVal) {
      if (newVal && this.singleListChoiceMode) {
        this.deleteAllNodes()
      }
    },
    initialLesson (newVal) {
      if (newVal.id) {
        this.lesson = newVal
        this.lessonSelected(newVal)
      }
    }
  },
  created () {},
  mounted () {
    if (this.initialLesson.id) {
      this.lesson = this.initialLesson
    }
    this.getGradesList()
  },
  updated () {},
  methods: {
    getGradesList () {
      this.dialogLoading = true
      this.$apiGateway.forrest.getGradesList()
        .then(res => {
          this.gradesList = res
          this.dialogLoading = false
        })
        .catch(() => {
          this.dialogLoading = false
        })
    },
    getLessonList (lessonId) {
      this.dialogLoading = true
      this.$apiGateway.forrest.getLessonList({
        data: {
          id: lessonId
        }
      })
        .then(res => {
          this.lessonsList = res
          this.dialogLoading = false
        })
        .catch(() => {
          this.dialogLoading = false
        })
    },
    getSelectedGradeLessons () {

    },
    updateNodes (values) {
      this.nodesUpdatedFromTree = values
      // if nodes are synced with response don't update currentTreeNode
      if (!this.areNodesSynced) {
        this.currentTreeNode = values
      }
      this.selectedNodesIDs = values.map(item => item.id)
    },
    removeNode (item) {
      const node = item.id ? item : { id: item }
      if (this.nodesUpdatedFromTree.find(item => item.id === node.id)) {
        this.setTickedMode('tree', node.id, false)
      }
      this.removeNodeFromChosenSubjects(node)
      this.updateChosenSubjects()
    },
    removeAllNodes () {
      this.setTickedMode('tree', this.selectedNodesIDs, false)
      this.chosenSubjects = {}
    },
    deleteAllNodes () {
      this.removeAllNodes()
    },
    removeNodeFromChosenSubjects (node) {
      for (const key in this.chosenSubjects) {
        this.chosenSubjects[key].nodes.forEach((value, index) => {
          if (value.id === node.id) {
            this.chosenSubjects[key].nodes.splice(index, 1)
          }
        })
      }
    },
    gradeSelected (item) {
      this.lesson = ''
      this.getLessonList(item.id)
      this.$emit('gradeSelected', item)
    },
    lessonSelected (lesson) {
      this.showTreeModalNode(lesson)
      this.$emit('lessonSelected', lesson)
    },
    showTreeModalNode (item) {
      this.treeKey += 1
      this.dialogLoading = true
      this.showTree('tree', this.getNode(item.id))
        .then(() => {
          this.syncAllCheckedIds()
          this.selectWantedTree(this.lesson)
          this.dialogLoading = false
        })
        .catch(() => {
          this.dialogLoading = false
        })
    },
    selectWantedTree (lesson) {
      if (this.chosenSubjects[lesson.id] && this.chosenSubjects[lesson.id].nodes) {
        this.switchToSelectedTree(lesson.id)
        return
      }
      this.createNewDataTree(lesson.id)
    },
    createNewDataTree (lessonId) {
      this.chosenSubjects[lessonId] = {}
      this.chosenSubjects[lessonId].nodes = []
    },
    switchToSelectedTree (lessonId) {
      this.currentTreeNode = this.chosenSubjects[lessonId].nodes
    },
    updateChosenSubjects () {
      if (this.lesson.id && this.chosenSubjects[this.lesson.id]) {
        this.chosenSubjects[this.lesson.id].nodes = this.currentTreeNode
      }
    },
    syncAllCheckedIds (syncedWithResponse) {
      if (syncedWithResponse) {
        this.areNodesSynced = true
      }
      if (this.lesson && this.chosenSubjects[this.lesson.id]) {
        const selectedNodesIds = this.chosenSubjects[this.lesson.id].nodes.map(item => item.id)
        if (selectedNodesIds.length > 0) {
          this.$refs.tree.setNodesTicked(selectedNodesIds, true)
        }
        this.areNodesSynced = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.action-btn-box {
  padding-top: 20px;

  .close-btn {
    color: #FFF;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    background: #9690E4;
    border-radius: 10px;
    width: 96px;
    height: 40px;
    margin: auto 0 auto auto;
  }

  @media screen and (width <= 880px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.q-card {
  min-width: 830px;
  height: 580px;
  background: #FFF;
  border-radius: 10px;
  padding: 30px;
  width: 830px;

  @media screen and (width <= 880px) {
    min-width: 350px;
    width: 350px;

    .tree-inner-container {
      display: flex;
      flex-direction: column;
      height: auto !important;
    }
  }
}

.question-details {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;

  @media screen and (width <= 880px) {
    width: 100%;
  }

  .tree-chips-box {
    height: 412px;
    max-width: 367px;
    background: #F4F5F6;
    border-radius: 10px;
    padding: 16px;
    overflow-x: scroll;

    .tree-chips {
      background: #FFF;
      margin-right: 10px;
    }
  }

  .question-tree {
    height: 378px;
    overflow-x: scroll;
    margin-top: 10px;
  }

  .default-details-container {
    .detail-box {
      //margin-top: 10px;
      .detail-box-title, .delete-all-btn {
        margin-bottom: 5px;
      }
    }
  }

  .details-container-1 {
    .detail-box {
      padding-right: 12px #{"/* rtl:ignore */"};
      padding-left: 12px #{"/* rtl:ignore */"};
    }

    .detail-box-first {
      padding-right: 0 #{"/* rtl:ignore */"};
    }

    .detail-box-last {
      padding-left: 0 #{"/* rtl:ignore */"};
    }
  }

  .default-detail-btn {
    color: #65677F;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }

  .details-container-2 {
    .detail-box {
      .input-container {
        .input-box {
          width: 91%;
        }

        .icon-box {
          width: 40px;
          height: 40px;
          background: #FFF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 16px  ;

          .question-details-subject-img {
            height: 24px;
            max-width: 24px;
          }
        }
      }
    }

    .detail-box-first {
      padding-right: 0 #{"/* rtl:ignore */"};
    }

    .detail-box-last {
      padding-right: 0 #{"/* rtl:ignore */"};
      width: 200px;

      //margin-right: 132px #{"/* rtl:ignore */"};
    }

    .detail-box-last-of-row {
      padding-left: 0 #{"/* rtl:ignore */"};
      margin-top: 43px;
      text-align: end;
      display: flex;
      align-items: center;
      justify-content: center;

      .draft-btn {
        background: #FFF;
        margin-left: 16px #{"/* rtl:ignore */"};
        font-weight: normal;
        color: #23263B;
      }

      .save-btn {
        background: #9690E4;
        font-weight: 500;
        color: #FFF;
      }
    }
  }
}

@media screen and (width >= 881px) {
  .choose-tree-box {
    padding-right: 15px;
  }

  .tree-result-box {
    padding-left: 15px;
  }
}

.tree-card {
  .question-details {
    .default-details-container {
      .detail-box {
        :deep(.q-field) {
          background: #FFF;
          border-radius: 10px;
          line-height: 24px;
          height: 40px;
          min-height: 40px;

          .q-field__marginal {
            height: 40px;
          }

          .q-field__inner {
            margin-top: 9px;
            padding-right: 0 !important;
            padding-left: 0 !important;

            .q-field__control {
              border-radius: 10px;
              min-height: 40px;
              color: #65677F;
              background-color: #f4f5f6;

              &::before {
                display: none;
              }

              &::after {
                display: none;
              }
            }
          }
        }

        :deep(.q-field--auto-height){
          .q-field__native {
            min-height: 40px;
            color: #65677F;

            //background-color: #f4f5f6;
            &.q-field__prefix &.q-field__suffix &.q-field__input {
              color: #65677F;
            }
          }

          .q-field__control {
            border-radius: 10px;
            min-height: 40px;
            color: #65677F;
            background-color: #f4f5f6;

            ::before {
              display: none;
            }

            ::after {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
