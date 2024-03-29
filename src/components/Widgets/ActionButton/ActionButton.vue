<template>
  <div class="action-btn-wrapper">
    <q-btn v-if="!localOptions.rightIcon || (localOptions.profileMode && isUserLogin)"
           :label="localOptions.label"
           :flat="localOptions.flat"
           :disable="disable"
           :outline="localOptions.outline"
           :class="[localOptions.className, responsiveShow]"
           :style="localOptions.style"
           class="action-btn"
           @click="takeAction">
      <template v-if=" (localOptions.profileMode && isUserLogin)">
        <div class="info-name ellipsis">{{user.getFullNameOrPhoneNumber()}}</div>
        <q-avatar class="user-avatar">
          <lazy-img :src="user.photo"
                    :alt="'user photo'"
                    class="user-img" />
        </q-avatar>
      </template>
      <template v-else>
        <q-icon v-if="localOptions.icon"
                :name="localOptions.icon" />

        <img v-if="localOptions.imageSource"
             :src="localOptions.imageSource"
             alt="actionBtn">
      </template>
    </q-btn>
    <q-btn v-else
           :label="localOptions.label"
           :icon="localOptions.icon"
           :outline="localOptions.outline"
           :flat="localOptions.flat"
           :class="localOptions.className"
           :style="localOptions.style"
           :disable="disable"
           class="action-btn"
           @click="takeAction">
      <img v-if="localOptions.imageSource"
           :src="localOptions.imageSource"
           alt="actionBtn">
    </q-btn>

    <q-layout v-if="localOptions.action === 'hamburger_menu' && mounted">
      <q-drawer ref="actionDrawer"
                v-model="drawer"
                :width="drawerWidth"
                :overlay="localOptions.drawer.overlay"
                :breakpoint="localOptions.drawer.breakpoint"
                :bordered="localOptions.drawer.bordered"
                :style="localOptions.drawer.style"
                class="drawer">
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
    </q-layout>
    <separator-widget v-if="localOptions.showSeparator"
                      :options="localOptions.separator" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import TextWidget from 'src/components/Widgets/TextWidget/TextWidget.vue'
import ImageWidget from 'src/components/Widgets/ImageWidget/ImageWidget.vue'
import separatorWidget from 'src/components/Widgets/Separator/Separator.vue'

