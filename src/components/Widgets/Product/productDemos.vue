<template>
  <div class="row product-demos-widget">
    <div class="col-md-7">
      <p>نمونه فیلم ها</p>
      <div
        v-if="contents.list && contents.list.length > 0"
        class="contents-block"
        v-dragscroll
      >
        <div
          v-for="content in contents.list"
          :key="content.id"
        >
          <content-item
            class="q-mr-md"
            :data="content"
          />
        </div>
      </div>
    </div>
    <div class="col-md-5">
      <p>نمونه جزوه ها</p>
      <div
        v-if="pamphlets && pamphlets.length > 0"
        class="contents-block"
        v-dragscroll
      >
        <div
          v-for="pamphlet in pamphlets"
          :key="pamphlet.id"
        >
          <div class="pamphlet-image">
            <q-img :src="pamphlet.photo" alt="pamphlet-photo"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
import ContentItem from 'components/Widgets/ContentItem/contentItem'
import { dragscrollNext as dragscroll } from 'vue-dragscroll'
import {ContentList} from 'src/models/Content'

export default {
  name: 'productDemos',
  mixins:[mixinWidget],
  components: { ContentItem },
  directives: {
    dragscroll
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      contents: new ContentList(),
      pamphlets: []
    }
  },
  watch: {
    data: {
      deep: true,
      handler (newValue) {
        this.contents = new ContentList(newValue.contents)
        this.pamphlets = newValue.sample_photos
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-demos-widget {
  display: flex;
  justify-content: space-between;
  .contents-block {
    display: flex;
    overflow: auto;
    padding: 10px 0 0 0;
    background: #ffffff;
    margin-right: 20px;
    border-radius: 20px;

    .pamphlet-image {
      min-width: 157px;
      height: 223px;
      background-color: #F2F2F2;
      color: #fdeded;
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(54 90 145 / 5%);
      border-radius: 16px;
      margin: 10px 0 19px 16px;
      cursor: pointer;
      &:deep(.q-img__image) {
      border-radius: 10px;
    }
    }
  }
}
</style>
