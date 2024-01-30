<template>
  <div class="PreparedTexts">
    <q-list>
      <q-item v-for="(item, itemIndex) in list"
              :key="itemIndex"
              clickable
              @click="onSelectItem(item)">
        <div class="PreparedTexts__item-title">
          {{ item.title }}
        </div>
        <div class="PreparedTexts__item-text">
          {{ item.text }}
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PreparedTexts',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select'],
  data () {
    return {
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
    }
  }
})
</script>

<style scoped lang="scss">
.PreparedTexts {
  width: 100%;
  padding: 8px;
  background: $grey-1;
  .q-list {
    .q-item {
      .PreparedTexts__item-title {
        color: $secondary-5;
        @include body2;
        margin-right: $space-4;
      }
      .PreparedTexts__item-text {
        color: $grey-8;
        @include body2;
      }
    }
  }
}
</style>
