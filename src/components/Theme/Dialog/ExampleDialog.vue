<template>
  <div>
    dialog
    <div v-for="(item, index) in sizes"
         :key="index">
      <q-btn color="primary"
             @click="dialogValue[item.size] = true">Open Dialog {{item.size}}</q-btn>
      <q-dialog v-model="dialogValue[item.size]">
        <q-card>
          ;sdolk;sflk
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleDialog',
  data() {
    return {
      dialogValue: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false
      },
      sizes: [
        {
          size: 'xs',
          cardClass: 'dialog-xs'
        },
        {
          size: 'sm',
          cardClass: 'dialog-sm'
        },
        {
          size: 'md',
          cardClass: 'dialog-md'
        },
        {
          size: 'lg',
          cardClass: 'dialog-lg'
        },
        {
          size: 'xl',
          cardClass: 'dialog-xl'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
