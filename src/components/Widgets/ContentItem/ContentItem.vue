<template>
  <q-card class="content-item-box">
    <router-link :to="{
      name: 'User.Content.Show',
      params: { id: content.id? content.id:-1, title: content.title }
    }"
    >
      <div class="img-box">
        <div class="img-title-container">
          <lazy-img :src="content.photo"
                    :alt="content.title"
                    class="img"
                    width="16"
                    height="9"
          />
        </div>
        <div class="play-btn">
          <div class="play-icon"></div>
        </div>
      </div>
      <div class="content-content-box">
        <div class="main-title ellipsis-2-lines">
          {{ content.title }}
        </div>
      </div>
    </router-link>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content'
import LazyImg from 'components/lazyImg'

export default {
  name: 'contentItem',
  components: { LazyImg },
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
