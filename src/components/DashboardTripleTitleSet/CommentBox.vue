<template>
  <div class="comment-box">
    <q-input v-model="note"
             class="comment-main"
             auto-grow
             outlined
             type="textarea"
             placeholder="یادداشت این جلسه"
             filled
             :disable="doesntHaveContent || !canEdit" />
    <div class="flex btn-style">
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
  &:deep(.q-field__control) {
    background: #eff3ff;
    height: 140px !important;
    overflow: auto;
    border-right: 24px !important;

    @media only screen and (width <= 1904px) {
      height: 120px !important;
    }

    @media only screen and (width <= 990px) {
      height: 100px !important;
    }

    @media only screen and (width <= 768px) {
      height: 120px !important;
    }

    @media only screen and (width <= 576px) {
      height: 80px !important;
    }
  }

  &:deep(.q-field__control::after) {
    height: 0;
  }

  &:deep(.q-field__control::before) {
    background: #eff3ff;
    border-bottom: none;
  }

  &:deep(.q-field__native) {
    font-size: 16px;
    font-weight: 500;
  }

  &:deep(.q-placeholder) {
    color: #3e5480;
    font-size: 16px;
    font-weight: 500;
  }

  .btn-style {
    width: 100%;
    justify-content: flex-end;
    font-size: 16px;
    margin: 20px 0;

    @media only screen and (width <= 1023px) {
      height: 40px !important;
      margin: 15px 0 20px;
    }

    .btn-size {
      border-radius: 10px !important;
      width: 120px;
      height: 48px !important;

      @media only screen and (width <= 1200px) {
        height: 40px !important;
      }

      @media only screen and (width <= 576px) {
        height: 36px !important;
        width: 100px;
      }
    }
  }

}
</style>
