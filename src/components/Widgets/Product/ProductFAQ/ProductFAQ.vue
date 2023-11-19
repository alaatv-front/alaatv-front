<template>
  <div class="faq-container">
    <div class="faq-title">
      سوالات متداول
    </div>
    <q-expansion-item v-for="(item, index) in localOptions.faqList"
                      :key="index"
                      header-class="expanded-item-header"
                      expand-icon-class="expanded-item-icon"
                      icon="question_mark"
                      :label="item.title">
      <q-separator inset />
      <q-card class="expanded-item-card">
        <q-card-section class="faq-body"
                        v-html="item.body" />
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'ProductFAQ',
  mixins: [mixinWidget],
  date() {
    return {
      defaultOptions: {
        faqList: []
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.faq-container {
  &:deep(.q-expansion-item) {
    border-radius: 8px;
    background:#F5F7FA;
    color:#424242;
    margin: 8px 0;
  }

  &:deep(.q-item) {
    height: 67PX;
    border-radius: 8px;
    background:#F5F7FA;
    color:#424242;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.36px;

    i {
      color: #78909C
    }
  }

  .faq-title {
    color:#424242;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}

.expanded-item-header {
  height: 100%;
  border-radius: 8px;
  background:#F5F7FA;
  color:#424242;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.36px;
}

.expanded-item-icon {
  color: #78909C
}

.expanded-item-card {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background:#F5F7FA;
  color:#616161;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;

  .faq-body {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>
