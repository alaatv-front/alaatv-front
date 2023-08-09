<template>
  <div ref="headerMenu"
       class="header-menu"
       :class="localOptions.className"
       :style="options.style">
    <div v-if="localOptions.logoImage"
         class="right-section"
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
         class="right-section">
      <component :is="component.name"
                 v-for="(component, index) in localOptions.rightSectionWidgets"
                 :key="index"
                 :options="component.options" />
    </div>
    <div v-if="localOptions.menuLink"
         class="center-section">
      <q-list class="routes-list">
        <q-item v-for="item in localOptions.menuLink"
                :key="item"
                class="route-link"
                clickable
                @click="takeAction(item)">
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else
         class="center-section">
      <component :is="component.name"
                 v-for="(component, index) in localOptions.centerSectionWidgets"
                 :key="index"
                 :options="component.options" />
    </div>
    <div v-if="localOptions.hasAction"
         class="left-section">
      <q-btn v-if="localOptions.hasAction"
             flat
             :label="localOptions.actionObject.buttonLabel"
             @click="takeAction(localOptions.actionObject)" />
    </div>
    <div v-else
         class="left-section">
      <component :is="component.name"
                 v-for="(component, index) in localOptions.leftSectionWidgets"
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
      defaultOptions: {
        rightSectionWidgets: [],
        centerSectionWidgets: [],
        leftSectionWidgets: [],
        sticky: false,
        stickyClass: '',
        salam: '',
        style: {},
        className: '',
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
  watch: {
    'localOptions.sticky': function (newVal) {
      if (newVal) {
        this.scrollEventIsAdded = true
        window.addEventListener('scroll', () => {
          if (!this.isInViewport() && !document.getElementsByClassName('sticky-menu')[0].classList.value.includes('fix-position')) {
            document.getElementsByClassName('sticky-menu')[0].classList.add('fix-position')
          } else if (this.isInViewport() && document.getElementsByClassName('sticky-menu')[0].classList.value.includes('fix-position')) {
            document.getElementsByClassName('sticky-menu')[0].classList.remove('fix-position')
          }
        })
      } else if (!this.scrollEventIsAdded) {
        this.scrollEventIsAdded = false
        window.removeEventListener('scroll')
        document.getElementsByClassName('sticky-menu')[0].classList.remove('fix-position')
      }
    }
  },
  methods: {
    isInViewport() {
      const el = document.getElementsByClassName(this.localOptions.stickyClass)[0]
      const rect = el.getBoundingClientRect()
      return (
        rect.top <= rect.height && rect.bottom >= 0
      )
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
.header-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-section {
    cursor: pointer;
    display: flex;
    height: 72px;
    align-items: center;
    @media screen and (max-width: 1023px) {
      height: 64px;
    }
    .logo-pic-img {
      height: 40px;
      width: 40px;
      @media screen and (max-width: 1023px) {
        height: 48px;
        width: 48px;
      }
    }
    .logo-text {
      padding: 0 10px;
      padding: 0 10px;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
    }
  }

  .center-section {
    display: flex;
    align-items: center;
    @media only screen and (max-width: 1024px) {
      display: none;
    }
    .routes-list {
      display: flex;

      .route-link {
        margin: 0 20px;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        cursor: pointer;

        &:deep(.q-focus-helper) {
          display: none;
        }
      }
    }
  }

  .left-section {
    display: flex;
    margin: 0 20px;
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
    top: 5px;
    z-index: 1000;
  }
}
</style>
