<template>
  <q-card class="explain-container main-card">
    <q-card-section>
      <div class="row items-center">
        <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-11/Rectangle1700578454.png" />
        <h6 class="title ">
          {{title}}
        </h6>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="content">
        <slot name="content" />
      </div>
      <div v-if="contentType === 'expansion-panel' && showMoreBtn"
           class="row items-center justify-center q-gutter-xs">
        <div v-for="n in 3"
             :key="n"
             class="more-icon" />
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="showButton"
           class="action-btn">
        <div v-if="showMoreBtn">
          <q-btn :label="moreButtonLabel"
                 flat
                 class="size-xs"
                 color="secondary"
                 icon-right="ph:caret-down"
                 @click="showAllContent" />
        </div>
        <div v-else>
          <q-btn :label="moreButtonLabel"
                 flat
                 class="size-xs"
                 color="secondary"
                 icon-right="ph:caret-down"
                 @click="showDefaultContent" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import lazyImg from 'components/lazyImg.vue'

export default {
  name: 'CourseExplain',
  components: { lazyImg },
  props: {
    contentType: {
      type: String,
      default: 'text'
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '100%'
    },
    showButton: {
      type: Boolean,
      default: true
    },
    moreButtonLabel: {
      type: String,
      default: 'مشاهده بیشتر'
    },
    lessButtonLabel: {
      type: String,
      default: 'مشاهده کمتر'
    }
  },
  data () {
    return {
      defaultHeight: '',
      showMoreBtn: true
    }
  },
  methods: {
    showAllContent () {
      this.defaultHeight = this.height
      this.showMoreBtn = false
      this.$emit('update:height', '100%')
    },
    showDefaultContent () {
      this.showMoreBtn = true
      this.$emit('update:height', this.defaultHeight)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/Theme/spacing";
@import "src/css/Theme/colors";

.explain-container {
  .content {
    margin-top: $space-5;
    height: v-bind('height');
    overflow: hidden;
  }
  .more-icon {
    margin-top: $space-5;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $grey-4;
  }
  .action-btn {
    margin-top: $space-5;
  }
  .title {
    margin-left: $space-2;
  }
}
</style>