export default {
  name: 'ActionButton',
  components: {
    LazyImg,
    ImageWidget,
    TextWidget,
    separatorWidget,
    Timer: defineAsyncComponent(() => import('components/Widgets/Timer/Timer.vue'))
  },
  mixins: [mixinWidget, mixinAuth],
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['ActionButton'],
  data () {
    return {
      drawer: false,
      mounted: false,
      defaultOptions: {
        showSeparator: false,
        color: null,
        icon: null,
        rightIcon: false,
        label: null,
        flat: false,
        outline: false,
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
        borderRadius: '8px',
        separator: {
          spaced: false,
          dark: false,
          inset: false,
          vertical: false,
          image: null,
          ImageStyle: null,
          ImageClassName: null,
          height: {
            xl: '',
            lg: '',
            md: '',
            sm: '',
            xs: ''
          },
          width: {
            xl: '',
            lg: '',
            md: '',
            sm: '',
            xs: ''
          },
          style: {},
          className: ''
        },
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
        responsiveShow: {
          xl: true,
          lg: true,
          md: true,
          sm: true,
          xs: true
        },
        boxShadows: [],
        showInAuth: false,
        displayAuth: false,
        drawer: {
          style: {},
          overlay: true,
          bordered: true,
          width: 200,
          breakpoint: 500
        },
        topSectionWidgets: [],
        bottomSectionWidgets: [],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        }
      }
    }
  },
  computed: {
    drawerWidth () {
      return Number(this.localOptions.drawer.width)
    },
    hideInAuth () {
      return this.localOptions.hideInAuth ? this.isUserLogin : false
    },
    displayAuth () {
      if (!this.localOptions.displayAuth) {
        return true
      }
      return this.localOptions.showInAuth ? this.isUserLogin : !this.isUserLogin
    },
    actionBtnDisplayAuth () {
      return this.displayAuth ? 'flex' : 'none'
    },
    shadows () {
      const shadows = []
      this.localOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    responsiveShow () {
      let responsiveShow = ''
      Object.keys(this.localOptions.responsiveShow).forEach(key => {
        if (this.localOptions.responsiveShow[key] === false) {
          responsiveShow += key + '-hide '
        }
      })

      return ' ' + responsiveShow
    }
  },
  watch: {
    options: {
      handler () {
        this.loadConfig()
      }
    }
  },
  mounted () {
    this.loadConfig()
    this.checkAuth()
    this.$bus.on('onActionButtonScrollTo', () => {
      this.drawer = false
    })
    this.mounted = true
  },
  methods: {
    checkAuth () {
      this.$bus.on('onLoggedIn', () => {
        this.loadAuthData()
      })
    },
    loadConfig () {
      if (this.localOptions.imageSource) {
        this.localOptions.flat = true
        this.localOptions.className = this.localOptions.className + ' img-btn'
      }
      if (this.localOptions.fixed) {
        this.localOptions.className = this.localOptions.className + ' fixed-btn' + ` ${this.localOptions.fixedPosition}`
      }
    },
    scrollToElement (className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    redirectRoute (url) {
      if ((url.indexOf('http://') > -1 || url.indexOf('https://') > -1)) {
        window.open(url, '_blank')
      } else {
        this.$router.push(url)
      }
    },
    takeAction () {
      if (!this.localOptions.hasAction) {
        this.$emit('ActionButton', this.localOptions.scrollTo)
      } else if (this.callBack) {
        this.callBack()
      } else if (this.localOptions.action && this.localOptions.action === 'scroll') {
        this.$bus.emit('onActionButtonScrollTo')
        this.$nextTick(() => {
          this.scrollToElement(this.localOptions.scrollTo)
        })
      } else if (this.localOptions.action && this.localOptions.action === 'link') {
        this.redirectRoute(this.localOptions.route)
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
@import "quasar-ui-q-page-builder/src/components/Component.scss";

$shadows: v-bind('shadows');
$displayAuth: v-bind('actionBtnDisplayAuth');
$responsiveSpacing: (
  xs: (
    marginTop: v-bind('localOptions.responsiveSpacing.xs.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.xs.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.xs.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.xs.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.xs.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.xs.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.xs.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.xs.paddingBottom'),
  ),
  sm: (
    marginTop: v-bind('localOptions.responsiveSpacing.sm.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.sm.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.sm.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.sm.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.sm.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.sm.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.sm.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.sm.paddingBottom'),
  ),
  md: (
    marginTop: v-bind('localOptions.responsiveSpacing.md.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.md.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.md.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.md.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.md.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.md.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.md.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.md.paddingBottom'),
  ),
  lg: (
    marginTop: v-bind('localOptions.responsiveSpacing.lg.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.lg.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.lg.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.lg.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.lg.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.lg.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.lg.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.lg.paddingBottom'),
  ),
  xl: (
    marginTop: v-bind('localOptions.responsiveSpacing.xl.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.xl.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.xl.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.xl.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.xl.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.xl.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.xl.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.xl.paddingBottom'),
  )
);
$border: v-bind('localOptions.borderStyle.borderCssString');
.drawer {
  z-index: 100;
  .drawer-sections {
    place-content: space-between;
    height: inherit;
  }
}

.action-btn-wrapper {
  display: flex;
  align-items: center;

  &:deep(.q-layout) {
    min-height: 0 !important;
  }

  .action-btn {
    @include media-query-spacings($responsiveSpacing, $sizes);

    box-shadow: $shadows;
    display: $displayAuth;
    border: $border;
    border-radius: v-bind('localOptions.borderRadius');

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

    &.img-btn {
      &:deep(.q-btn__content) {
        margin: 0;
      }

      &:deep(.q-focus-helper) {
        display: none;
      }
    }

    .user-avatar {
      font-size: 40px;
      :deep(.lazy-img){
        border: 1.5px solid #FFC8C7;
      }
    }

    .info-name {
      width: 120px;
      display: block;
      vertical-align: middle;
      margin-right: $space-2;
      text-align: right;
    }
  }

  .separator {
    height: 16px;
    align-self: center;
    color: $grey4;
  }
}
</style>
