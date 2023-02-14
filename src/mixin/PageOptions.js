const mixinPageOptions = {
  data() {
    return {
      pageConfig: {}
    }
  },
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}

export default mixinPageOptions
