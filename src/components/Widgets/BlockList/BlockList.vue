<template>
  <div :style="options.style">
    <template v-if="blocks.loading">
      <q-skeleton height="100px"
                  class="q-mb-sm" />
      <q-skeleton height="100px"
                  class="q-mb-sm" />
      <q-skeleton height="100px"
                  class="q-mb-sm" />
      <q-skeleton height="100px"
                  class="q-mb-sm" />
    </template>
    <template v-else>
      <div v-for="(block, index) in blocksToShow"
           :key="index"
           class="block-list-widget">
        <block :options="block" />
      </div>
    </template>
  </div>
</template>

<script>
import { BlockList } from 'src/models/Block.js'
import Block from 'src/components/Widgets/Block/Block.vue'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'BlockList',
  components: { Block },
  mixins: [mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      blocks: new BlockList()
    }
  },
  computed: {
    blocksToShow() {
      return this.getBlocks(this.blocks)
    }
  },
  watch: {
    options: {
      handler() {
        this.loadBlocks()
      },
      deep: true
    },
    blocks() {
      this.blocks.list.forEach((block, index) => {
        block.headerCustomClass = `banner-header-${index}` + ' '
      })
    }
  },

  methods: {
    prefetchServerDataPromise () {
      this.blocks.loading = true
      return this.getApiRequest()
    },
    prefetchServerDataPromiseThen (data) {
      this.blocks = data
      this.blocks.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.blocks.loading = false
    },

    getBlocks(blocks) {
      if (!blocks || !blocks.list || blocks.list.length === 0) {
        return []
      }
      return blocks.list.slice(this.options.from, this.options.to)
    },
    getApiRequest() {
      if (this.options.apiName === 'home') {
        return this.$apiGateway.pages.home()
      }
      if (this.options.apiName === 'shop') {
        return this.$apiGateway.pages.shop()
      }
      if (this.options.apiName === 'content') {
        return this.$apiGateway.content.relatedProducts(this.options.contentId)
      }

      return Promise.reject('wrong api name')
    }
  }
}
</script>

<style
  lang="scss"
  scoped></style>
