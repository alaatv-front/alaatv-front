<template>
  <div :style="defaultOptions.style">
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
        <block :options="{block}" />
      </div>
    </template>
  </div>
</template>

<script>
import { BlockList } from 'src/models/Block.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import Block from 'src/components/Widgets/Block/Block.vue'

export default {
  name: 'BlockList',
  components: { Block },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      blocks: new BlockList(),
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        from: 0,
        to: -1
      }
    }
  },
  computed: {
    blocksToShow() {
      if (!this.blocks || !this.blocks.list || this.blocks.list.length === 0) {
        return []
      }

      return this.blocks.list.slice(this.defaultOptions.from, this.defaultOptions.to)
    }
  },
  watch: {
    options: {
      handler() {
        this.getApiRequest()
          .then((data) => {
            this.prefetchServerDataPromiseThen(data)
          })
          .catch(() => {
            this.prefetchServerDataPromiseCatch()
          })
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
    getApiRequest() {
      if (this.defaultOptions.apiName === 'home') {
        return this.$apiGateway.pages.home()
      }
      if (this.defaultOptions.apiName === 'shop') {
        return this.$apiGateway.pages.shop()
      }
      if (this.defaultOptions.apiName === 'content') {
        return this.$apiGateway.content.relatedProducts(this.defaultOptions.contentId)
      }

      return Promise.reject('wrong api name')
    }
  }
}
</script>

<style
  lang="scss"
  scoped></style>
