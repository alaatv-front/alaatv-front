<template>
  <div class="product-page">
    hi
  </div>
</template>

<script>
import { openURL } from 'quasar'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
// import ExpansionItemComponent from 'src/components/Utils/ExpansionItem.vue'
// import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'TripleTitleSetProductPage',
  components: {
    // ProductItem,
    // ExpansionItemComponent
  },
  mixins: [mixinTripleTitleSet],
  data () {
    return {
      productItemDialog: false
    }
  },
  computed: {
    selectedTopic () {
      // return this.$store.getters['TripleTitleSet/selectedTopic']
      return ''
    },
    setList () {
      // return this.$store.getters['TripleTitleSet/setList']
      //   .filter(set => (new RegExp('\\-\\s*' + this.selectedTopic + '\\s*\\-')).test(set.short_title))
      //   .map(set => {
      //     set.expand = false
      //     return set
      //   })
      return []
    },
    setTopicList () {
      // return this.$store.getters['TripleTitleSet/setTopicList']
      return []
    },
    setLoading () {
      // return this.$store.getters['TripleTitleSet/setLoading']
      return false
    },
    setListLoading () {
      // return this.$store.getters['TripleTitleSet/setListLoading']
      return false
    },
    selectedProduct () {
      // return this.$store.getters['TripleTitleSet/selectedProduct']
      return {}
    }
  },
  watch: {
    setTopicList () {
      if (!this.selectedTopic) {
        // this.$store.dispatch('TripleTitleSet/setSelectedTopic', this.setTopicList[0])
        this.$store.commit('TripleTitleSet/updateSelectedTopic', this.setTopicList[0])
      }
    }
  },
  methods: {
    afterAuthenticate () {
      this.getProductSets(this.$route.params.productId)
      this.getProduct()
    },
    humanizeDuration (durationInSeconds) {
      const durationInMinutes = Math.floor(durationInSeconds / 60)
      const houres = Math.floor(durationInMinutes / 60)
      const minutes = durationInMinutes % 60
      if (houres > 0) {
        return houres + ' ساعت و ' + minutes + ' دقیقه'
      }

      return minutes + ' دقیقه'
    },
    download (content) {
      if (content.can_see === 0) {
        this.toggleProductItemDialog()
      } else if (content.isPamphlet() && content.file !== null && content.file.pamphlet.length > 0) {
        openURL(content.file.pamphlet[0].link)
      }
    },
    toggleProductItemDialog () {
      this.productItemDialog = !this.productItemDialog
    },
    setSelectedData (event, content, set) {
      if (content.isPamphlet()) {
        event.stopPropagation()
      } else {
        this.$store.commit('TripleTitleSet/setSelectedContent', content)
        this.$store.commit('TripleTitleSet/setSelectedSet', set)
      }
    },
    getProductSets (productId) {
      this.$store.dispatch('TripleTitleSet/getSet', productId)
    },
    getSet (setId) {
      this.$store.dispatch('TripleTitleSet/updateSet', setId)
    },
    getProduct () {
      this.$store.dispatch('TripleTitleSet/getSelectedProduct', this.$route.params.productId)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  width: 318px;
  height: 510px;
}

.product-page {
  max-width: 100%;
  padding: 50px 170px 170px;

  @media only screen and (width <= 1450px) {
    padding: 5px;
  }

  .product-set-item-header {
    margin-right: $space-7;

    @include media-max-width('md') {
      margin-right: $space-3;
    }
  }

  .set-list-section {
    padding: $spacing-none;
  }

  .set-title {
    max-width: 70%;

    .set-title-text {
      max-width: 100%;
    }
  }

  .content-title {

  }
}
</style>
