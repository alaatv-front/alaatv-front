<template>
  <q-list separator>
    <q-item class="attribute-item">
      <q-item-section class="attribute-icon">
        <q-icon name="ph:calendar-blank"
                :color="darkMode ? 'grey-1' : 'grey-7'"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title"
             :class="{'dark': darkMode}">
          آخرین آپدیت
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis"
             :class="{'dark': darkMode}">
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
                :color="darkMode ? 'grey-1' : 'grey-7'"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title"
             :class="{'dark': darkMode}">
          مدل دریافت
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis"
             :class="{'dark': darkMode}">
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
                :color="darkMode ? 'grey-1' : 'grey-7'"
                size="16px" />
      </q-item-section>
      <q-item-section>
        <div class="attribute-title"
             :class="{'dark': darkMode}">
          مدت اعتبار
        </div>
      </q-item-section>
      <q-item-section side
                      class="attribute-value-section">
        <div class="value-text ellipsis"
             :class="{'dark': darkMode}">
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
    },
    darkMode: {
      type: Boolean,
      default: false
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
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";
@import "src/css/Theme/Typography/typography.scss";

.attribute-item {
  padding: $space-3 $spacing-none;

  &:last-child {
    padding-bottom: $spacing-none;
  }

  .attribute-icon {
    max-width: 16px;
  }

  .attribute-title {
    width: 150px;
    color: $grey-10;
    @include body2;

    &.dark {
      color: $grey-1;
    }
  }

  .attribute-value-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    max-width: 250px;

    .value-text {
      color: $grey-10;
      width: 100%;
      max-width: 100%;
      text-align: right;
      @include body2;

      &.dark {
        color: $grey-1;
      }
    }
  }
}

.q-list--separator > .q-item-type + .q-item-type {
  border-top: 1px solid $grey-4;
}
</style>
