<template>
  <div class="tags-selection">
    <div class="outsideLabel">{{ placeholder ? label : null }}</div>
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
              :label="placeholder ? null : label"
              :stack-label="!!placeholder"
              :placeholder="placeholderSetter"
              @filter="filterFn"
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
      model: [],
      filterOptions: [],
      stringOptions: []
    }
  },
  computed: {
    placeholderSetter() {
      if (this.value === null) {
        return this.placeholder
      }
      // in single select after setting value,
      // v-model type changes to string
      if (typeof this.value === 'string') {
        return ''
      }
      // in the multiple scenario, inputData type changes to Array!
      if (this.multiple) {
        if (this.value.length === 0) {
          return this.placeholder
        }
        return ''
      }
      // be an object
      if (Object.keys(this.value).length === 0) {
        return this.placeholder
      }
      return ''
    }
  },
  watch: {
    value () {
      this.inputData = this.value
      this.model = this.value
    }
  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      this.$apiGateway.forrest.getTags(['teacher', 'major', 'grade', 'system']).then(res => {
        this.stringOptions = []
        res.map((tree) => tree.children).forEach(category => {
          category.forEach(item => {
            this.stringOptions.push(item)
          })
        })
        // this.stringOptions = res.map((item) => item.children)
        this.filterOptions = this.stringOptions
        this.onChangeSelections(this.value)
      }).catch(() => {
      })
    },
    onChangeSelections ($event) {
      this.change(JSON.parse(JSON.stringify($event.map(item => item.id))))
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
