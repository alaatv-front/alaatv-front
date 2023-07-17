<template>
  <div class="itemMenu">
    <q-item v-ripple
            clickable
            :active="isRouteSelected(data.route)"
            active-class="active-item"
            :to="data.route">
      <q-item-section class="tab-title">
        {{ data.title }}
        <q-btn v-if="editable"
               icon="edit"
               flat
               size="10px"
               class="edit-btn"
               @click="editItem" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'itemMenu',
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
  methods: {
    editItem (event) {
      this.$emit('open-dialog', { index: this.index, undefined })
      event.preventDefault()
      event.stopPropagation()
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
