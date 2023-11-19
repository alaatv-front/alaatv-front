<template>
  <div v-for="(info, index) in data"
       :key="index"
       class="row">
    <div class="col-1">
      <q-icon name="isax:play-circle" />
    </div>
    <div class="col-10">
      {{info.code}} - {{info.text}}
    </div>
    <div class="col-1">
      <q-icon name="isax:trash" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionInfo',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
