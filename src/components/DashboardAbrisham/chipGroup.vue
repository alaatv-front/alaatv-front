<template>
  <div class="chip-dropdown">
    <div class="list-box align-center flex"
         :class="dropDown ? 'chip-group-visibility' : 'flex'">
      <p v-if="chipTitle"
         class="list-section">
        {{ chipTitle }}
      </p>
      <div v-if="loading"
           class="d-block d-xs-none">
        <q-skeleton v-for="i in 3"
                    :key="i"
                    type="QChip" />
      </div>
      <div v-else
           class="chip-part xs-hide justify-center"
           :class="dropDown ? 'hidden' : ''">
        <q-chip v-for="(item) in items"
                :key="item.id"
                size="16px"
                clickable
                :style="{background: chipBackground(item)}"
                class="chip-box"
                :label="item.title"
                :text-color="isItemSelected(item) ? 'white': 'chip-text-color'"
                @click="changeSelectedChip(item.id)" />
      </div>

    </div>
    <div v-if="loading"
         class="d-xl-none d-lg-none d-md-none d-sm-none d-xs-block">
      <q-skeleton class="q-mb-md"
                  type="QChip" />
      <q-skeleton type="QChip" />
    </div>
    <div class="drop-down-select-box q-mt-md flex xl-hide lg-hide md-hide sm-hide">
      <q-select v-model="selectedId"
                :options="items"
                :option-label="itemText"
                :option-value="itemValue"
                :menu-props="{ bottom: true, offsetY: true }"
                emit-value
                map-options
                @update:model-value ="changeSelectedChip(selectedId)" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChipGroup',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Number,
      default: 0
    },
    itemText: {
      type: String,
      default: 'title'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    dropDown: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    chipTitle: {
      type: String,
      default: ''
    }
  },
  emits: [
    'update:value'
  ],
  data() {
    return {
      selectedId: null
    }
  },

  watch: {
    value: {
      handler(newValue) {
        if (newValue) {
          this.changeSelectedChip(newValue)
        }
      },
      immediate: true
    }
  },

  methods: {
    chipBackground(item) {
      return this.isItemSelected(item) ? (item.color ? item.color : '#ff8f00') : 'transparent'
    },
    isItemSelected (item) {
      return parseInt(item.id) === parseInt(this.selectedId)
    },

    getItemById(itemId) {
      return this.items.find(item => parseInt(item.id) === parseInt(itemId))
    },

    changeSelectedChip(selectedId) {
      const selectedItem = this.getItemById(selectedId)

      if (!selectedItem) {
        return
      }

      this.selectedId = parseInt(selectedId)
      this.$emit('update:value', this.selectedId)
    }
  }
}
</script>

<style lang="scss" scoped>
.chip-dropdown{
  margin-top: 20px;

  .list-box {
    @media screen and (width <= 960px){
      justify-content: center !important;
    }

    &.chip-group-visibility {
      @media screen and (width <= 768px){
        display: none !important;
      }
    }

    .list-section {
      font-size: 16px;
      font-weight: bold;
      color: #3e5480;
      margin-left:21px;
      padding-top: 11px;
      padding-right: 6px;

      @media screen and (width <= 768px){
        font-size: 14px !important;
      }

      @media screen and (width <= 600px){
        display:none;
      }
    }

    .chip-part {
      &:deep(.q-chip){
        border-radius: 40px !important;
        padding:7px 20px;
      }

      .chip-box {
        font-size: 16px;
        font-weight: 500;
        line-height: 2.13;
        height: 42px;

        :deep(.q-chip__content){
          padding: 0;
        }

        @media screen and (width <= 768px){
          height: 32px;
          font-size: 14px !important;
        }
      }

      .chip-text-color{
        color: #9fa5c0;
      }
    }

  }

  &:deep(.q-icon){
    color: #3e5480;
    font-size: 24px;
  }
}

</style>
