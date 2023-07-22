<template>
  <q-list separator>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-chalkboard-teacher :size="16"
                               color="#757575" />
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
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-book-open-text :size="16"
                           color="#757575" />
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
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-books :size="16"
                  color="#757575" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          مقطع تحصیلی
        </div>
      </q-item-section>
      <q-item-section class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.duration) }}
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-siren :size="16"
                  color="#757575" />
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
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-calendar-blank :size="16"
                           color="#757575" />
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
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-calendar-x :size="16"
                       color="#757575" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title">
          مدت اعتبار
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis">
          {{ getAttributesValues(attributes.info.duration) }}
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-download-simple :size="16"
                            color="#757575" />
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
        </div>
      </q-item-section>
    </q-item>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <ph-clock-countdown :size="16"
                            color="#757575" />
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
      console.log(valueList)
      let finalValue = ''
      for (let valueIndex = 0; valueIndex < valueList.length; valueIndex++) {
        if (valueIndex === 0) {
          finalValue = finalValue + valueList[valueIndex]
        } else {
          finalValue = finalValue + '، ' + valueList[valueIndex]
        }
      }

      return finalValue
    }
  }
})
</script>

<style lang="scss" scoped>
.attribute-item {
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
    width: 150px;
    max-width: 150px;

    .value-text {
      color:#303030;
      text-align: left;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.42px;
      width: 100px;
      max-width: 100px;
    }
  }
}
</style>
