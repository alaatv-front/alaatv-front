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
                      @click="acceptPageBuilderConfig" />
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
    <q-card class="seo-option-panel-in-floating-btn">
      <q-card-section>
        <div class="text-h6">SEO</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div dir="ltr">
          main:
        </div>
        <q-input v-model="seo.title"
                 label="title" />
        <q-input v-model="seo.description"
                 label="description"
                 type="textarea" />
        <q-input v-model="seo.robots"
                 label="description" />
        <q-separator />
        <div dir="ltr">
          open graph:
        </div>
        <q-input v-model="seo.ogTitle"
                 label="open graph title" />
        <q-input v-model="seo.ogDescription"
                 label="open graph description"
                 type="textarea" />
        <q-input v-model="seo.ogUrl"
                 label="open graph url"
                 dir="ltr" />
        <q-input v-model="seo.ogImage"
                 label="open graph image"
                 dir="ltr" />
        <q-img :src="seo.ogImage" />
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
import { APIGateway } from 'src/api/APIGateway'
import { PageSetting } from 'src/models/PageSetting'

export default {
  name: 'FloatingActionButton',
  mixins: [mixinPageOptions],
  data () {
    return {
      seo: {
        title: null,
        description: null,
        robots: null,
        ogTitle: null,
        ogUrl: null,
        ogDescription: null,
        ogImage: null
      },
      seoDialog: false,
      pageBuilderConfigDialog: false,
      pageBuilderConfigs: {},
      fabPos: [18, 18],
      pageOptionsFloatingActionButton: false
    }
  },
  created () {
    this.loadDefaultSeoData()
  },
  methods: {
    updateSeo () {
      this.$store.commit('SEO/updateTitle', this.seo.title)
      this.$store.commit('SEO/updateDescription', this.seo.description)
      this.$store.commit('SEO/updateRobots', this.seo.robots)
      this.$store.commit('SEO/updateOgTitle', this.seo.ogTitle)
      this.$store.commit('SEO/updateOgDescription', this.seo.ogDescription)
      this.$store.commit('SEO/updateOgUrl', this.seo.ogUrl)
      this.$store.commit('SEO/updateOgImage', this.seo.ogImage)
      this.updateSetting()
    },
    updateSetting () {
      const params = JSON.stringify(this.$route.params)
      const routeName = this.$route.name
      const key = 'route_name:' + routeName + '-params:' + params
      const sections = this.$store.getters['PageBuilder/currentSections']
      const seo = {
        title: this.$store.getters['SEO/title'],
        description: this.$store.getters['SEO/description'],
        robots: this.$store.getters['SEO/robots'],
        ogTitle: this.$store.getters['SEO/ogTitle'],
        ogUrl: this.$store.getters['SEO/ogUrl'],
        ogDescription: this.$store.getters['SEO/ogDescription'],
        ogImage: this.$store.getters['SEO/ogImage']
      }
      const value = new PageSetting({
        value: { sections, seo, layoutConfig: {} }
      }).getStringifyValue()
      APIGateway.pageSetting.update({ key, value })
        .then(() => {
          this.currenSections = []
          this.$store.commit('PageBuilder/updatePageBuilderEditable', false)
        })
    },
    loadDefaultSeoData () {
      this.seo.title = this.$store.getters['SEO/title']
      this.seo.description = this.$store.getters['SEO/description']
      this.seo.robots = this.$store.getters['SEO/robots']
      this.seo.ogTitle = this.$store.getters['SEO/ogTitle'] ? this.$store.getters['SEO/ogTitle'] : this.seo.title
      this.seo.ogUrl = this.$store.getters['SEO/ogUrl'] ? this.$store.getters['SEO/ogUrl'] : ''
      this.seo.ogDescription = this.$store.getters['SEO/ogDescription'] ? this.$store.getters['SEO/ogDescription'] : this.seo.description
      this.seo.ogImage = this.$store.getters['SEO/ogImage']
    },
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
    acceptPageBuilderConfig () {
      this.updateSetting()
    },
    showPageBuilderConfig () {

    },
    openSeoDialog () {
      this.seoDialog = true
    }
  }
}
</script>

<style lang="scss">
.seo-option-panel-in-floating-btn {
  &.q-card {
    width: 700px;
    max-width: 80vw;
  }
}
</style>
