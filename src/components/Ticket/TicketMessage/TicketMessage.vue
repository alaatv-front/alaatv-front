<template>
  <div class="TicketMessage"
       :class="{'TicketMessage--sent': sent, 'TicketMessage--received': !sent, 'TicketMessage--private': message.is_private}">
    <div class="TicketMessage__container"
         :class="{'TicketMessage--sent': sent, 'TicketMessage--received': !sent, 'TicketMessage--private': message.is_private}">
      <div v-if="message.user.photo"
           class="TicketMessage__avatar">
        <lazy-img :src="message.user.photo"
                  width="40"
                  height="40" />
      </div>
      <div class="TicketMessage__content">
        <div v-if="message.user.first_name || message.user.last_name"
             class="TicketMessage__user-fullname">
          {{ message.user.first_name }}
          {{ message.user.last_name }}
        </div>
        <div v-if="Array.isArray(message.files) && message.files.length > 0"
             class="TicketMessage__files">
          <div v-for="(file, fileIndex) in message.files"
               :key="fileIndex"
               class="TicketMessage__file">
            <div class="TicketMessage__file-info">
              <div class="TicketMessage__file-title ellipsis">
                <template v-if="!isFile(file)">
                  {{ file }}
                </template>
                <template v-else>
                  {{ file.name }}
                </template>
              </div>
              <div class="TicketMessage__file-size">
                -
              </div>
            </div>
            <div class="TicketMessage__file-thumbnail"
                 :class="{
                   'TicketMessage__file-thumbnail--is-file': isFile(file),
                   'TicketMessage__file-thumbnail--is-image-url': isImageUrl(file),
                   'TicketMessage__file-thumbnail--is-image-file': isImageFile(file)
                 }">
              <template v-if="!isFile(file)">
                <lazy-img v-if="isImageUrl(file)"
                          :src="file"
                          width="50"
                          height="50" />
              </template>
              <template v-else>
                <q-knob v-model="file.progress"
                        show-value
                        class="text-white"
                        size="40px"
                        :min="0"
                        :max="100"
                        readonly
                        :thickness="0.15"
                        color="grey-1"
                        track-color="grey-4"
                        @click="onCancelUpload(message, fileIndex, file)">
                  <q-icon name="ph:x"
                          size="13px" />
                </q-knob>
              </template>
            </div>
          </div>
        </div>
        <div class="TicketMessage__body">
          {{ message.body }}
        </div>
        <div class="TicketMessage__time">
          {{ message.shamsiDate('created_at').dateTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'src/components/lazyImg.vue'
import { TicketMessage } from 'src/models/TicketMessage.js'

export default defineComponent({
  name: 'TicketMessage',
  components: { LazyImg },
  props: {
    message: {
      type: TicketMessage,
      default: new TicketMessage()
    },
    sent: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancelUpload'],
  methods: {
    isFile (data) {
      if (typeof window === 'undefined') {
        return false
      }
      return 'File' in window && data instanceof File
    },
    isImageUrl (url) {
      if (typeof url !== 'string') {
        return false
      }
      return url.match(/\.(jpeg|jpg|gif|png)/) !== null
    },
    isImageFile (file) {
      if (!this.isFile(file)) {
        return false
      }
      return file.type.match(/\/(jpeg|jpg|gif|png)/) !== null
    },
    onCancelUpload (message, fileIndex, file) {
      this.$emit('cancelUpload', { message, fileIndex, file })
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
        display: flex;
        gap: $space-2;
        flex-direction: column;
        .TicketMessage__file {
          display: flex;
          padding-left: $space-4;
          justify-content: flex-end;
          align-items: center;
          gap: $space-2;
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
            &.TicketMessage__file-thumbnail--is-file:not(.TicketMessage__file-thumbnail--is-image-file) {
              display: flex;
              width: 40px;
              height: 40px;
              justify-content: center;
              align-items: center;
              border-radius: $radius-round;
              background: $secondary;
            }
            &.TicketMessage__file-thumbnail--is-image-file {
              width: 56px;
              height: 56px;
              padding:$space-2 $space-3;
              border-radius: $radius-1;
              background: $darken-5;
            }
            &.TicketMessage__file-thumbnail--is-image-url {
              width: 56px;
              height: 56px;
              padding:$space-2 $space-3;
              border-radius: $radius-1;
              background: $darken-5;
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
