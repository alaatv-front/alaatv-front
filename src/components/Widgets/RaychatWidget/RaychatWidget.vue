<template>
  <component :is="'style'"
             type="text/css">
    iframe.raychat_frame {
    bottom: {{ localOptions.bottom }}px;
    left: {{ localOptions.left }}px;
    }
  </component>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'RaychatWidget',
  mixins: [mixinWidget],
  data () {
    return {
      wcriptId: 'RaychatWidgetScript',
      defaultOptions: {
        bottom: null,
        left: null,
        RAYCHAT_TOKEN: null
      }
    }
  },
  computed: {
    raychatToket () {
      return this.localOptions.RAYCHAT_TOKEN
    }
  },
  watch: {
    raychatToket () {
      this.addScript()
    }
  },
  mounted () {
    this.addScript()
  },
  beforeUnmount () {
    this.removeRaychat()
  },
  methods: {
    removeRaychat () {
      this.removeScript()
      this.removeIframe()
    },
    removeIframe () {
      const raychatElement = document.getElementById('raychat_widget')
      if (!raychatElement) {
        return
      }

      raychatElement.remove()
    },
    removeScript () {
      const scriptTag = document.getElementsByTagName('script').namedItem(this.wcriptId)
      if (!scriptTag) {
        return
      }

      scriptTag.remove()
    },
    addScript () {
      if (!this.raychatToket) {
        return
      }
      if (document.getElementsByTagName('script').namedItem(this.wcriptId)) {
        return
      }
      window.RAYCHAT_TOKEN = this.raychatToket

      const script = document.createElement('script')
      script.id = this.wcriptId
      script.src = 'https://widget-react.raychat.io/install/widget.js'
      script.async = 1
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  }
}
</script>
