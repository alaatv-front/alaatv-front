<template>
  <div class="comment-box">
    <q-input v-if="doesntHaveContent || canEdit"
             v-model="note"
             class="comment-main no-title"
             auto-grow
             outlined
             type="textarea"
             placeholder="یادداشت این جلسه" />
    <div v-else
         class="preview-comment"
         v-html="note.replace(/\r?\n/g, '<br/>')" />
    <div class="flex justify-end q-pt-md">
      <q-btn v-if="saveMode"
             :disabled="doesntHaveContent"
             :loading="loading"
             color="grey"
             class="cancel btn-size"
             label="لغو"
             @click="cancel" />
      <q-btn v-if="saveMode || value.length === 0"
             :disabled="doesntHaveContent"
             :loading="loading"
             color="secondary"
             label="ذخیره"
             class="submit btn-size"
             @click="saveComment" />
      <q-btn v-else
             unelevated
             :loading="loading"
             :disabled="doesntHaveContent"
             color="primary"
             dark
             label="ویرایش"
             class="edit btn-size"
             @click="edit" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentBox',
  props: {
    value: {
      type: String,
      default: ''
    },
    doesntHaveContent: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      note: null,
      saveMode: false,
      showCancel: false,
      canCheck: true
    }
  },
  computed: {
    canEdit () {
      return this.saveMode || this.value.length === 0
    },
    setPlaceHolder () {
      if (this.doesntHaveContent) {
        return 'یادداشت در این مرحله فعال نمیاشد'
      } else {
        return 'یادداشت این جلسه'
      }
    }
  },
  watch: {
    value (newValue) {
      this.note = newValue
      this.checkEditMode(newValue)
    }
  },
  methods: {
    edit () {
      this.saveMode = true
    },
    cancel () {
      this.note = this.value
      this.saveMode = false
    },
    saveComment () {
      this.saveMode = false
      this.$emit('updateComment', this.note)
    },
    checkEditMode (data) {
      if (this.canCheck && data.length > 0) {
        this.saveMode = false
        this.canCheck = false
      } else if (this.canCheck) {
        this.saveMode = true
        this.canCheck = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-bg {
  background: #eff3ff;
}

.comment-box {
  $textarea-height: 140px;
  $textarea-background: #eff3ff;
  :deep(.q-textarea) {
    background: $textarea-background;
    min-height: $textarea-height;
    border-radius: $radius-6;
    .q-field__inner {
      border-radius: $radius-6;
      .q-field__control {
        min-height: $textarea-height;
        padding: $spacing-none;
        border-radius: $radius-6;
        &:before {
          border: none;
          background: $textarea-background;
          border-radius: $radius-6;
        }
        .q-field__control-container {
          textarea {
            height: max-content;
            overflow: auto;
            min-height: $textarea-height;
          }
        }
      }
    }
  }
  .preview-comment {
    padding: $space-4;
    background: $textarea-background;
    min-height: $textarea-height;
    border-radius: $radius-6;
    color: $blue-grey-7;
  }
}
</style>
