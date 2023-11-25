<template>
  <q-list separator>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:calendar-blank"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          آخرین آپدیت
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.teacher) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.teacher) }}
          </q-tooltip>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:download-simple"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          مدل دریافت
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.shipping_method) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.shipping_method) }}
          </q-tooltip>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:calendar-x"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          مدت اعتبار
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.expiration_duration) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.expiration_duration) }}
          </q-tooltip>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductAttributes',
  props: {
    attributes: {
      type: Object,
      default () {
        return {
          info: {
            teacher: [],
            shipping_method: [],
            major: [],
            services: [],
            download_date: [],
            educational_system: [],
            duration: [],
            production_year: []
          },
          extra: null,
          subscription: null
        }
      }
    }
  },
  data () {
    return {
      expiration: 'یکسال پس از دریافت'
    }
  },
  methods: {
    getAttributesValues (valueList) {
      if (!valueList) {
        return '-'
      }

      return valueList.join(', ')
    }
  }
})
</script>

<style lang="scss" scoped>
.attribute-item {
  padding: 10px 0;

  &:last-child {
    padding-bottom: 0;
  }

  .attribute-icon {
    max-width: 16px;
  }

  .attribute-title {
    width: 150px;
    color:#303030;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.42px;
  }

  .attribute-value-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    max-width: 250px;

    .value-text {
      color:#303030;
      text-align: right;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.42px;
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
