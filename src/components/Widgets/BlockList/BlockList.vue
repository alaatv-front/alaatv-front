<template>
  <div :style="options.style">
    <div v-for="(block, index) in blocksToShow"
         :key="index"
         class="block-list-widget">
      <block :options="block" />
    </div>
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
  created: async function () {
    await this.loadBlocks()
  },

  methods: {
    async loadBlocks() {
      this.blocks.loading = true
      try {
        const response = await this.getApiRequest()
        this.blocks = response
        this.blocks.loading = false
      } catch (e) {
        this.blocks.loading = false
      }
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
    }
  }
}
</script>

<style
  lang="scss"
  scoped></style>
