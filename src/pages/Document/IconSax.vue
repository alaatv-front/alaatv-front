<template>
  <div class="row justify-center q-my-lg">
    <div class="col-10">
      <q-card>
        <q-card-section>
          <h2>IconSax-SVG</h2>
        </q-card-section>
        <q-card-section>
          {{ filterIconName }}
          <q-input v-model="filterIconName"
                   label="serch" />
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div v-for="svgIcon in svgIcons"
                 :key="svgIcon"
                 class="col-md-2 text-center">
              <q-btn :label="svgIcon"
                     :icon="'isax-svg:' + svgIcon"
                     flat
                     class="full-width"
                     @click="copyIconName('isax-svg:' + svgIcon)" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import SvgIcons from 'src/iconListDoocument/svg-icons.js'
export default {
  name: 'IconSax',
  data () {
    return {
      filterIconName: null
    }
  },
  computed: {
    svgIcons () {
      if (!this.filterIconName) {
        return SvgIcons
      }
      return SvgIcons.filter(icon => icon.includes(this.filterIconName))
    }
  },
  methods: {
    copyIconName (iconName) {
      copyToClipboard(iconName)
        .then(() => {
          this.$q.notify({
            message: 'نام آیکون کپی شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در کپی کردن نام آیکون رخ داده اس.'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
