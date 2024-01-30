<template>
  <div class="TicketSelectFiles">
    <inside-dialog>
      <template #header-icon>
        <badge-icon icon="ph:cloud-arrow-up"
                    color="primary" />
      </template>
      <template #header>
        آپلود عکس یا ویدئو
      </template>
      <template #body>
        <select-files-component v-model:files="files" />
        <q-input v-model="description"
                 type="textarea"
                 label="توضیحات"
                 placeholder="وارد کنید" />
      </template>
      <template #action>
        <q-btn v-close-popup
               outline
               label="انصراف"
               color="grey" />
        <q-btn color="primary"
               label="ارسال"
               @click="sendFiles" />
      </template>
    </inside-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import SelectFilesComponent from 'src/components/Utils/SelectFiles.vue'

export default defineComponent({
  name: 'TicketSelectFiles',
  components: {
    BadgeIcon,
    InsideDialog,
    SelectFilesComponent
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select'],
  data () {
    return {
      files: [],
      options: {
        container: 'body',
        height: 22,
        // width: 1000,
        splitChannels: false,
        normalize: false,
        waveColor: '#ffffff',
        progressColor: '#26a69a',
        cursorColor: '#ddd5e9',
        cursorWidth: 0,
        barWidth: 5,
        barGap: 2,
        barRadius: 4,
        barHeight: null,
        barAlign: 'bottom',
        minPxPerSec: 1,
        fillParent: true,
        // url: 'https://wavesurfer.xyz/wavesurfer-code/examples/audio/audio.wav',
        // url: 'https://dls.music-fa.com/tagdl/1402/Homayoon%20Shajaryan%20-%20Tire%20Mozhgan%20(320).mp3',
        url: null,
        mediaControls: false,
        autoplay: false,
        interact: true,
        dragToSeek: false,
        hideScrollbar: false,
        audioRate: 1,
        autoScroll: true,
        autoCenter: true,
        sampleRate: 8000
      },
      description: null,
      wavesurfer: null,
      loading: true,
      loadedValue: 0,
      playing: false,
      status: 'blur' // 'blur', 'text-input-focus', 'typing', 'voice-recording', 'voice-recorded
    }
  },
  mounted () {
  },
  methods: {
    onSelectItem (item) {
      this.$emit('select', item)
    },
    sendFiles () {
      if (this.files.length === 0) {
        this.$q.notify({
          type: 'negative',
          message: 'یک یا چند فایل را انتخاب کنید.'
        })
        return
      }
      this.$emit('send', {
        files: this.files,
        description: this.description
      })
    }
  }
})
</script>

<style scoped lang="scss">
.TicketSelectFiles {
  width: 544px;
  @include media-max-width('md') {
    width: 320px;
  }
}
</style>
