<template>
  <div class="actionBtn">
    <q-btn icon="ph:arrow-counter-clockwise"
           color="grey"
           class="reload-icon"
           outline
           square
           @click="onClick('reload')" />
    <q-btn label="اعمال"
           color="grey"
           outline
           square
           @click="onClick('filter')" />
  </div>
</template>

<script>
export default {
  name: 'actionBtn',
  methods: {
    onClick (data) {
      this.$emit('onClick', data)
    }
  }
}
</script>

<style scoped lang="scss">
.actionBtn {
  padding-top: 8px;
  display: flex;
  justify-content: flex-end;

  @media screen and (width <=599px ) {
    padding-top: 0;
  }

  .reload-icon{
    margin-right: 16px;
  }
}
</style>
