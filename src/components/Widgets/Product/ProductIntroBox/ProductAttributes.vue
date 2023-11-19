<template>
  <q-list separator>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:chalkboard-teacher"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          نام دبیر
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
        <q-icon name="ph:book-open-text"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          رشته
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.major) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.major) }}
          </q-tooltip>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:books"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          مقطع تحصیلی
        </div>
      </q-item-section>
      <q-item-section class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.grade) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.grade) }}
          </q-tooltip>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:siren"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          خدمات دریافتی
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.services) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.services) }}
          </q-tooltip>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:calendar-blank"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          سال تولید
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.production_year) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.production_year) }}
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
        <q-icon name="ph:clock-countdown"
                color="gray-7"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          زمان دریافت
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.download_date) }}
          <q-tooltip>
            {{ getAttributesValues(attributes.info.download_date) }}
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
      default() {
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
  data() {
    return {
      expiration: 'یکسال پس از دریافت'
    }
  },
  methods: {
    getAttributesValues(valueList) {
      let finalValue = ''
      if (valueList) {
        for (let valueIndex = 0; valueIndex < valueList.length; valueIndex++) {
          if (valueIndex === 0) {
            finalValue = finalValue + valueList[valueIndex]
          } else {
            finalValue = finalValue + '، ' + valueList[valueIndex]
          }
        }
      }

      return finalValue
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
