<template>
  <div class="ShowMothersDayPostcard">
    <postcard />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Postcard from './components/Postcard.vue'
export default defineComponent({
  name: 'ShowMothersDayPostcard',
  components: { Postcard }
})
</script>

<style lang="scss" scoped>
.ShowMothersDayPostcard {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
