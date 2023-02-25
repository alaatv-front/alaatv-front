import { createMetaMixin } from 'quasar'
import SeoMeta from 'src/assets/js/SeoMeta.js'

const mixinSEO = {
  data() {
    return {
      pageSeoTitleSection1: '',
      pageSeoTitleSection2: '',
      pageSeoDescription: ''
    }
  },
  mixins: [
    createMetaMixin(function () {
      return SeoMeta.getMixin(this.pageSeoTitleSection1, this.pageSeoTitleSection2, this.pageSeoDescription)
    })
  ],
  created() {
    this.setSeoValues()
  },
  methods: {
    setSeoValues() {
      this.pageSeoTitleSection1 = this.$store.getters['SEO/pageTitleSection1']
      this.pageSeoTitleSection2 = this.$store.getters['SEO/pageTitleSection2']
      this.pageSeoDescription = this.$store.getters['SEO/pageDescription']
    }
  }
}

export default mixinSEO
