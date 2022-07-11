<template>
  <q-card class="item-box">
    <img :src="content.photo">
    <q-card-section>
      <p class="title-box">
        {{content.title}}
      </p>

    </q-card-section>
  </q-card>

</template>

<script>
import { Content } from 'src/models/Content'

export default {
  name: 'contentItem',
  props: {
    data: {
      type: Content,
      default: new Content()
    }
  },
  data: () => ({
    content: new Content()
  }),
  mounted () {
    this.content = new Content(this.data)
  }
}
</script>

<style lang="scss" scoped>
.item-box{
  width: 260px;
  border-radius: 20px;
  margin-bottom: 10px;
  .title-box{
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    height: 48px;
    letter-spacing: -0.03em;
    color: #333333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    &::before{
      content: '.';
      font-size: 40px;
      line-height: 8px;
      color: #958fe2;
      padding-right: 10px;
    }
  }
}
</style>
