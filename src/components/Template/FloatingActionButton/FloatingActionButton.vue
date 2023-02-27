<template>
  <q-page-sticky position="bottom-left"
                 :offset="fabPos">
    <q-fab v-model="pageOptionsFloatingActionButton"
           v-touch-pan.prevent.mouse="moveFab"
           :persistent="true"
           label-position="top"
           external-label
           color="primary"
           icon="isax:edit"
           direction="up">
      <template v-if="!pageBuilderEditable">
        <q-fab-action external-label
                      label-position="right"
                      color="primary"
                      icon="isax:grid-edit"
                      label="ویرایش صفحه"
                      @click="togglePageBuilderEditable" />
        <q-fab-action external-label
                      label-position="right"
                      color="primary"
                      icon="isax:subtitle"
                      label="ویرایش SEO"
                      @click="openSeoDialog" />
      </template>
      <template v-else>
        <q-fab-action external-label
                      label-position="right"
                      color="info"
                      icon="isax:eye"
                      label="نمایش کانفیگ"
                      @click="showPageBuilderConfigs" />
        <q-fab-action external-label
                      label-position="right"
                      color="info"
                      icon="isax:eye"
                      label="پیشنمایش"
                      @click="togglePageBuilderEditable" />
        <q-fab-action external-label
                      label-position="right"
                      color="positive"
                      icon="isax:clipboard-tick"
                      label="تایید"
                      @click="togglePageBuilderEditable" />
        <q-fab-action external-label
                      label-position="right"
                      color="negative"
                      icon="isax:forbidden"
                      label="انصراف"
                      @click="togglePageBuilderEditable" />
      </template>
    </q-fab>
  </q-page-sticky>
  <q-dialog v-model="seoDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup
               flat
               label="OK"
               color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="pageBuilderConfigDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">تنظیمات صفحه</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ currenSections }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup
               flat
               label="کپی کردن"
               color="primary"
               @click="copyPageBuilderConfigs" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { mixinPageOptions } from 'src/mixin/Mixins'

export default {
  name: 'FloatingActionButton',
  mixins: [mixinPageOptions],
  data () {
    return {
      seoDialog: false,
      pageBuilderConfigDialog: false,
      pageBuilderConfigs: {},
      fabPos: [18, 18],
      pageOptionsFloatingActionButton: false
    }
  },
  methods: {
    moveFab (ev) {
      // this.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    showPageBuilderConfigs () {
      this.pageBuilderConfigDialog = true
    },
    copyPageBuilderConfigs () {
      copyToClipboard(JSON.stringify(this.currenSections))
        .then(() => {
          this.$q.notify({
            message: 'کانفیگ کپی شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در کپی کردن کانفیگ رخ داده اس.'
          })
        })
    },
    togglePageBuilderEditable () {
      const newStateOfPageBuilderEditable = !this.$store.getters['PageBuilder/pageBuilderEditable']
      this.$store.commit('PageBuilder/updatePageBuilderEditable', newStateOfPageBuilderEditable)
      if (newStateOfPageBuilderEditable) {
        setTimeout(() => {
          this.pageOptionsFloatingActionButton = true
        }, 700)
      }
    },
    showPageBuilderConfig () {

    },
    openSeoDialog () {
      this.seoDialog = true
    }
  }
}
</script>

<style scoped>

</style>
