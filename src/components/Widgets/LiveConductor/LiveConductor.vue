<template>
  <div class="LiveConductor">
    <q-skeleton v-if="conductor.loading"
                type="rect"
                width="100%"
                height="100px" />
  </div>
</template>

<script>
// import { User } from 'src/models/User.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Conductor } from 'src/models/Conductor.js'

export default {
  name: 'LiveConductor',
  mixins: [mixinWidget],
  data () {
    return {
      // user: new User(),
      // isUserLogin: false,
      conductor: new Conductor(),
      defaultOptions: {
        loadType: 'OnLoadPage', // OnLoadPage - OnEvent
        eventName: 'ShowLiveConductor',
        conductorId: null
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    },
    isUserLogin () {
      return this.$store.getters['Auth/isUserLogin']
    },
    userId () {
      return this.user.id
    }
  },
  watch: {
    userId (newValue) {
      if (!newValue) {
        return
      }

      this.getLiveLink()
    }
  },
  mounted () {
    this.loadConductor()
  },
  methods: {
    loadConductor () {
      if (this.localOptions.loadType === 'OnLoadPage') {
        this.getLiveLink()
      } else {
        this.$bus.on(this.localOptions.eventName, this.getLiveLink)
      }
    },
    getLiveLink () {
      if (!this.isUserLogin) {
        this.$store.commit('AppLayout/updateLoginDialog', true)
        return
      }
      this.conductor.loading = true
      APIGateway.conductor.get(this.localOptions.conductorId)
        .then((conductor) => {
          this.conductor = new Conductor(conductor)
          window.location.href = this.conductor.live_link
          this.conductor.loading = false
        })
        .catch(() => {
          this.conductor.loading = false
        })
    }
  }
}
</script>
