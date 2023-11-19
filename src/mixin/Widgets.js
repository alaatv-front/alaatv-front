const mixinWidget = {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'onOptionAction'
  ],
  data () {
    return {
      defaultOptions: {}
    }
  },
  watch: {
    editable () {
      this.reloadWidget()
    }
  },
  created () {
    this.mergeOptionsToDefaultOptions()
  },
  computed: {
    localOptions: {
      get () {
        return Object.assign(this.defaultOptions, this.options)
      }
    }
  //   className() {
  //     if (!this.defaultOptions.className) {
  //       this.defaultOptions.className = ''
  //     }
  //     // TODO: adding more vertical align values such as top & bottom
  //     if (this.defaultOptions.verticalAlign === 'center') {
  //       this.defaultOptions.className += ' vertical-align-center'
  //     }
  //     return this.defaultOptions.className
  //   },
  //   style() {
  //     // if fullHeight option is true, then using containerFullHeight (which is come from PageBuilder the parent)
  //     if (this.defaultOptions.fullHeight) {
  //       this.defaultOptions.style.minHeight = this.containerFullHeight
  //     }
  //     return this.defaultOptions.style
  //   }
  },
  methods: {
    takeAction () {
      if (!this.localOptions.action.hasAction) {
        return null
      } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'scroll') {
        this.scrollToElement(this.localOptions.action.scrollTo)
      } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'link') {
        this.redirectRoute(this.localOptions.action.route)
      } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'event') {
        this.$bus.emit(this.localOptions.action.eventName, this.localOptions.action.eventArgs)
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
    reloadWidget () {},
    mergeOptionsToDefaultOptions () {
      Object.assign(this.defaultOptions, this.options)
      if (!this.defaultOptions.style) {
        this.defaultOptions.style = {}
      }
    }
  }
}

export default mixinWidget
