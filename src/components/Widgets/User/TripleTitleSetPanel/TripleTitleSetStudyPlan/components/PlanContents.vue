<template>
  <div v-for="content in plan.contents.list"
       :key="content.id"
       class="col plan-item-box q-mx-sm">
    <div class="plan-item-header" />
    <div class="plan-item-info">
      <div class="item-title ellipsis">{{ content.title }}</div>
      <div class="item-plan ellipsis">
        <q-icon name="import_contacts"
                size="18px"
                class="q-mr-sm" />
        {{ content?.title || 'ویدیو ندارد' }}
      </div>
    </div>
    <q-separator />
    <div class="plan-item-footer">
      <div v-if="content.file.pamphlet"
           class="footer-text">
        دانلود
      </div>
      <div v-else
           class="footer-text">
        مشاهده
      </div>
      <div class="footer-action">
        <q-btn v-if="content.file.pamphlet"
               color="primary"
               round
               unelevated
               :disable="!content.id"
               size="11px"
               icon="download"
               @click="downloadPdf(content)" />
        <q-btn v-else
               color="primary"
               round
               unelevated
               :disable="!content.id"
               size="11px"
               icon="play_arrow"
               :to="{name:'UserPanel.Asset.TripleTitleSet.Content', params:{ productId: plan.product?.id, setId: content.set?.id, contentId: content?.id}}" />
      </div>
    </div>
  </div>
</template>

<script>
import { Plan } from 'src/models/Plan'

export default {
  name: 'PlanContents',
  props: {
    plan: {
      type: Plan
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
  width: 390px;
  height: 158px;
  border-radius: 12px;
  background: #F5F7FA;
  padding: 16px 20px 20px;

  @media only screen and (width <= 600px) {
    width: 230px;
    height: 196px;
  }

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
    margin-bottom: 20px;

    @media only screen and (width <= 600px) {
      margin-bottom: 20px;
    }

    .item-title {
      max-width: 100%;
      color:#424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;
      margin-bottom: 10px;

      @media only screen and (width <= 600px) {
        margin: 16px 0 8px;
      }
    }

    .item-plan {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      max-width: 100%;
      color: #757575;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.24px;
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
