<template>
  <div class="row justify-center q-my-lg">
    <div class="col-10">
      <q-card>
        <q-card-section class="text-center">
          <h2>IconSax-Font</h2>
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
                     :icon="'isax:' + svgIcon"
                     flat
                     class="full-width"
                     @click="copyIconName('isax:' + svgIcon)" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import IconList from 'src/iconListDoocument/font-icons.js'
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
        return IconList
      }
      return IconList.filter(icon => icon.includes(this.filterIconName))
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
