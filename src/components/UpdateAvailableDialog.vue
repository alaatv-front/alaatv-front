<template>
  <q-dialog v-model="visible"
            :persistent="forceUpdate">
    <q-card class="card">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-2">
            <q-icon name="system_update"
                    size="sm"
                    color="green" />
          </div>
          <div class="col-8 text-bold">آلاء رو بروزرسـانی کُـن !</div>
          <div class="col-2">
            <q-icon v-if="forceUpdate"
                    v-close-popup
                    name="close"
                    class="col-1"
                    size="sm" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item v-for="(option, index) in options.filter(option => option.link)"
                  :key="index"
                  v-ripple
                  clickable
                  @click="selectOption(option)">
            <q-item-section>
              <div class="row q-col-gutter-md">
                <div class="col-2">
                  <q-img :src="option.iconLink" />
                </div>
                <div class="col-10">
                  {{ option.label }}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>
<script>
export default {
  name: 'UpdateAvailableDialog',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    forceUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option)
      if (!this.forceUpdate) {
        this.visible = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  border-radius: 16px;
}
</style>
