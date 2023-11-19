<template>
  <div class="FormBuilderCustomComponentShahrOrderViewer">
    <div>
      استان و شهر انتخاب شده
    </div>
    <div class="selected-items">
      <div v-for="(item, itemIndex) in selectedItems"
           :key="itemIndex"
           class="selected-item">
        <div class="selected-item-reorder-action" />
        <div class="selected-item-order"
             @click="onCopyToClipboard(item.order)">
          {{ item.order }}
        </div>
        <div class="selected-item-title">
          <span v-if="item.ostan"
                @click="onCopyToClipboard(item.ostan.title)">
            {{ item.ostan.title }}
          </span>
          -
          <span v-if="item.shahr"
                @click="onCopyToClipboard(item.shahr.title)">
            {{ item.shahr.title }}
          </span>
        </div>
        <div class="selected-item-delete-action" />
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
export default {
  name: 'FormBuilderCustomComponentShahrOrderViewer',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    cities: {
      type: Array,
      default: () => []
    },
    provinces: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:value'],
  data () {
    return {
      selectedItems: []
    }
  },
  watch: {
    value: {
      handler () {
        this.loadSelectedItems()
      },
      immediate: true
    }
  },
  methods: {
    loadSelectedItems () {
      if (!Array.isArray(this.value)) {
        return
      }

      this.value.forEach(item => {
        const shahr = this.getShahr(item.id)
        const ostan = this.getOstan(item.id)
        this.selectedItems.push({
          ostan,
          shahr,
          order: item.order
        })
      })
    },
    getShahr (shahrId) {
      return this.cities.find(item => item.id === shahrId)
    },
    getOstan (shahrId) {
      const shahr = this.getShahr(shahrId)
      if (!shahr) {
        return { }
      }
      return shahr.province
    },
    onCopyToClipboard (data) {
      copyToClipboard(data)
        .then(() => {
          this.$q.notify({
            message: 'کپی شد',
            type: 'positive'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.FormBuilderCustomComponentShahrOrderViewer {
  .selected-items {
    .selected-item {
      border-radius: 6px;
      background: #F5F5F5;
      padding: 8px;
      height: 32px;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 8px;

      :deep(.q-btn) {
        width: 16px;
        height: 16px;

        .q-icon {
          font-size: 16px;
          color: #9E9E9E;
        }
      }

      .selected-item-reorder-action {
        width: 38px;

        .q-btn:first-child {
          margin-right: 6px;
        }
      }

      .selected-item-order {
        text-align: center;
        width: 56px;
        color: #424242;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
      }

      .selected-item-title {
        width: calc( 100% - 110px );
        color: #424242;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
      }

      .selected-item-delete-action {
        width: 16px;
      }
    }
  }
}
</style>
