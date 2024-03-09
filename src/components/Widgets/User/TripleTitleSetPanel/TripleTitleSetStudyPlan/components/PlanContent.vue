<template>
  <q-item class="plan-item-box">
    <q-item-section>
      <q-item-label>{{content.title}}</q-item-label>
      <q-item-label v-if="content.set.title"
                    caption
                    lines="2">
        {{ content.set.title }}
      </q-item-label>
    </q-item-section>

    <q-item-section side
                    top>
      <q-btn v-if="content.isPamphlet()"
             color="primary"
             round
             unelevated
             :disable="!content.id"
             icon="download"
             class="size-xs"
             @click="downloadPdf(content)" />
      <q-btn v-if="content.isVideo()"
             color="primary"
             round
             unelevated
             :disable="!content.id"
             class="size-xs"
             icon="play_arrow"
             :to="{name:'UserPanel.Asset.TripleTitleSet.Content', params:{ productId: plan.product?.id, setId: content.set?.id, contentId: content?.id}}" />
    </q-item-section>
  </q-item>
</template>

<script>
import { Content } from 'src/models/Content.js'
import { Plan } from 'src/models/Plan'

export default {
  name: 'PlanContent',
  props: {
    plan: {
      type: Plan
    },
    content: {
      type: Content
    }
  },
  methods: {
    downloadPdf (content) {
      if (!content?.file?.pamphlet || !content?.file?.pamphlet[0] || !content?.file?.pamphlet[0].link) {
        this.$q.notify({
          type: 'negative',
          message: 'مشکلی در دانلود فایل pdf این محتوا رخ داده است.'
        })
        return
      }

      window.open(content.file.pamphlet[0].link, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.plan-item-box{
}
</style>
