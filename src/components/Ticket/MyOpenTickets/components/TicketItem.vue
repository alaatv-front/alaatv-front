<template>
  <div class="ticket-item-container">
    <div class="ticket-item-avatar">
      <q-avatar size="40px">
        <lazy-img :src="ticket.user.image"
                  width="40px"
                  height="40px" /></q-avatar>
      <div class="ticket-item-avatar__badge">
        {{ticket.messages}}
      </div>
    </div>
    <div class="ticket-item-description">
      <div class="ticket-item-description__user">
        {{ticket.user.fullName}}
      </div>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
export default {
  name: 'TicketItem',
  components: {
    LazyImg
  },
  props: {
    ticket: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .ticket-item {
    &-container {
      padding: $space-1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      transition: all ease-in-out .3s;

      &:hover {
        border-radius: 8px;
        background: $grey-2;
        padding: $space-2;
        transition: all ease-in-out .3s;
      }
    }

    &-avatar {
      position: relative;
      &__badge {
        display: flex;
        height: 16px;
        min-width: 16px;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0px;
        right: 0px;
        border-radius: $radius-5;
        background: $secondary;

        color: $grey-1;
        text-align: center;

        @include caption2;
      }
    }

    &-description {
      width: calc(100% - 48px);

      &__user {
        color: $grey-9;
        @include body2;
      }
    }
  }
</style>
