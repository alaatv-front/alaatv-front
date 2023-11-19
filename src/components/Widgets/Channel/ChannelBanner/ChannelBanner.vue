<template>
  <div class="ChannelBanner q-py-lg row justify-center">
    <div v-if="channel.photo"
         class="photo col-12 col-md-9">
      <lazy-img :src="channel.photo" />
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Channel } from 'src/models/Channel.js'
import LazyImg from 'components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ChannelBanner',
  components: { LazyImg },
  mixins: [mixinWidget],
  data () {
    return {
      channel: new Channel()
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
.ChannelBanner {
  .photo {
    border-radius: 15px;
  }
}
</style>
