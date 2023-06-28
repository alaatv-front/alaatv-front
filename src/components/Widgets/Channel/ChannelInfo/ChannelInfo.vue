<template>
  <div class="ChannelInfo q-py-lg">
    <q-card class="custom-card ChannelInfo-card"
            flat>
      <q-skeleton v-if="loading"
                  height="150px" />
      <div v-if="!loading">
        <q-card-section>
          {{ localOptions.channel.title }}
        </q-card-section>
        <q-separator />
        <q-card-section class="box row q-gutter-x-lg q-pa-lg">
          <div class="photo col-12 col-md-3 q-pa-lg q-pa-md-none">
            <lazy-img :src="localOptions.channel.photo" />
          </div>
          <div class="text col-12 col-md-8 q-pa-lg q-pa-md-none">
            {{ localOptions.channel.description }}
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Channel } from 'src/models/Channel.js'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ChannelInfo',
  components: { LazyImg },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        channel: new Channel()
      },
      loading: false
    }
  }
}
</script>

<style scoped lang="scss">
.ChannelInfo {
  .ChannelInfo-card {
    .box{
      .photo {
        border-radius: 15px;
      }
    }
  }
}
</style>
