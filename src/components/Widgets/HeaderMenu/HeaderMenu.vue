<template>
  <div ref="headerMenu"
       class="header-menu row"
       :class="localOptions.className"
       :style="options.style">
    <div v-if="localOptions.logoImage"
         class="right-section col"
         @click="routeTo('Public.Home')">
      <lazy-img :src="localOptions.logoImage"
                :alt="'logo'"
                width="40"
                height="40"
                class="logo-pic-img" />
      <div class="logo-text">
        {{ localOptions.logoSlogan }}
      </div>
    </div>
    <div v-else
         class="right-section col">
      <component :is="component.name"
                 v-for="(component, index) in localOptions[size].rightSectionWidgets"
                 :key="index"
                 :options="component.options" />
    </div>
    <div v-if="localOptions.menuLink.length > 0"
         class="center-section col-grow">
      <q-list class="routes-list">
        <q-item v-for="(item, index) in localOptions.menuLink"
                :key="item"
                class="route-link"
                clickable
                @click="takeAction(item)">
          <q-item-section>{{ item.label }}</q-item-section>
          <q-separator v-if="index < localOptions.menuLink.length - 1"
                       class="separator"
                       vertical />
        </q-item>
      </q-list>
    </div>
    <div v-else
         class="center-section col-grow">
      <div v-for="(component, index) in localOptions[size].centerSectionWidgets"
           :key="index"
           class="row">
        <component :is="component.name"
                   :options="component.options" />
      </div>
    </div>
    <div v-if="localOptions.hasAction"
         class="left-section col justify-end">
      <q-btn v-if="localOptions.hasAction"
             flat
             :label="localOptions.actionObject.buttonLabel"
             @click="takeAction(localOptions.actionObject)" />
    </div>
    <div v-else
         class="left-section col justify-end">
      <component :is="component.name"
                 v-for="(component, index) in localOptions[size].leftSectionWidgets"
                 :key="index"
                 :options="component.options" />
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { openURL } from 'quasar'
import { mixinWidget } from 'src/mixin/Mixins.js'
import TextWidget from 'components/Widgets/TextWidget/TextWidget.vue'
import ImageWidget from 'components/Widgets/ImageWidget/ImageWidget.vue'
import ActionButton from 'components/Widgets/ActionButton/ActionButton.vue'
import Timer from 'components/Widgets/Timer/Timer.vue'

