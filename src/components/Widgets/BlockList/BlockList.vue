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
import Block from 'src/components/Widgets/Block/Block.vue'

export default {
  name: 'BlockList',
  components: { Block },
  props: {
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      blocks: {}
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
  created () {
    this.loadBlocks()
  },
  methods: {
    loadBlocks() {
      this.blocks.loading = true
      this.getApiRequest()
        .then((blockList) => {
          this.blocks = blockList
          this.blocks.loading = false
        })
        .catch(() => {
          this.blocks.loading = false
        })
    },

    getBlocks(blocks) {
      if (!blocks || !blocks.list || blocks.list.length === 0) {
        return
      }
      return blocks.list.slice(this.options.from, this.options.to)
    },

    getApiRequest() {
      if (this.options.apiName === 'home') {
        return this.$apiGateway.pages.home({
          cache: {
            TTL: 100000
          }
        })
      }
      if (this.options.apiName === 'shop') {
        return this.$apiGateway.pages.shop()
      }
      if (this.options.apiName === 'content') {
        return this.$apiGateway.content.relatedProducts({ id: this.options.contentId })
      }

      return Promise.reject('wrong api name')
    }
  }
}
</script>

<style
  lang="scss"
  scoped></style>
