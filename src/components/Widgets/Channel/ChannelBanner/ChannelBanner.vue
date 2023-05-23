<template>
  <div class="ChannelBanner q-py-lg row justify-center">
    <div class="photo col-12 col-md-9">
      <lazy-img :src="localOptions.channel.photo" />
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Channel } from 'src/models/Channel.js'
import LazyImg from 'components/lazyImg.vue'

export default {
  name: 'ChannelBanner',
  components: { LazyImg },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        channel: new Channel()
      }
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
