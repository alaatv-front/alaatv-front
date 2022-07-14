<template>
  <div>

    <div class="row justify-center test">
      <div :style="{backgroundColor:value.backgroundColor,
                    borderColor:value.backgroundColor,
                    color:value.textColor
           }"
           class="col-2 text-center plan-style">
        {{title}}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'planStylePreview',
  props: {
    value: {
      default: {
        backgroundColor: '',
        borderColor: '',
        textColor: ''
      }
    },
    title: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({

  })
}
</script>

<style scoped>
.plan-style{
  border-radius: 15px
}
</style>
