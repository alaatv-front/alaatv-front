<template>
  <div :style="options.style">
    <div v-for="(block, index) in blocksToShow"
         :key="index"
         class="block-list-widget"
    >
      <Block
        :data="block"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import Block from 'components/Widgets/Block/Block.vue'

export default {
  name: 'BlockList',
  components: { Block },
  props: {
    options: {
      type: Object,
      default: () => {}
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
      this.getBlocksByRequest()
    },

    getBlocksByRequest() {
      this.blocks.loading = true
      let promise = null
      promise = this.getApiRequest()
      promise
        .then((response) => {
          this.blocks = response

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
            TTL: 10000
          }
        })
      }
      if (this.options.apiName === 'shop') {
        return this.$apiGateway.pages.shop({
          cache: {
            TTL: 10000
          }
        })
      }
    }
  }
}
</script>

<style
  lang="scss"
  scoped
></style>
