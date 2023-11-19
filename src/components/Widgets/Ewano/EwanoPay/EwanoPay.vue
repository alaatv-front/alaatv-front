<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'RaychatWidget',
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
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
      this.loadScript()
    }
  },
  mounted () {
    this.loadScript()
  },
  methods: {
    loadScript () {
      if (!this.raychatToket) {
        return
      }
      window.RAYCHAT_TOKEN = this.raychatToket;
      (function () {
        const d = document
        const s = d.createElement('script')
        s.src = 'https://widget-react.raychat.io/install/widget.js'
        s.async = 1
        d.getElementsByTagName('head')[0].appendChild(s)
      })()
    }
  }
}
</script>
