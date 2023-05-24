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
        <block-list v-if="localOptions.channel.normal_blocks.list.length > 0"
                    :options="{
                      blocks: localOptions.channel.normal_blocks
                    }" />
        <div v-else>
          <div>محتوایی برای نمایش وجود ندارد</div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="future_blocks">
        <block-list v-if="localOptions.channel.future_blocks.list.length > 0"
                    :options="{
                      blocks: localOptions.channel.future_blocks,
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
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Channel } from 'src/models/Channel.js'
import BlockList from 'components/Widgets/BlockList/BlockList.vue'

export default {
  name: 'ChannelTabPanel',
  components: { BlockList },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        channel: new Channel()
      },
      tab: 'normal_blocks'
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
