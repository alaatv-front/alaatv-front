<template>
  <div class="TicketMessage"
       :class="{'TicketMessage--sent': message.sent, 'TicketMessage--received': !message.sent, 'TicketMessage--private': message.private}">
    <div class="TicketMessage__container"
         :class="{'TicketMessage--sent': message.sent, 'TicketMessage--received': !message.sent, 'TicketMessage--private': message.private}">
      <div v-if="message.user.avatar"
           class="TicketMessage__avatar">
        <lazy-img :src="message.user.avatar"
                  width="40"
                  height="40" />
      </div>
      <div class="TicketMessage__content">
        <div v-if="message.user.fullname"
             class="TicketMessage__user-fullname">
          {{ message.user.fullname }}
        </div>
        <div v-if="Array.isArray(message.files) && message.files.length > 0"
             class="TicketMessage__files">
          <div v-for="(file, fileIndex) in message.files"
               :key="fileIndex"
               class="TicketMessage__file">
            <div class="TicketMessage__file-info">
              <div class="TicketMessage__file-title ellipsis">
                {{ file.title }}
              </div>
              <div class="TicketMessage__file-size">
                {{ file.size }}
              </div>
            </div>
            <div class="TicketMessage__file-thumbnail">
              <lazy-img :src="file.src"
                        width="50"
                        height="50" />
            </div>
          </div>
        </div>
        <div class="TicketMessage__body">
          {{ message.text }}
        </div>
        <div class="TicketMessage__time">
          {{ message.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'components/lazyImg.vue'

export default defineComponent({
  name: 'TicketMessage',
  components: { LazyImg },
  props: {
    sent: {
      type: Boolean,
      default: true
    },
    privateMode: {
      type: Boolean,
      default: false
    },
    message: {
      type: Object,
      default: null
    }
  }
})
</script>

<style scoped lang="scss">
.TicketMessage {
  display: flex;
  width: 100%;
  margin-bottom: $space-6;
  &.TicketMessage--sent {
    justify-content: flex-end;
  }
  &.TicketMessage--received {
    justify-content: flex-start;
  }
  &.TicketMessage--private {

  }
  .TicketMessage__container {
    display: flex;
    width: 320px;
    max-width: 320px;
    align-items: flex-end;
    gap: 12px;
    border-radius: 12px;
    .TicketMessage__avatar {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      :deep(.lazy-img) {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .TicketMessage__content {
      display: flex;
      padding: 8px 12px;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      align-self: stretch;
      border-radius: 12px 12px 0 12px;
      .TicketMessage__user-fullname {
        color: $secondary-7;
        @include caption1;
      }
      .TicketMessage__files {
        .TicketMessage__file {
          display: flex;
          padding-left: 32px;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          align-self: stretch;
          .TicketMessage__file-thumbnail {
            display: flex;
            width: 56px;
            height: 56px;
            padding: 8px 12px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            :deep(.lazy-img) {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }
          .TicketMessage__file-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            .TicketMessage__file-title {
              color: $grey-9;
              @include body2;
            }
            .TicketMessage__file-size {
              color: $grey-7;
              @include caption1;
            }
          }
        }
      }
      .TicketMessage__body {
        color: $grey-9;
        @include body2;
      }
      .TicketMessage__time {
        color: $grey-6;
        margin-top: $space-1;
        @include caption1;
      }
    }
    &.TicketMessage--sent {
      justify-content: flex-end;
      flex-direction: row-reverse;
      .TicketMessage__content {
        background: $grey-1;
        border-radius: 12px 12px 0 12px;
      }
    }
    &.TicketMessage--received {
      justify-content: flex-start;
      .TicketMessage__content {
        background: $secondary-1;
        border-radius: 12px 12px 12px 0px;
      }
    }
    &.TicketMessage--private {

    }
  }
}
</style>
