<template>
  <div v-if="blocks.loading"
       class="BlockList"
       :style="localOptions.style">
    <q-skeleton height="100px"
                class="q-mb-sm" />
    <q-skeleton height="100px"
                class="q-mb-sm" />
    <q-skeleton height="100px"
                class="q-mb-sm" />
    <q-skeleton height="100px"
                class="q-mb-sm" />
  </div>
  <div v-else
       class="BlockList"
       :style="localOptions.style">
    <block v-for="(block, index) in blocksToShow"
           :id="'block-' + block.id"
           :key="index"
           :class="block.headerCustomClass"
           class="block-list-widget"
           :options="{block, productItemOptions: localOptions.productOptions}" />
  </div>
</template>

<script>
import { BlockList } from 'src/models/Block.js'
import { APIGateway } from 'src/api/APIGateway.js'
import Block from 'src/components/Widgets/Block/Block.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'BlockList',
  components: { Block },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data () {
    return {
      blocks: new BlockList(),
      defaultOptions: {
        className: '',
        apiName: 'home',
        height: 'auto',
        style: {},
        from: 0,
        productOptions: {
          theme: 'ThemeDefault',
          className: '',
          height: 'auto',
          boxed: false,
          boxedWidth: 1200,
          style: {},
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: '20px'
          },
          boxShadows: [
            '-2px -4px 10px rgba(255, 255, 255, 0.6)',
            '2px 4px 10px rgba(46, 56, 112, 0.05)'
          ],
          cssHoverEffects: {
            boxShadows: [
              '-5px -6px 10px rgba(255, 255, 255, 0.6)',
              '5px 5px 20px rgba(0, 0, 0, 0.1)'
            ],
            borderStyle: {
              borderCssString: '',
              borderRadiusCssString: '20px'
            },
            transition: {
              time: 0.4
            },
            transform: {
              rotate: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 0,
              skewY: 0,
              translateX: 0,
              translateY: -10
            }
          }
        },
        to: undefined
      }
    }
  },
  computed: {
    blocksToShow () {
      if (!this.blocks || !this.blocks.list || this.blocks.list.length === 0) {
        return []
      }

      if (this.defaultOptions.from > 0 && this.defaultOptions.to > 0) {
        return this.blocks.list.slice(this.defaultOptions.from, this.defaultOptions.to)
      } else if (this.defaultOptions.from > 0) {
        return this.blocks.list.slice(this.defaultOptions.from)
      } else if (this.defaultOptions.to > 0) {
        return this.blocks.list.slice(0, this.defaultOptions.to)
      }

      return this.blocks.list
    }
  },
  watch: {
    options: {
      handler () {
        this.reloadWidget()
      },
      deep: true
    }
  },
  methods: {
    reloadWidget () {
      this.prefetchServerDataPromise()
        .then((data) => {
          this.prefetchServerDataPromiseThen(data)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
    },
    prefetchServerDataPromise () {
      if (this.localOptions.blocks && this.localOptions.blocks.list.length > 0) {
        return new Promise((resolve) => {
          resolve(this.localOptions.blocks)
        })
      }
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen (data) {
      this.blocks = new BlockList(data)
      this.blocks.list.forEach((block, index) => {
        block.headerCustomClass = `block-header-${index}` + ' '
      })
      this.blocks.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.blocks.loading = false
    },
    getApiRequest () {
      this.blocks.loading = true
      if (this.localOptions.apiName === 'home') {
        return APIGateway.pages.home()
      }
      if (this.localOptions.apiName === 'shop') {
        return APIGateway.pages.shop()
      }
      if (this.localOptions.apiName === 'content') {
        return APIGateway.content.relatedProducts(this.defaultOptions.contentId)
      }

      return Promise.reject('wrong api name')
    }
  }
}
</script>
