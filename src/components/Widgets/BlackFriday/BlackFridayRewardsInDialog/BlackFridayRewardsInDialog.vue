<template>
  <div>
    <inside-dialog />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import InsideDialog from './InsideDialog.vue'
import { APIGateway } from 'src/api/APIGateway'

export default defineComponent({
  name: 'BlackFridayRewardsInDialog',
  components: { InsideDialog },
  data () {
    return {

    }
  },
  mounted () {
    this.getRewards()
  },
  methods: {
    getRewards () {
      APIGateway.blackFriday.getRewards()
        .then(() => {

        })
        .catch(() => {

        })
    }
  }
})

</script>

<style scoped lang="scss">

</style>
