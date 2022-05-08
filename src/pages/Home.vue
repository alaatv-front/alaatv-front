<template>
  <div class="flex justify-center">
    <block-section v-for="(data, index) in this.pageData.list" :key="index" :block-data="data"/>
  </div>
</template>

<script>
import BlockSection from 'components/Widgets/Block/BlockSection'
import API_ADDRESS from 'src/api/Addresses'
import { BlockList } from 'src/models/Block'
export default {
  name: 'BaseComponent',
  components: { BlockSection },
  created () {
    this.getPageData()
  },
  data () {
    return {
      pageData: new BlockList()
    }
  },
  methods: {
    async getPageData () {
      const response = await this.getBlocksData()
      this.pageData = new BlockList(response.data.data)
      // console.log(this.pageData.list)
    },
    getBlocksData () {
      return this.$axios.get(API_ADDRESS.pages.home)
    }

  }
}
</script>

<style scoped>

</style>
