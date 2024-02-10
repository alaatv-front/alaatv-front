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
               class="TicketMessage__file"
               :class="{
                 'TicketMessage__file--is-file': isFile(file),
                 'TicketMessage__file--is-image-file': isImageFile(file),
                 'TicketMessage__file--is-file-url': !isFile(file) && !isImageUrl(file),
                 'TicketMessage__file--is-image-url': isImageUrl(file)
               }">
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
                   'TicketMessage__file-thumbnail--is-image-file': isImageFile(file),
                   'TicketMessage__file-thumbnail--is-file-url': !isFile(file) && !isImageUrl(file),
                   'TicketMessage__file-thumbnail--is-image-url': isImageUrl(file)
                 }">
              <template v-if="!isFile(file)">
                <lazy-img v-if="isImageUrl(file)"
                          :src="file"
                          width="50"
                          height="50" />
                <q-icon v-else
                        color="grey-1"
                        size="20px"
                        :name="getFileIcon(file)" />
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
        <div class="TicketMessage__body"
             v-html="getMessageBody(message.body)" />
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
    getMessageBody (messageBody) {
      if (!messageBody) {
        return ''
      }

      return messageBody.replace(/\r?\n/g, '<br/>')
    },
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
    },
    getFileIcon (fileUrl) {
      if (typeof fileUrl !== 'string') {
        return 'ph:file'
      }

      if (fileUrl.match(/\.(doc|docx)/) !== null) {
        return 'ph:file-doc'
      }

      if (fileUrl.match(/\.(xls|xlsx)/) !== null) {
        return 'ph:file-xls'
      }

      if (fileUrl.match(/\.pdf/) !== null) {
        return 'ph:file-pdf'
      }

      if (fileUrl.match(/\.csv/) !== null) {
        return 'ph:file-csv'
      }

      if (fileUrl.match(/\.zip/) !== null) {
        return 'ph:file-zip'
      }

      return 'ph:file'
    }
  }
})
</script>

<style scoped lang="scss">
.TicketMessage {
  display: flex;
  width: 100%;
  margin-bottom: $space-6;
  $trail-size: 10px;
  .TicketMessage__container {
    display: flex;
    width: 320px;
    max-width: 320px;
    align-items: flex-end;
    gap: 12px;
    border-radius: 12px;
    $avatar-size: 40px;
    .TicketMessage__avatar {
      width: $avatar-size;
      height: $avatar-size;
      flex-shrink: 0;
      :deep(.lazy-img) {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .TicketMessage__content {
      display: flex;
      padding: $space-2 $space-3;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      align-self: stretch;
      width: calc( 100% - #{$avatar-size} );
      border-radius: $space-3 $space-3 $spacing-none $space-3;
      position: relative;
      z-index: 1;
      &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        width: $trail-size;
        height: $trail-size;
      }
      .TicketMessage__user-fullname {
        color: $secondary-7;
        @include caption1;
      }
      .TicketMessage__files {
        display: flex;
        gap: $space-2;
        margin-bottom: $space-1;
        max-width: 100%;
        flex-direction: column;
        .TicketMessage__file {
          display: flex;
          max-width: 100%;
          padding-left: $space-4;
          justify-content: flex-end;
          align-items: center;
          gap: $space-2;
          align-self: stretch;
          $thumbnail-file-size: 40px;
          $thumbnail-photo-size: 56px;
          @mixin thumbnail-size ($thumbnail-size) {
            width: $thumbnail-size;
            min-width: $thumbnail-size;
            max-width: $thumbnail-size;
            height: $thumbnail-size;
          }
          .TicketMessage__file-thumbnail {
            display: flex;
            @include thumbnail-size($thumbnail-photo-size);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            :deep(.lazy-img) {
              width: 100%;
              height: 100%;
              border-radius: $radius-1;
            }
            &.TicketMessage__file-thumbnail--is-file-url,
            &.TicketMessage__file-thumbnail--is-file:not(.TicketMessage__file-thumbnail--is-image-file) {
              display: flex;
              @include thumbnail-size($thumbnail-file-size);
              justify-content: center;
              align-items: center;
              border-radius: $radius-round;
              background: $secondary;
            }
            &.TicketMessage__file-thumbnail--is-image-url,
            &.TicketMessage__file-thumbnail--is-image-file {
              @include thumbnail-size($thumbnail-photo-size);
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
              max-width: 100%;
            }
            .TicketMessage__file-size {
              color: $grey-7;
              @include caption1;
            }
          }
          &.TicketMessage__file--is-file,
          &.TicketMessage__file--is-file-url {
            .TicketMessage__file-info {
              width: calc( 100% - #{$thumbnail-file-size} );
            }
          }
          &.TicketMessage__file--is-image-url,
          &.TicketMessage__file--is-image-file {
            .TicketMessage__file-info {
              width: calc( 100% - #{$thumbnail-photo-size} );
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
  &.TicketMessage--sent {
    justify-content: flex-end;
    .TicketMessage__content {
      &:before {
        background-image: url("https://nodes.alaatv.com/upload/alaaPages/2024-02/sent-ticket-message-tail1707563864.png");
        right: -#{$trail-size};
      }
    }
  }
  &.TicketMessage--received {
    justify-content: flex-start;
    .TicketMessage__content {
      &:before {
        background-image: url("https://nodes.alaatv.com/upload/alaaPages/2024-02/received-ticket-message-tail1707563884.png");
        left: -#{$trail-size};
      }
    }
  }
  &.TicketMessage--private {

  }
}
</style>
