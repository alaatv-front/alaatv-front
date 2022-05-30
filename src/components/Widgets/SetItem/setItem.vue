<template>
  <q-card class="item-box q-mb-md">
    <q-img
      :src="set.photo"
      class="img"
      alt="set"
    />
    <q-card-section
    >
      <p   class="title">
        {{set.title}}
        {{set.title}}
      </p>

    </q-card-section>
  </q-card>
</template>

<script>
import { Set } from 'src/models/Set'

export default {
  name: 'setItem',
  props: {
    data: {
      type: Set,
      default: new Set()
    }
  },
  data: () => ({
    set: new Set()
  }),
  mounted () {
    this.set = new Set(this.data)
    console.log(this.data)
  }

}
</script>

<style lang="scss" scoped>
.item-box{
  width: 260px;
  border-radius: 20px;
  .title{
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    height:48px;
    letter-spacing: -0.03em;
    color: #333333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    &::before{
      content: '.';
      font-size: 50px;
      color: #36a2f5;
      line-height: 10px;
      margin-right: 5px;
    }
  }
}
</style>
