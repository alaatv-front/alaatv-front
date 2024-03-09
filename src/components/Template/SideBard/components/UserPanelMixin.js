const UserPanelMixin = {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['onClick'],
  data () {
    return {
      defaultItem: {
        icon: null,
        title: null,
        route: null,
        selected: false
      }
    }
  },
  computed: {
    localItem () {
      return Object.assign(this.defaultItem, this.item)
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick', this.item)
    }
  }
}

export default UserPanelMixin
