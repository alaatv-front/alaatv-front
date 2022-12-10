<template>
  <q-card class="set-item-box">
    <router-link :to="{
      name: 'User.Set.Show',
      params: { id: set.id? set.id:-1, title: set.title }
    }"
    >
      <div class="img-box">
        <div class="img-videos">
          <div class="flex">
            <div class="play-icon"></div>
            {{ set.contents_count }} ویدیو
          </div>
          <div class="flex">
            <div class="tv"></div>
            ریاضی کنکور
          </div>
        </div>
        <div class="img-container">
          <lazy-img :src="set.photo"
                    class="img"
                    :alt="set.title"
                    width="16"
                    height="9"
          />
        </div>
      </div>
      <div class="set-content-box">
        <div class="main-title ellipsis-2-lines">
          {{ set.title }}
        </div>
      </div>
    </router-link>
    <div class="info-box">
      <div class="teacher-info">
        <div class="teacher-image">
          <lazy-img :src="set.author?.photo"
                    alt="set"
                    width="1"
                    height="1"
          />
        </div>
        <div class="teacher-name">
          {{ set.author?.first_name + ' ' + set.author?.last_name }}
        </div>
      </div>
      <!-- <div class="teacher-score">
          <div class="total-score">
            <div class="counts-score">(۶۲۵)</div>
            ۳.۸
            <div class="star-score"></div>
          </div>
        </div> -->
      <div class="three-dots"></div>
    </div>
  </q-card>
</template>

<script>
import { Set } from 'src/models/Set'
import LazyImg from 'components/lazyImg'

export default {
  name: 'setItem',
  components: {
    LazyImg
  },
  props: {
    data: {
      type: Set,
      default: new Set()
    }
  },
  data: () => ({
    set: new Set()
  }),
  mounted() {
    this.set = new Set(this.data)
  }
}
</script>
