<template>
  <div class="video-box-container flex justify-center">
    <video-player class="video"
                  :sources="source"
                  :hlsSource="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'" />
  </div>
</template>

<script>
import { Content } from 'src/models/Content'
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'ContentVideoPlayer',
  components: {
    VideoPlayer
  },
  props: {
    Content: {
      type: Object,
      default: new Content()
    }
  },
  computed: {
    source() {
      return this.content.file.video
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "video.js/dist/video-js.css";
@import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";

.video-box-container{
  border-radius: inherit;
}
.video-js {
  border-radius: inherit;
  .vjs-tech{
    border-radius: inherit;
  }
  .my-video_html5_api{
    border-radius: inherit;
  }
}
.vjs-poster{
  border-radius: inherit;
}
  #my-video .vjs-big-play-button {
    border: none;
    width: 80px;
    height: 80px;
    line-height: 2em;
    top: 50%;
    margin-left: -1em;
    color: #fff;
    background-color: #FFB74D;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    font-size: 52px;
    border-radius: 20px;
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;
    margin-top: -0.817em;
  }

  .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    content: "\f4cd";
    left: -12px;
    top: -10px;
    font-size: 110px;
    font-family: iconsax;
    border: none !important;
    box-shadow: none !important;
  }

  .vjs-control-bar {
    .vjs-volume-panel {
      .vjs-volume-control {
        right: -45px !important;
      }
    }
  }

  .vjs-brand-container {
    .vjs-brand-container-link {
      img {
        height: 25px;
        padding-top: 3px;
      }
    }
  }

  .vjs-progress-control {
    .vjs-progress-holder {
      .vjs-play-progress::before {
        left: -8px ;
        right: auto ;
      }
    }
  }
</style>
