<template>
  <div class="action-btn-wrapper">
    <q-drawer v-if="localOptions.action === 'hamburger_menu'"
              v-model="drawer"
              :width="localOptions.drawer.width"
              :overlay="localOptions.drawer.overlay"
              :breakpoint="localOptions.drawer.breakpoint"
              :bordered="localOptions.drawer.bordered"
              class="drawer"
              :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <div class="column drawer-sections">
        <div>
          <template v-for="(component, index) in localOptions.topSectionWidgets"
                    :key="index">
            <q-item v-if="component.name"
                    v-ripple
                    clickable>
              <component :is="component.name"
                         :options="component.options" />
            </q-item>
          </template>
        </div>
        <div>
          <template v-for="(component, index) in localOptions.bottomSectionWidgets"
                    :key="index">
            <q-item v-if="component.name"
                    v-ripple
                    clickable>
              <component :is="component.name"
                         :options="component.options" />
            </q-item>
          </template>

        </div>
      </div>
    </q-drawer>
    <q-btn v-if="!localOptions.rightIcon"
           :label="localOptions.label"
           :flat="localOptions.flat"
           :class="localOptions.className"
           :style="localOptions.style"
           class="action-btn"
           @click="takeAction">
      <q-icon v-if="localOptions.icon"
              :name="localOptions.icon" />

      <img v-if="localOptions.imageSource"
           :src="localOptions.imageSource"
           alt="actionBtn">
    </q-btn>
    <q-btn v-else
           :label="localOptions.label"
           :icon="localOptions.icon"
           :flat="localOptions.flat"
           :class="localOptions.className"
           :style="localOptions.style"
           class="action-btn"
           @click="takeAction">
      <img v-if="localOptions.imageSource"
           :src="localOptions.imageSource"
           alt="actionBtn">
    </q-btn>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import ImageWidget from 'components/Widgets/ImageWidget/ImageWidget.vue'
import TextWidget from 'components/Widgets/TextWidget/TextWidget.vue'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ActionButton',
  components: {
    ImageWidget,
    TextWidget,
    Timer: defineAsyncComponent(() => import('components/Widgets/Timer/Timer.vue'))
  },
  mixins: [mixinWidget],
  emits: ['ActionButton'],
  data() {
    return {
      drawer: false,
      defaultOptions: {
        color: null,
        icon: null,
        rightIcon: false,
        label: null,
        flat: false,
        callBack: null,
        imageSource: null,
        className: null,
        fixed: false,
        fixedPosition: null,
        hasAction: true,
        action: null,
        scrollTo: null,
        route: null,
        eventName: null,
        eventArgs: null,
        responsiveSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          }
        },
        drawer: {
          overlay: true,
          bordered: true,
          width: 200,
          breakpoint: 500
        },
        topSectionWidgets: [],
        bottomSectionWidgets: []
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      if (this.localOptions.imageSource) {
        this.localOptions.flat = true
        this.localOptions.className = this.localOptions.className + ' img-btn'
      }
      if (this.localOptions.fixed) {
        this.localOptions.className = this.localOptions.className + ' fixed-btn' + ` ${this.localOptions.fixedPosition}`
      }
    },
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    takeAction() {
      if (!this.localOptions.hasAction) {
        this.$emit('ActionButton')
      } else if (this.callBack) {
        this.callBack()
      } else if (this.localOptions.action && this.localOptions.action === 'scroll') {
        this.scrollToElement(this.localOptions.scrollTo)
      } else if (this.localOptions.action && this.localOptions.action === 'link') {
        this.$router.push(this.localOptions.route)
      } else if (this.localOptions.action && this.localOptions.action === 'event') {
        this.$bus.emit(this.localOptions.eventName, this.localOptions.eventArgs)
      } else if (this.localOptions.action && this.localOptions.action === 'hamburger_menu') {
        this.drawer = !this.drawer
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.action-btn-wrapper {
  .drawer {
    z-index: 100;
    .drawer-sections {
      place-content: space-between;
      height: inherit;
    }
  }
  .action-btn {

    &.fixed-btn {
      position: fixed;
      z-index: 1;
@import "quasar-ui-q-page-builder/src/components/Component.scss";
$responsiveSpacing: (
    xs: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.xs.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.xs.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.xs.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.xs.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.xs.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.xs.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.xs.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.xs.paddingBottom'),
    ),
    sm: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.sm.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.sm.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.sm.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.sm.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.sm.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.sm.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.sm.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.sm.paddingBottom'),
    ),
    md: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.md.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.md.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.md.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.md.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.md.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.md.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.md.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.md.paddingBottom'),
    ),
    lg: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.lg.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.lg.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.lg.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.lg.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.lg.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.lg.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.lg.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.lg.paddingBottom'),
    ),
    xl: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.xl.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.xl.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.xl.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.xl.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.xl.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.xl.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.xl.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.xl.paddingBottom'),
    )
);
.action-btn {
  @include media-query-spacings($responsiveSpacing, $sizes);
  &.fixed-btn {
    position: fixed;
    z-index: 1;

      &.top-right {
        top: 0;
        right: 0;
      }
      &.top-left {
        top: 0;
        left: 0;
      }
      &.bottom-right {
        bottom: 0;
        right: 0;
      }
      &.bottom-left {
        bottom: 0;
        left: 0;
      }
    }
    &.img-btn{
      &:deep(.q-btn__content){
        margin: 0;
      }
      &:deep(.q-focus-helper) {
        display: none;
      }
    }
  }
}
</style>
