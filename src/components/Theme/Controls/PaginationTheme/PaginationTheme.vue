<template>
  <div class="pagination-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="pagination-title">
          Pagination
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-4 flex flex-center">Desktop</div>
      <div class="col-md-4 flex flex-center">Mobile</div>
    </div>
    <div class="row flex flex-center">
      <div class="col-md-4 flex flex-center q-pa-md">
        <q-pagination v-model="current"
                      :max="10"
                      :max-pages="6"
                      icon-prev="west"
                      icon-next="east"
                      boundary-numbers
                      direction-links />
      </div>
      <div class="col-md-4 flex flex-center q-pa-md">
        <q-pagination v-model="current"
                      :max="10"
                      :max-pages="6"
                      icon-prev="west"
                      icon-next="east"
                      boundary-numbers
                      direction-links />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ToggleTheme',
  data () {
    return {
      current: 1
    }
  }
})
</script>

<style lang="scss" scoped>
  .pagination-container {
    padding: 40px;

    .pagination-title {
      font-size: 28px;
    }
  }
</style>
