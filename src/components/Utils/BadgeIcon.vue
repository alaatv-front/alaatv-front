<template>
  <div class="BadgeIcon"
       :class="'bg-' + color + '-1'">
    <q-icon :name="icon"
            :color="color" />
  </div>
</template>

<script>
export default {
  name: 'BadgeIcon',
  props: {
    icon: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    action: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialog: false,
      bottomSheet: false
    }
  }
}
</script>

<style scoped lang="scss">
.BadgeIcon {
  display: flex;
  padding: $space-1;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: $radius-round;
  .q-icon {
    font-size: 16px;
  }
}
</style>
