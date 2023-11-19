<template>
  <div class="itemMenu">
    <q-item v-ripple
            clickable
            :active="isRouteSelected(localData.route)"
            active-class="active-item"
            :to="localData.route"
            @click="onClick">
      <q-item-section class="tab-title">
        {{ localData.title }}
        <q-btn v-if="editable"
               icon="edit"
               flat
               size="10px"
               class="edit-btn"
               @click="editItem" />
      </q-item-section>
    </q-item>
  </div>
  <q-dialog v-if="editable"
            v-model="optionDialog"
            full-width>
    <div class="bg-white">
      <q-btn color="primary"
             icon="close"
             class="q-ma-md"
             @click="optionDialog = false" />
      <option-panel v-model:menuItem="localData" />
    </div>
  </q-dialog>
</template>

<script>
import OptionPanel from 'src/components/Template/Header/MainHeaderMenuItems/OptionPanels/OptionPanel.vue'

export default {
  name: 'itemMenu',
  components: { OptionPanel },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      default: null
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      optionDialog: false
    }
  },
  computed: {
    localData: {
      set (newValue) {
        this.$emit('update:data', newValue)
      },
      get () {
        return this.data
      }
    }
  },
  methods: {
    onClick ($event) {
      if (!this.localData.externalLink) {
        return
      }
      $event.preventDefault()
      $event.stopPropagation()
      window.location.href = this.localData.externalLink
    },
    editItem (event) {
      event.preventDefault()
      event.stopPropagation()
      this.optionDialog = true
      // this.$emit('open-dialog', { index: this.index, undefined })
    },
    isRouteSelected (itemRoute) {
      return (this.$route.name === itemRoute?.name)
    }
  }
}
</script>

<style scoped lang="scss">
.itemMenu {
  .active-item {
    color: #FFC107;
  }

  .tab-title {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    white-space: nowrap;
    position: relative;

    .edit-btn {
      position: absolute;
      right: -20px;
      top: -10px;
    }
  }
}
</style>
