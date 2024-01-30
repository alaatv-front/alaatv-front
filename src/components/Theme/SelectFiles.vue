<template>
  <div class="SelectFiles"
       @dragover.prevent
       @drop.prevent>
    <div class="SelectFiles__drop-zone"
         @dragover="dragover"
         @dragleave="dragleave"
         @drop="drop">
      <input v-show="false"
             ref="FileInput"
             type="file"
             accept=".jpg,.jpeg,.png"
             @change="onChange">
      <div class="SelectFiles__drop-zone-icon">
        <q-icon name="ph:cloud-arrow-up" />
      </div>
      <div class="SelectFiles__drop-zone-title">
        فایل خود را اینجا رها کنید
      </div>
      <div class="SelectFiles__drop-zone-title">
        یا
      </div>
      <div class="SelectFiles__drop-zone-action-btn">
        <q-btn outline
               color="grey"
               class="size-sm"
               label="افزودن فایل"
               @click="selectFile" />
      </div>
    </div>
    <div class="SelectFiles__selected-files">
      <div v-for="(file, fileIndex) in files"
           :key="fileIndex"
           class="SelectFiles__selected-file">
        <div class="SelectFiles__selected-file-thumbnail">
          ddd
        </div>
        <div class="SelectFiles__selected-file-info">
          <div class="SelectFiles__selected-file-title">
            {{ file.name }}
          </div>
          <div class="SelectFiles__selected-file-size">
            {{ getFileSize(file) }}
          </div>
        </div>
        <div class="SelectFiles__selected-file-action">
          <q-btn class="size-sm bg-grey-1"
                 icon="ph:x"
                 square
                 flat
                 round
                 color="grey" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectFiles',
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
      files: false,
      bottomSheet: false
    }
  },
  methods: {
    dragover (event) {
      this.dragStatus = 'dragover'
    },
    dragleave (event) {
      this.dragStatus = 'dragleave'
    },
    drop (event) {
      this.dragStatus = 'drop'
      event.preventDefault()
      this.$refs.FileInput.files = event.dataTransfer.files
      this.onChange() // Trigger the onChange event manually
    },
    onChange () {
      this.files = [...this.$refs.FileInput.files]
      console.log(this.files)
      // this.nationalCardPicObjectURL = URL.createObjectURL(this.files)
    },
    selectFile () {
      this.$refs.FileInput.click()
    },
    getFileSize (file) {
      if (file.size > 1000) {
        // const size = file.size / 1000000
        return ((file.size / 1000000).toFixed(2)).toString() + ' MB'
      }
      return (file.size / 1000).toString() + ' KB'
    }
  }
}
</script>

<style scoped lang="scss">
.SelectFiles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $space-4;
  .SelectFiles__drop-zone {
    display: flex;
    padding: $space-7;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $space-2;
    align-self: stretch;
    border-radius: $radius-3;
    border: 2px dashed $blue-grey-6;
    background: $grey-1;
    .SelectFiles__drop-zone-icon {
      .q-icon {
        font-size: 48px;
        color: $blue-grey-7;
      }
    }
    .SelectFiles__drop-zone-title {
      color: $grey-7;
      @include body1;
    }
  }
  .SelectFiles__selected-files {
    $gap-size: $space-3;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: $gap-size;
    align-self: stretch;
    flex-wrap: wrap;
    .SelectFiles__selected-file {
      width: calc( 50% - ( #{$gap-size} / 2 ) );
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: $space-2;
      align-self: stretch;
      padding: $space-3 $space-4 $space-3 $space-3;
      border-radius: $radius-3;
      background: $blue-grey-1;
      .SelectFiles__selected-file-thumbnail {
        width: 48px;
        height: 48px;
        border-radius: $radius-1;
      }
      .SelectFiles__selected-file-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: $space-1;
        flex: 1 0 0;
        .SelectFiles__selected-file-title {
          color: $grey-9;
          @include subtitle2
        }
        .SelectFiles__selected-file-size {
          /*rtl:ignore*/
          direction: ltr;
          color: $grey-7;
          @include caption1
        }
      }
      .SelectFiles__selected-file-action {

      }
    }
  }
}
</style>
