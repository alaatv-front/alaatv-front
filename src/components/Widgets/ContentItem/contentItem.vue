<template>
  <q-card class="item-box">
    <img :src="content.photo">
    {{content.title}}
    <q-card-section>
      content
    </q-card-section>
  </q-card>

</template>

<script>
import { Content } from 'src/models/Content'

export default {
  name: 'contentItem',
  props: {
    contentData: {
      type: Content,
      default: new Content()
    }
  },
  data: () => ({
    content: new Content()
  }),
  mounted () {
    this.content = new Content(this.contentData)
  }
}
</script>

<style scoped>
.item-box{
  width: 260px;
  border-radius: 20px;
}
</style>
