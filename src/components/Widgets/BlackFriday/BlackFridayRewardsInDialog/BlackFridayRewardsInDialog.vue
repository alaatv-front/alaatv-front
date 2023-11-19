<template>
  <q-dialog v-model="dialog">
    <q-spinner v-if="blackFridayCampaignData.loading"
               color="primary"
               size="3em"
               :thickness="10" />
    <inside-dialog v-else
                   :rewards="blackFridayCampaignData.rewards.list"
                   :department-id="localOptions.departmentId"
                   @toggle-dialog="toggleDialog" />
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import InsideDialog from './InsideDialog.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { BlackFridayCampaignData } from 'src/models/BlackFridayCampaignData.js'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'BlackFridayRewardsInDialog',
  components: { InsideDialog },
  mixins: [mixinWidget],
  data () {
    return {
      dialog: false,
      blackFridayCampaignData: new BlackFridayCampaignData(),
      defaultOptions: {
        eventName: 'show-black-friday-rewards-dialog',
        departmentId: null
      }
    }
  },
  watch: {
    dialog() {
      this.getBlackFridayCampaignData()
    }
  },
  mounted () {
    this.getBlackFridayCampaignData()
    this.$bus.on(this.localOptions.eventName, this.toggleDialog)
  },
  methods: {
    toggleDialog () {
      this.dialog = !this.dialog
    },
    getBlackFridayCampaignData () {
      this.blackFridayCampaignData.loading = true
      APIGateway.blackFriday.getCampaignData()
        .then((blackFridayCampaignData) => {
          this.blackFridayCampaignData = new BlackFridayCampaignData(blackFridayCampaignData)
          this.blackFridayCampaignData.loading = false
        })
        .catch(() => {
          this.blackFridayCampaignData.loading = false
        })
    }
  }
})

</script>
