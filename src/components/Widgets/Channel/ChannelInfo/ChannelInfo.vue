<template>
  <div class="ChannelInfo q-py-lg">
    <q-card class="custom-card ChannelInfo-card"
            flat>
      <q-skeleton v-if="loading"
                  height="150px" />
      <div v-if="!loading">
        <q-card-section>
          {{ channel.title }}
        </q-card-section>
        <q-separator />
        <q-card-section class="box row q-gutter-x-lg q-pa-lg">
          <div class="photo col-12 col-md-3 q-pa-lg q-pa-md-none">
            <lazy-img :src="channel.photo" />
          </div>
          <div class="text col-12 col-md-8 q-pa-lg q-pa-md-none"
               v-html="channel.description" />
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Channel } from 'src/models/Channel.js'
import LazyImg from 'components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ChannelInfo',
  components: { LazyImg },
  mixins: [mixinWidget],
  data () {
    return {
      channel: new Channel(),
      loading: false
    }
  },
  mounted () {
    this.setChannel()
  },
  methods: {
    setChannel () {
      const id = this.$route.params.id
      APIGateway.channel.getChannel({ id })
        .then(channel => {
          this.channel = channel
        })
        .catch(() => {})
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
