<template>
  <q-card class="item-box">
    <q-img
      :src="set.photo"
      class="img"
      alt="set"
    />
    <q-card-section>
      set
    </q-card-section>
    {{set.title}}
  </q-card>
</template>

<script>
import { Set } from 'src/models/Set'

export default {
  name: 'setItem',
  props: {
    setData: {
      type: Set,
      default: new Set()
    }
  },
  data: () => ({
    set: new Set()
  }),
  mounted () {
    this.set = new Set(this.setData)
  }

}
</script>

<style scoped>
.item-box{
  width: 260px;
  border-radius: 20px;
}
</style>
