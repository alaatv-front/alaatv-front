<template>
  <inside-dialog>
    <template #header-icon>
      <badge-icon :icon="confirmation.icon"
                  color="primary" />
    </template>
    <template #header>
      {{ confirmation.title }}
    </template>
    <template #body>
      {{ confirmation.message }}
    </template>
    <template #action>
      <q-btn v-close-popup
             class="q-btn-md"
             color="grey"
             size="md"
             outline
             @click="deny">
        {{ denyLabel }}
      </q-btn>
      <q-btn class="q-btn-md keep-min-width"
             color="secondary"
             @click="confirm">
        {{ confirmLabel }}
      </q-btn>
    </template>
  </inside-dialog>
</template>

<script>
import { defineComponent } from 'vue'
// import { APIGateway } from 'src/api/APIGateway.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'

const defaultConfirmation = {
  title: 'دیالوگ تایید',
  message: 'آیا تایید می کنید؟',
  icon: 'ph:check-circle',
  name: ''
}

export default defineComponent({
  name: 'ConfirmDialog',
  components: {
    BadgeIcon,
    InsideDialog
  },
  props: {
    confirmation: {
      type: Object,
      default: defaultConfirmation
    },
    confirmLabel: {
      type: String,
      default: 'تغییر'
    },
    denyLabel: {
      type: String,
      default: 'انصراف'
    }
  },
  emits: ['confirm', 'deny'],
  methods: {
    confirm () {
      this.$emit('confirm', this.confirmation.name)
    },
    deny () {
      this.$emit('deny', this.confirmation.name)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
