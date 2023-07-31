<template>
  <div class="LiveConductor">
    <q-skeleton v-if="conductor.loading"
                type="rect"
                width="100%"
                height="100px" />
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Conductor } from 'src/models/Conductor.js'

export default {
  name: 'LiveConductor',
  mixins: [mixinWidget],
  data() {
    return {
      conductor: new Conductor(),
      defaultOptions: {
        loadType: 'OnLoadPage', // OnLoadPage - OnEvent
        eventName: 'ShowLiveConductor',
        conductorId: null
      }
    }
  },
  mounted() {
    this.loadConductor()
  },
  methods: {
    loadConductor () {
      if (this.localOptions.loadType === 'OnLoadPage') {
        this.getLiveLink(this.localOptions.conductorId)
      } else {
        this.$bus.on(this.localOptions.eventName, this.toggleDialog)
      }
    },
    toggleDialog() {
      this.dialog = !this.dialog
    },
    getLiveLink(conductorId) {
      this.conductor.loading = true
      APIGateway.conductor.get(conductorId)
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

<style lang="scss" scoped>
.signup-dialog-card{
  width: 432px;
  height: 487px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

  &:deep(.q-stepper__header) {
    display: none !important;
  }
  &:deep(.q-stepper__step-inner) {
    padding: 0 !important;
  }
}

</style>
