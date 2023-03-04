<template>
  <div>
    <div class="outsideLabel">{{ label }}</div>
    <q-select v-model="model"
              filled
              outlined
              multiple
              use-input
              use-chips
              hide-dropdown-icon
              option-value="id"
              class="full-width"
              input-debounce="0"
              option-label="title"
              new-value-mode="add-unique"
              :options="filterOptions"
              @filter="filterFn"
              @new-value="createValue"
              @update:model-value="onChangeSelections" />
  </div>
</template>

<script>
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'
import NormalizeNumber from 'assets/js/NormalizeNumber'

export default {
  name: 'Tags',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    value: {
      default: () => [],
      type: [Array, Object, String, Number, Boolean]
    }
  },
  emits: ['gradeSelected'],
  data () {
    return {
      model: null,
      filterOptions: [],
      stringOptions: [
        {
          id: '63ff427566344faf860f0f9f',
          title: 'دبیر 1',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '0',
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:47:57'
        },
        {
          id: '63ff427c66344faf860f0fa0',
          title: 'دبیر 2',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '2',
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:48:04'
        },
        {
          id: '63ff429866344faf860f0fa2',
          title: 'دبیر 3',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '3',
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:48:32'
        },
        {
          id: '63ff42b466344faf860f0fa3',
          title: 'دبیر 4',
          parent: {
            id: '63f37272c590054efc012d12',
            title: 'دبیر'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d12',
              title: 'دبیر'
            }
          ],
          order: '4',
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:49:18',
          created_at: '2023-03-01 15:49:00'
        },
        {
          id: '63ff42ef66344faf860f0fa5',
          title: 'رشته 1',
          parent: {
            id: '63f37272c590054efc012d13',
            title: 'رشته'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d13',
              title: 'رشته'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 2,
          updated_at: '2023-03-01 15:50:52',
          created_at: '2023-03-01 15:49:59'
        },
        {
          id: '63ff42f766344faf860f0fa6',
          title: 'رشته 2',
          parent: {
            id: '63f37272c590054efc012d13',
            title: 'رشته'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d13',
              title: 'رشته'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:50:52',
          created_at: '2023-03-01 15:50:07'
        },
        {
          id: '63ff42fe66344faf860f0fa7',
          title: 'رشته 3',
          parent: {
            id: '63f37272c590054efc012d13',
            title: 'رشته'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d13',
              title: 'رشته'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:50:52',
          created_at: '2023-03-01 15:50:14'
        },
        {
          id: '63ff433766344faf860f0fab',
          title: 'نظام آموزشی 1',
          parent: {
            id: '63f37272c590054efc012d14',
            title: 'نظام آموزشی'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d14',
              title: 'نظام آموزشی'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:51:11',
          created_at: '2023-03-01 15:51:11'
        },
        {
          id: '63ff433c66344faf860f0fac',
          title: 'نظام آموزشی 2',
          parent: {
            id: '63f37272c590054efc012d14',
            title: 'نظام آموزشی'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d14',
              title: 'نظام آموزشی'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:51:16',
          created_at: '2023-03-01 15:51:16'
        },
        {
          id: '63ff434166344faf860f0fad',
          title: 'نظام آموزشی 3',
          parent: {
            id: '63f37272c590054efc012d14',
            title: 'نظام آموزشی'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d14',
              title: 'نظام آموزشی'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:51:21',
          created_at: '2023-03-01 15:51:21'
        },
        {
          id: '63ff437c66344faf860f0fb1',
          title: 'دوره 1',
          parent: {
            id: '63f37272c590054efc012d15',
            title: 'دوره (متوسطه اول یا دوم بودن)'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d15',
              title: 'دوره (متوسطه اول یا دوم بودن)'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:52:59',
          created_at: '2023-03-01 15:52:20'
        },
        {
          id: '63ff438066344faf860f0fb2',
          title: 'دوره 2',
          parent: {
            id: '63f37272c590054efc012d15',
            title: 'دوره (متوسطه اول یا دوم بودن)'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d15',
              title: 'دوره (متوسطه اول یا دوم بودن)'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 1,
          updated_at: '2023-03-01 15:52:59',
          created_at: '2023-03-01 15:52:24'
        },
        {
          id: '63ff43845b791cba140f7ff2',
          title: 'دوره 3',
          parent: {
            id: '63f37272c590054efc012d15',
            title: 'دوره (متوسطه اول یا دوم بودن)'
          },
          ancestors: [
            {
              id: '63f37272c590054efc012d15',
              title: 'دوره (متوسطه اول یا دوم بودن)'
            }
          ],
          order: 1,
          type: null,
          number_of_children: 0,
          updated_at: '2023-03-01 15:52:59',
          created_at: '2023-03-01 15:52:28'
        }
      ]
    }
  },
  created() {
    // this.getTags()
  },
  methods: {
    getTags() {
      this.$apiGateway.forrest.getTags(['teacher', 'major', 'grade', 'system']).then(res => {
        this.filterOptions = []
        res.map((tree) => tree.children).forEach(category => {
          category.forEach(item => {
            this.stringOptions.push(item)
          })
        })

        // this.stringOptions = res.map((item) => item.children)
        this.filterOptions = this.stringOptions
      })
    },
    createValue (val, done) {
      if (val.length > 0) {
        if (!this.stringOptions.includes(val)) {
          this.stringOptions.push(val)
        }
        done(val, 'toggle')
      }
    },
    onChangeSelections ($event) {
      this.change($event.map(item => item.id))
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.stringOptions
        } else {
          const needle = NormalizeNumber.toEnglish(val.toLowerCase())
          this.filterOptions = this.stringOptions.filter(
            v => NormalizeNumber.toEnglish(v.title.toLowerCase()).indexOf(needle) > -1
          )
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.action-btn-box {
  padding-top: 20px;
  .close-btn {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    background: #9690E4;
    border-radius: 10px;
    width: 96px;
    height: 40px;
    margin: auto 0 auto auto;
  }
  @media screen and (max-width: 880px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.q-card {
  min-width: 830px;
  height: 580px;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 30px;
  width: 830px;
  @media screen and (max-width: 880px) {
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
  @media screen and (max-width: 880px) {
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
      background: #FFFFFF;
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
          background: #FFFFFF;
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
        background: #FFFFFF;
        margin-left: 16px #{"/* rtl:ignore */"};
        font-weight: normal;
        color: #23263B;
      }
      .save-btn {
        background: #9690E4;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
}
@media screen and (min-width: 881px) {
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
          background: #FFFFFF;
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
