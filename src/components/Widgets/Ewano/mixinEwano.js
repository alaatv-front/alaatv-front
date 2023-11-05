const mixinEwano = {
  data () {
    return {
      isEwanoUser: false
    }
  },
  mounted () {
    this.setIsEwanoUserValue()
  },
  methods: {
    setIsEwanoUserValue () {
      if (typeof window === 'undefined') {
        return false
      }
      this.isEwanoUser = window.location.search.indexOf('ewano=1') > 0
    }
  }
}

export default mixinEwano
