<template>
  <div class="actionBtn">
    <q-btn icon="isax:rotate-left"
           class="reload-icon "
           color="primary"
           unelevated
           @click="onClick('reload')" />
    <q-btn unelevated
           class="filter-btn"
           color="primary"
           padding="1px 23px"
           label="اعمال"
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
  //padding-top: 33px;
  display: flex;
  justify-content: flex-end;
  @media screen and(max-width:599px ) {
  padding-top: 0;
  }
  .filter-btn{
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #FFFFFF;
  }
  .reload-icon{
    color: #6D708B;
    background-color: #ffe9cc;
    margin-right: 16px;
  }
}
</style>
