const mixinWidget = {
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    containerFullHeight:{
      type: String,
      default: () => {
        return ""
      }
    }
  },
  data () {
    return {
      defaultOptions: {}
    }
  },

  created () {
    Object.assign(this.defaultOptions, this.options)
  },
  computed: {
    className () {
      if(!this.defaultOptions.className){
        this.defaultOptions.className = ""
      }
      //TODO: adding more vertical align values such as top & bottom
      if(this.defaultOptions.verticalAlign == 'center') {
        this.defaultOptions.className += " vertical-align-center"
      }
      return this.defaultOptions.className
    },
    style(){
      if(!this.defaultOptions.style){
        this.defaultOptions.style = {}
      }
      // if fullHeight option is true, then using containerFullHeight (which is come from PageBuilder the parent)
      if(this.defaultOptions.fullHeight){
        this.defaultOptions.style.minHeight = this.containerFullHeight
      }
      return this.defaultOptions.style;

    }

  },
}

export default mixinWidget
