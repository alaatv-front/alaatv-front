<template>
  <div class="ChannelTabPanel q-py-lg">
    <q-tabs v-model="tab"
            narrow-indicator
            indicator-color="primary"
            active-color="primary"
            dense>
      <q-tab class="tab"
             name="normal_blocks"
             label="دوره های جاری" />
      <q-tab class="tab"
             name="future_blocks"
             label="دوره های آینده" />
    </q-tabs>
    <q-tab-panels v-model="tab"
                  animated
                  class="q-pa-sm panels">
      <q-tab-panel name="normal_blocks">
        <block-list v-if="channel.normal_blocks.list.length > 0"
                    :options="{
                      blocks: channel.normal_blocks
                    }" />
        <div v-else>
          <div>محتوایی برای نمایش وجود ندارد</div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="future_blocks">
        <block-list v-if="channel.future_blocks.list.length > 0"
                    :options="{
                      blocks: channel.future_blocks,
                      apiName: 'none'
                    }" />
        <div v-else>
          <div class="text-large">محتوایی برای نمایش وجود ندارد</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { Channel } from 'src/models/Channel.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BlockList from 'src/components/Widgets/BlockList/BlockList.vue'

export default {
  name: 'ChannelTabPanel',
  components: { BlockList },
  mixins: [mixinWidget],
  data () {
    return {
      channel: new Channel(),
      tab: 'normal_blocks'
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
.ChannelTabPanel {
  .tab {
    :deep(.q-tab__label) {
      font-size: 16px;
      font-weight: 400;
    }
  }

  .panels {
    border-radius: 20px;
  }
}
</style>
