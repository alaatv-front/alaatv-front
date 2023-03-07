<template>
  <div v-if="set.contents || set.pamphlets_count"
       class="product-contents-widget"
       :class="options.className"
       :style="options.style">
    <div class="bg-pink-4 q-pa-md q-mb-md">
      <q-select v-model="setTitle"
                :options="setOptions"
                class="bg-white q-px-md"
                style="width: 50%" />
    </div>
    <div class="previewSetsOfProduct">
      <q-tabs v-model="tab"
              indicator-color="transparent"
              active-color="black"
              class="text-grey-5 shadow-2 tabs">
        <q-tab name="videos"
               class="tab">
          <span>فیلم ها</span>
        </q-tab>
        <q-tab v-if="pamphlets.length > 0"
               name="pamphlets"
               class="tab">
          <span>جزوات</span>
        </q-tab>
        <q-tab v-else
               name="pamphlets"
               class="tab">
          <span>بدون جزوه</span>
        </q-tab>
      </q-tabs>
      <q-tab-panels v-model="tab"
                    animated
                    transition-prev="scale"
                    transition-next="scale"
                    class="bg-white text-black text-center">
        <q-tab-panel v-if="videos.length > 0"
                     name="videos">
          <div v-dragscroll
               class="contents-block">
            <div v-for="video in videos"
                 :key="video.id">
              <content-item class="q-mr-md"
                            :options="video" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel v-if="pamphlets.length > 0"
                     name="pamphlets">
          <div v-dragscroll
               class="contents-block">
            <div v-for="pamphlet in pamphlets"
                 :key="pamphlet.id"
                 class="q-mx-md">
              <img src="/img/PDF_file_icon.svg.png"
                   :alt="pamphlet.title"
                   style="width: 100px; height: 100px">
            </div>
          </div>
        </q-tab-panel>
        <q-banner v-else
                  inline-actions
                  rounded
                  class="bg-blue text-white">جزوه ای وجود ندارد</q-banner>
      </q-tab-panels>
    </div>
  </div>

</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { Product } from 'src/models/Product'
import { Set } from 'src/models/Set'
import { dragscroll } from 'vue-dragscroll'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'

export default {
  name: 'ProductContents',
  components: {
    ContentItem
  },
  directives: {
    dragscroll
  },
  mixins: [mixinPrefetchServerData],
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
      set: new Set(),
      product: new Product(),
      index: null,
      tab: 'pamphlets',
      videos: [],
      pamphlets: [],
      setTitle: null,
      setOptions: []
    }
  },
  computed: {
    productId () {
      if (typeof this.options.productId !== 'undefined' && this.options.productId !== null) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    }
  },
  watch: {
    options: {
      handler() {
        this.getProduct()
      },
      deep: true
    },
    setTitle(newVal) {
      const set = this.product.sets.list.filter(set => set.title === newVal)
      this.getSet(set[0].id)
    }
  },
  methods: {
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (data) {
      this.product = data
      this.product.sets.list.forEach(set => {
        this.setOptions.push(set.title)
      })
      this.setTitle = this.setOptions[0]
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    getProduct() {
      return APIGateway.product.show(this.productId)
    },
    getSet(id) {
      APIGateway.set.show(id)
        .then(set => {
          set.contents.list.forEach(content => {
            if (content.type === 8) {
              this.videos.push(content)
            } else {
              this.pamphlets.push(content)
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-contents-widget {
  .tabs {
    .tab {
      font-size: 30px !important;
    }
  }

  .previewSetsOfProduct:before {
    content: ' ';
    border-right: solid 25px transparent;
    border-left: solid 25px transparent;
    border-bottom: solid 25px white;
    position: absolute;
    left: 75%;
    top: 65px;
  }

  .previewSetsOfProduct {
    .contents-block {
      display: flex;
      overflow: auto;
      padding: 10px 0 0 0;
      background: #ffffff;
      margin-right: 20px;
      border-radius: 20px;
    }
  }
}
</style>
