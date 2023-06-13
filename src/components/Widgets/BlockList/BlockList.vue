<template>
  <div :style="localOptions.style">
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
           :id="'block-' + block.id"
           :key="index"
           :class="block.headerCustomClass"
           class="block-list-widget">
        <block :options="{block}" />
      </div>
    </template>
  </div>
</template>

<script>
import { BlockList } from 'src/models/Block.js'
import Block from 'src/components/Widgets/Block/Block.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'BlockList',
  components: { Block },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      blocks: new BlockList(),
      defaultOptions: {
        className: '',
        apiName: 'home',
        height: 'auto',
        style: {},
        from: 0,
        to: undefined
      }
    }
  },
  computed: {
    blocksToShow() {
      if (!this.blocks || !this.blocks.list || this.blocks.list.length === 0) {
        return []
      }
      return this.blocks.list.slice(this.defaultOptions.from, this.defaultOptions.to)
    },
    apiName () {
      if (this.options.apiName) {
        return this.options.apiName
      }

      return this.defaultOptions.apiName
    }
  },
  watch: {
    options: {
      handler() {
        this.reloadWidget()
      },
      deep: true
    },
    blocks() {
      this.blocks.list.forEach((block, index) => {
        block.headerCustomClass = `block-header-${index}` + ' '
      })
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
      if (this.options.blocks && this.options.blocks.list.length > 0) {
        return new Promise((resolve) => {
          resolve(this.options.blocks)
        })
      }
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
      this.blocks.loading = true
      if (this.apiName === 'home') {
        return this.$apiGateway.pages.home()
      }
      if (this.apiName === 'shop') {
        return this.$apiGateway.pages.shop()
      }
      if (this.apiName === 'content') {
        return this.$apiGateway.content.relatedProducts(this.defaultOptions.contentId)
      }

      return Promise.reject('wrong api name')
    }
  }
}
</script>
