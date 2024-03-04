<template>
  <div class="plan-item-box">
    <div class="plan-item-header" />
    <div class="plan-item-info">
      <div class="item-title">{{ content.title }}</div>
      <div class="item-plan">
        <q-btn v-if="content.isPamphlet()"
               color="primary"
               round
               unelevated
               :disable="!content.id"
               icon="download"
               class="size-xs"
               @click="downloadPdf(content)" />
        <q-btn v-if="content.isLessonVideo()"
               color="primary"
               round
               unelevated
               :disable="!content.id"
               class="size-xs"
               icon="play_arrow"
               :to="{name:'UserPanel.Asset.TripleTitleSet.Content', params:{ productId: plan.product?.id, setId: content.set?.id, contentId: content?.id}}" />
        <span class="item-plan--title">
          {{ content?.title || 'ویدیو ندارد' }}
        </span>
      </div>
    </div>
  </div>
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
  border-radius: $radius-4;
  background: $blue-grey-1;
  padding: $space-4 $space-5 $space-5;

  .plan-item-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .plan-time {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 6px 4px;
      border-radius: 8px;
      background: #ECEFF1;

      &.now {
        background: #FFD54F;
      }
    }
  }

  .plan-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .item-title {
      max-width: 100%;
      color:#424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;
      margin-bottom: 10px;
    }

    .item-plan {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .item-plan--title {
        color: $grey-7;
        @include caption1;
        margin-left: $space-1;
      }
    }
  }

  .plan-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    @media only screen and (width <= 600px) {
      margin-top: 16px;
    }

    .footer-text {
      color: #424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;

      &.watched-text {
        color: #26A69A;
      }
    }

    .footer-action {
      &:deep(.q-btn) {
        border-radius: 50%;
      }

      .future{
        color: #616161;
        background: #ECEFF1;
      }

      .watched {
        color: #26A69A;
      }
    }
  }
}
</style>