export default {
  name: 'HeaderMenu',
  components: {
    LazyImg,
    TextWidget,
    ImageWidget,
    ActionButton,
    Timer
  },
  mixins: [mixinWidget],
  data() {
    return {
      scrollEventIsAdded: false,
      windowWidth: 0,
      defaultOptions: {
        xs: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        sm: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        md: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        lg: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        xl: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        sticky: false,
        stickyClass: '',
        salam: '',
        style: {},
        className: '',
        backgrounds: {
          xs: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          sm: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          md: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          lg: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          xl: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          }
        },
        menuLink: [],
        logoImage: null,
        logoSlogan: null,
        hasAction: false,
        actionObject: {
          buttonLabel: null,
          type: null,
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        }
      }
    }
  },
  computed: {
    size() {
      if (this.windowWidth >= 1920) {
        return this.isConfigExist('xl') ? 'xl' : this.isConfigExist('lg') ? 'lg' : this.isConfigExist('md') ? 'md' : this.isConfigExist('sm') ? 'sm' : 'xs'
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        return this.isConfigExist('lg') ? 'lg' : this.isConfigExist('md') ? 'md' : this.isConfigExist('sm') ? 'sm' : this.isConfigExist('xs') ? 'xs' : 'xl'
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        return this.isConfigExist('md') ? 'md' : this.isConfigExist('sm') ? 'sm' : this.isConfigExist('xs') ? 'xs' : this.isConfigExist('xl') ? 'xl' : 'lg'
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
        return this.isConfigExist('sm') ? 'sm' : this.isConfigExist('xs') ? 'xs' : this.isConfigExist('xl') ? 'xl' : this.isConfigExist('lg') ? 'lg' : 'md'
      } else if (this.windowWidth <= 599) {
        return this.isConfigExist('xs') ? 'xs' : this.isConfigExist('xl') ? 'xl' : this.isConfigExist('lg') ? 'lg' : this.isConfigExist('md') ? 'md' : 'sm'
      } else {
        return ''
      }
    }
  },
  watch: {
    'localOptions.sticky': function (newVal) {
      if (newVal) {
        this.scrollEventIsAdded = true
        this.addScrollEventListener()
      } else if (!this.scrollEventIsAdded) {
        this.scrollEventIsAdded = false
        window.removeEventListener('scroll', () => {})
        document.getElementsByClassName('header-menu')[0].classList.remove('fix-position')
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      if (this.localOptions.sticky) {
        this.scrollEventIsAdded = true
        this.addScrollEventListener()
      }
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', this.onResize)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    isConfigExist(size) {
      return this.localOptions[size].rightSectionWidgets.length > 0 || this.localOptions[size].centerSectionWidgets.length > 0 || this.localOptions[size].leftSectionWidgets.length > 0
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    toggleLeftDrawer() {
      this.drawer = !this.drawer
    },
    addScrollEventListener() {
      window.addEventListener('scroll', () => {
        if (!this.isInViewport() && !document.getElementsByClassName('header-menu')[0].classList.value.includes('fix-position')) {
          document.getElementsByClassName('header-menu')[0].classList.add('fix-position')
        } else if (this.isInViewport() && document.getElementsByClassName('header-menu')[0].classList.value.includes('fix-position')) {
          document.getElementsByClassName('header-menu')[0].classList.remove('fix-position')
        }
      })
    },
    isInViewport() {
      const el = document.getElementsByClassName(this.localOptions.stickyClass)[0]
      if (!el) {
        return false
      }
      const rect = el.getBoundingClientRect()
      return rect.top <= rect.height && rect.bottom >= 0
    },
    routeTo(name) {
      this.$router.push({ name })
    },
    takeAction(item) {
      if (item.type === 'link') {
        openURL(item.route)
      } else if (item.type === 'scroll') {
        if (item.scrollTo) {
          this.scrollToElement(item.scrollTo)
        } else {
          this.scrollToElement(item.className)
        }
      } else if (item.type === 'event') {
        this.$bus.emit(item.eventName, item.eventArgs)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "quasar-ui-q-page-builder/src/components/Component";

$backgrounds: (
  xs: (
    size: v-bind('defaultOptions.backgrounds.xs.size'),
    color: v-bind('defaultOptions.backgrounds.xs.color'),
    image: v-bind('defaultOptions.backgrounds.xs.image'),
    repeat: v-bind('defaultOptions.backgrounds.xs.repeat'),
    position: v-bind('defaultOptions.backgrounds.xs.position'),
    attachment: v-bind('defaultOptions.backgrounds.xs.attachment')
  ),
  sm: (
    size: v-bind('defaultOptions.backgrounds.sm.size'),
    color: v-bind('defaultOptions.backgrounds.sm.color'),
    image: v-bind('defaultOptions.backgrounds.sm.image'),
    repeat: v-bind('defaultOptions.backgrounds.sm.repeat'),
    position: v-bind('defaultOptions.backgrounds.sm.position'),
    attachment: v-bind('defaultOptions.backgrounds.sm.attachment')
  ),
  md: (
    size: v-bind('defaultOptions.backgrounds.md.size'),
    color: v-bind('defaultOptions.backgrounds.md.color'),
    image: v-bind('defaultOptions.backgrounds.md.image'),
    repeat: v-bind('defaultOptions.backgrounds.md.repeat'),
    position: v-bind('defaultOptions.backgrounds.md.position'),
    attachment: v-bind('defaultOptions.backgrounds.md.attachment')
  ),
  lg: (
    size: v-bind('defaultOptions.backgrounds.lg.size'),
    color: v-bind('defaultOptions.backgrounds.lg.color'),
    image: v-bind('defaultOptions.backgrounds.lg.image'),
    repeat: v-bind('defaultOptions.backgrounds.lg.repeat'),
    position: v-bind('defaultOptions.backgrounds.lg.position'),
    attachment: v-bind('defaultOptions.backgrounds.lg.attachment')
  ),
  xl: (
    size: v-bind('defaultOptions.backgrounds.xl.size'),
    color: v-bind('defaultOptions.backgrounds.xl.color'),
    image: v-bind('defaultOptions.backgrounds.xl.image'),
    repeat: v-bind('defaultOptions.backgrounds.xl.repeat'),
    position: v-bind('defaultOptions.backgrounds.xl.position'),
    attachment: v-bind('defaultOptions.backgrounds.xl.attachment')
  )
);

.header-menu {
  @include media-query-backgrounds($backgrounds, $sizes);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-section {
    cursor: pointer;
    display: flex;
    height: 72px;
    align-items: center;

    @media screen and (width <= 1023px) {
      height: 64px;
    }

    .logo-pic-img {
      height: 40px;
      width: 40px;

      @media screen and (width <= 1023px) {
        height: 48px;
        width: 48px;
      }
    }

    .logo-text {
      padding: 0 10px;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
    }
  }

  .center-section {
    display: flex;
    align-items: center;

    .routes-list {
      display: flex;

      .route-link {
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        cursor: pointer;
        position: relative;

        &:deep(.q-focus-helper) {
          display: none;
        }
      }
    }
  }

  .left-section {
    display: flex;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;

    &:deep(.q-btn .q-focus-helper) {
      display: none;
    }
  }

  &.fix-position {
    width: 100%;
    position: fixed;
    z-index: 10;
    transition: all 4s ease-in-out 2s;
  }
}
</style>
