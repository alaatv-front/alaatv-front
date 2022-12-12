<template>
  <div class="chip-dropdown">
    <div
      class="list-box align-center d-flex"
      :class="dropDown ? 'chip-group-visibility' : 'd-flex'"
    >
      <p
        v-if="chipTitle"
        class="list-section"
      >
        {{ chipTitle }}
      </p>
      <div
        v-if="loading"
        class="d-block d-xs-none"
      >
        <q-skeleton></q-skeleton>
      </div>
      <!--      <v-chip-group-->
      <div
        v-else
        class="chip-part d-md-block d-sm-flex justify-center"
        :class="dropDown ? 'd-none ' : ''"
      >
        <q-chip
          v-for="(item) in items"
          :key="item.id"
          :color="isItemSelected(item) ? (item.color?  item.color : '#ff8f00') : 'transparent'"
          class="chip-box"
          :text-color="isItemSelected(item) ? 'white': '#9fa5c0'"
          @click="changeSelectedChip(item.id)"
        >
          {{ item.title }}
        </q-chip>
      </div>

    </div>
    <div
      v-if="loading"
      class="d-xl-none d-lg-none d-md-none d-sm-none d-xs-block"
    >
      <q-skeleton type="chip"></q-skeleton>
      <q-skeleton type="chip"></q-skeleton>

    </div>
    <div
      class="drop-down-select-box mt-5 d-flex d-xl-none d-lg-none d-md-none d-sm-none d-xs-block"
    >
      <q-select
        v-model="selectedId"
        color="#3e5480"
        :items="items"
        :item-text="itemText"
        :item-value="itemValue"
        class="col-sm-6"
        :menu-props="{ bottom: true, offsetY: true }"
        solo
        append-icon="mdi-chevron-down"
        dense
        background-color="#eff3ff"
        flat
        @change="changeSelectedChip"
      />
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
      this.$emit('input', this.selectedId)
    }
  }
}
</script>

<style lang="scss" scoped>
.chip-dropdown{
  .list-box {
    @media screen and (max-width: 960px){
      justify-content: center !important;
    }
    &.chip-group-visibility {
      @media screen and (max-width: 768px){
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
      @media screen and (max-width: 768px){
        font-size: 14px !important;
      }
      @media screen and (max-width: 600px){
        display:none;
      }
    }
    .chip-part {
      .chip-box {
        font-size: 16px;
        font-weight: 500;
        height: 42px;
        border-radius: 25px;
        line-height: 2.13;
        padding: 8px 15px 9px;
        @media screen and (max-width: 768px){
          height: 32px;
          font-size: 14px !important;
        }
      }
    }

  }
}

</style>
