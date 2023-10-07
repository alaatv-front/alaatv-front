<template>
  <q-card class="CardComponent"
          style="width: 90%;">
    <q-card-section>
      <div class="item-row header-item">
        <div class="item-row-icon">
          <q-icon name="ph:cloud-arrow-down"
                  size="sm"
                  color="green" />
        </div>
        <div class="item-row-title">
          آلاء رو بروزرسـانی کُـن !
        </div>
        <div class="item-row-action">
          <q-icon v-if="!isAndroidForceUpdate"
                  v-close-popup
                  name="close"
                  class="col-1"
                  size="sm" />
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div v-for="(option, index) in androidOptions.filter(option => option.link)"
           :key="index"
           v-ripple
           class="item-row"
           @click="selectOption(option)">
        <div class="item-row-icon">
          <q-img :src="option.iconLink" />
        </div>
        <div class="item-row-title">
          {{ option.label }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'card',
  props: {
    isAndroidForceUpdate: {
      type: Boolean,
      default: false
    },
    androidOptions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['selectOption'],
  methods: {
    selectOption (option) {
      this.$emit('selectOption', option)
    }
  }
}
</script>

<style scoped lang="scss">
.CardComponent {
  border-radius: 16px;
  .item-row {
    $iconWidth: 60px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    margin-bottom: 8px;
    height: $iconWidth;
    &.header-item {
      margin-bottom: 0;
      height: max-content;
      .item-row-title {
        font-weight: bold;
      }
    }
    .item-row-icon {
      width: $iconWidth;
    }
    .item-row-title {
      width: calc( 100% - $iconWidth);
      font-size: 16px;
      padding-left: 8px;
    }
    .item-row-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
