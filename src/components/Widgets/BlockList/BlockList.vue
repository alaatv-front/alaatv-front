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
import { mixinWidget } from "src/mixin/Mixins";
import Block from "components/Widgets/Block/Block";
import { BlockList } from "src/models/Block";
import GetWidgetsData from "src/assets/js/GetWidgetsData.js";

export default {
  name: "BlockList",
  components: { Block },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      blocks: {}
    };
  },
  created() {
    this.loadBlocks();
  },

  computed: {
    blocksToShow() {
      return this.getBlocks(this.blocks);
    }
  },

  watch: {
    blocks() {
      this.blocks.list.forEach((block, index) => {
        block.headerCustomClass = `banner-header-${index}` + " ";
      });
    }
  },

  methods: {
    loadBlocks() {
      this.getBlocksByRequest();
    },

    getBlocksByRequest(url) {
      this.blocks.loading = true;
      let promise = null;
      promise = this.getApiRequest()
      promise
        .then((response) => {
          this.blocks = response;

          this.blocks.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.blocks.loading = false;
        });
    },

    getBlocks(blocks) {
      if (!blocks || !blocks.list || blocks.list.length === 0) {
        return;
      }
      return blocks.list.slice(this.options.from, this.options.to);
    },

    getApiRequest() {
      if (this.options.apiName === 'home') {
        return this.$api_gateway.pages.home({
          cache: {
            TTL: 100000
          }
        })
      }
      if(this.options.apiName === 'shop') {
        return this.$api_gateway.pages.shop()
      }
    }
  }
};
</script>

<style
  lang="scss"
  scoped
></style>
