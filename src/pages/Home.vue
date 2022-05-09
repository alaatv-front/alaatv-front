<template>
  <div>
    <block v-for="(data, index) in this.pageData.list" :key="index" :block="data"/>
  </div>
</template>

<script>
import Block from 'components/Widgets/Block/Block'
import API_ADDRESS from 'src/api/Addresses'
import { BlockList } from 'src/models/Block'
export default {
  name: 'BaseComponent',
  components: { Block },
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
