<template>
  <q-dialog v-model="dialog">
    <q-spinner v-if="loading"
               color="primary"
               size="3em"
               :thickness="10" />
    <inside-dialog v-else />
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import InsideDialog from './InsideDialog.vue'
// import { APIGateway } from 'src/api/APIGateway.js'

export default defineComponent({
  name: 'BlackFridayRewardsInDialog',
  components: { InsideDialog },
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  mounted () {
    this.getRewards()
    this.$bus.on('show-black-friday-rewards-dialog', this.showDialog)
  },
  methods: {
    showDialog () {
      this.dialog = true
    },
    getRewards () {
      // APIGateway.blackFriday.getRewards()
      //   .then(() => {
      //
      //   })
      //   .catch(() => {
      //
      //   })
    }
  }
})

</script>

<style scoped lang="scss">

</style>
