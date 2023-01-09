<template>
  <div class="row product-demos-widget"
       :class="options.className"
       :style="options.style"
  >
    <div v-if="contents.blocks && contents.blocks.length > 0"
         class="demos-container col-md-12">
      <p class="section-title">نمونه فیلم ها</p>
      <div
        v-dragscroll
        class="contents-block"
      >
        <div
          v-for="content in contents.list"
          :key="content.id"
        >
          <content-item
            class="q-mr-md"
            :options="content"
          />
        </div>
      </div>
    </div>
    <div v-if="pamphlets && pamphlets.length > 0"
         class="demos-container col-md-12">
      <p class="section-title">نمونه جزوه ها</p>
      <div
        v-dragscroll
        class="contents-block"
      >
        <div v-for="pamphlet in pamphlets"
             :key="pamphlet.id"
             class="pamphlet-image">
          <vue-picture-swipe :items="[
            {
              src: pamphlet.photo,
              thumbnail: pamphlet.photo,
              w:600,
              h: 400,
              title: pamphlet.title
            }
          ]"></vue-picture-swipe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'
import { dragscroll } from 'vue-dragscroll'
import { ContentList } from 'src/models/Content'
import { APIGateway } from 'src/api/APIGateway'
import { Product } from 'src/models/Product'
import VuePictureSwipe from 'vue3-picture-swipe'

export default {
  name: 'productDemos',
  components: {
    ContentItem,
    VuePictureSwipe
  },
  directives: {
    dragscroll
  },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      contents: new ContentList(),
      pamphlets: []
    }
  },
  // watch: {
  //   options: {
  //     deep: true,
  //     handler (newValue) {
  //       this.contents = new ContentList(newValue.contents)
  //       this.pamphlets = newValue.sample_photos
  //     }
  //   }
  // },
  mounted() {
    this.loadProduct()
  },
  methods: {
    getProductId() {
      if (this.options.productId) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return null
    },
    loadProduct() {
      const productId = this.getProductId()
      if (!productId) {
        return
      }

      this.getProduct(productId)
    },
    getProduct(productId) {
      APIGateway.product.show({
        data: { id: productId },
        cache: { TTL: 10000 }
      })
        .then(product => {
          this.contents = new Product(product)
          this.pamphlets = product.sample_photos
        })
        .catch(() => {
          this.product.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-demos-widget {
  display: flex;
  justify-content: center;

  .demos-container {
    width: 1140px;
  }

  .section-title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;

    &::before {
      content: ".";
      color: #BAD9FB;
      font-size: 50px;
      font-weight: bold;
      line-height: 10px;
      margin-right: 4px;
    }

  }

  .contents-block {
    display: flex;
    overflow: auto;
    padding: 10px 0 0 0;
    background: #ffffff;
    margin-right: 20px;
    border-radius: 20px;

    .pamphlet-image {
      min-width: 157px;
      height: 223px;
      background-color: #F2F2F2;
      color: #fdeded;
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(54 90 145 / 5%);
      border-radius: 16px;
      margin: 10px 8px 19px 8px;
      cursor: pointer;

      &:deep(.q-img__image) {
        border-radius: 10px;
      }
    }
  }
}
</style>
