<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-table dir="rtl"
               :rows="rows"
               :columns="columns"
               row-key="name">
        <template #top>
          <div class="col-md-6 col-12">
            جدول اسلایدها
          </div>
          <div class="col-md-6 col-12 flex justify-end">
            <q-btn size="md"
                   class="q-py-lg"
                   color="green-7"
                   label="افزودن بنر"
                   dense
                   icon="add"
                   @click="addBanner" />
          </div>
        </template>
        <template v-slot:body-cell-view="props">
          <q-td key="view"
                :props="props"
                auto-width>
            <q-btn size="sm"
                   color="secondary"
                   round
                   dense
                   :icon="'edit'"
                   @click="showFullBanner(props.row.name)" />
          </q-td>
        </template>
        <template v-slot:body-cell-photo="props">
          <q-td key="photo"
                class="thumbnail"
                :props="props"
                auto-width>
            <lazy-img :src="props.row.photo"
                      class="full-width" />
          </q-td>
        </template>
        <template v-slot:body-cell-remove="props">
          <q-td key="view"
                :props="props"
                auto-width>
            <q-btn class="q-mr-lg"
                   size="sm"
                   color="red-8"
                   round
                   dense
                   :icon="'delete'"
                   @click="removeBanner(props.row.name)" />
          </q-td>
        </template>
      </q-table>
    </template>
  </option-panel-tabs>
  <q-dialog v-model="expandBanner">
    <q-card>
      <q-card-section>
        <q-btn v-close-popup
               icon="close"
               flat
               round
               dense
               @click="responsive = ''" />
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-6">
            <q-input v-model="selectedSlide.title"
                     label="title" />
          </div>
          <div class="col-6">
            <q-input v-model="selectedSlide.link"
                     label="link" />
          </div>
          <div class="col-6">
            <div class="cehckBox">
              <q-checkbox v-model="localOptions.list[selectedBannerIndex].useAEEEvent"
                          label="استفاده از ایونت GTM"
                          right-label />
            </div>
          </div>
          <div class="col-12">
            <div v-if="localOptions.list[selectedBannerIndex].useAEEEvent"
                 class="action-container q-gutter-lg-md">
              <div>فیلد های مورد نظر ایونت GTM :</div>
              <div class="col-9">
                <div class="outsideLabel">id</div>
                <q-input v-model="localOptions.list[selectedBannerIndex].AEEEventBody.id"
                         label="id" />
              </div>
              <div class="col-6">
                <div class="outsideLabel">name</div>
                <q-input v-model="localOptions.list[selectedBannerIndex].AEEEventBody.name"
                         label="name" />
              </div>
              <div class="col-6">
                <div class="outsideLabel">creative</div>
                <q-input v-model="localOptions.list[selectedBannerIndex].AEEEventBody.creative"
                         label="creative" />
              </div>
              <div class="col-6">
                <div class="outsideLabel">position</div>
                <q-input v-model="localOptions.list[selectedBannerIndex].AEEEventBody.position"
                         label="position" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h6 class="q-mb-md">تک عکس (singel image)</h6>
          <banner-preview v-model:banner="selectedSlide"
                          v-model:options="localOptions"
                          @updateImage="updateImage"
                          @updateVideo="updateVideo" />
        </div>
        <div>
          <q-table dir="rtl"
                   title="جدول رسپانسیو (multuple images)"
                   :rows="responsiveRows"
                   :columns="responsiveColumns"
                   row-key="name">
            <template v-slot:body-cell-view="props">
              <q-td key="view"
                    :props="props"
                    auto-width>
                <q-btn size="sm"
                       color="secondary"
                       round
                       dense
                       :icon="'edit'"
                       @click="showFullResponsiveBanner(props.row.name)" />
              </q-td>
            </template>
            <template v-slot:body-cell-thumbnail="props">
              <q-td key="thumbnail"
                    class="thumbnail"
                    :props="props"
                    auto-width>
                <lazy-img v-if="!props.row.video"
                          :src="props.row.thumbnail"
                          class="full-width" />
                <video v-else
                       autoplay
                       loop
                       muted
                       class="full-width">
                  <source :src="props.row.video">
                  Your browser does not support the video tag.
                </video>
              </q-td>
            </template>
            <template v-slot:body-cell-remove="props">
              <q-td key="view"
                    :props="props"
                    auto-width>
                <q-btn class="q-mr-lg"
                       size="sm"
                       color="red-8"
                       round
                       dense
                       :icon="'delete'"
                       @click="removeSizeFeatures(props.row.name)" />
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="expandResponsiveBanner">
    <q-card>
      <q-card-section class="q-pb-none">
        <q-btn v-close-popup
               icon="close"
               flat
               round
               dense />
      </q-card-section>
      <q-card-section>
        <banner-preview v-model:banner="selectedSlide"
                        v-model:options="localOptions"
                        :size="selectedResponsiveSize"
                        @updateImage="updateImage"
                        @updateVideo="updateVideo" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { Banner } from 'src/models/Banner.js'
import lazyImg from 'src/components/lazyImg.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import bannerPreview from 'src/components/Widgets/Slider/bannerPreview.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    bannerPreview,
    lazyImg
  },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      windowWidth: 0,
      expandBanner: false,
      expandResponsiveBanner: false,
      file: null,
      responsive: '',
      isResponsive: false,
      selectedSlide: new Banner(),
      selectedResponsiveSize: '',
      selectedBannerIndex: 0,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'ردیف',
          align: 'center',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'title',
          align: 'center',
          label: 'عنوان',
          field: row => row.title
        },
        {
          name: 'photo',
          align: 'center',
          label: 'تصویر',
          field: row => row.photo
        },
        {
          name: 'view',
          align: 'center',
          label: 'مشاهده',
          field: row => row.view
        },
        {
          name: 'remove',
          align: 'center',
          label: 'حذف بنر',
          field: row => row.remove
        }
      ],
      rows: [],
      responsiveColumns: [
        {
          name: 'name',
          required: true,
          label: 'break point',
          align: 'center',
          field: row => row.name
        },
        {
          name: 'size',
          required: true,
          label: 'اندازه صفحه',
          align: 'center',
          field: row => row.size
        },
        {
          name: 'thumbnail',
          align: 'center',
          label: 'تصویر',
          field: row => row.thumbnail
        },
        {
          name: 'view',
          align: 'center',
          label: 'مشاهده',
          field: row => row.view
        },
        {
          name: 'remove',
          align: 'center',
          label: 'حذف',
          field: row => row.remove
        }
      ],
      responsiveRows: [
        {
          name: 'xl',
          size: 'size >= 1920 px',
          thumbnail: '',
          video: ''
        },
        {
          name: 'lg',
          size: 'size >= 1440 px',
          thumbnail: '',
          video: ''
        },
        {
          name: 'md',
          size: 'size >= 1024 px',
          thumbnail: '',
          video: ''
        },
        {
          name: 'sm',
          size: 'size >= 600 px',
          thumbnail: '',
          video: ''
        },
        {
          name: 'xs',
          size: 'size >= 0 px',
          thumbnail: '',
          video: ''
        }
      ],
      defaultOptions: {
        list: []
      }
    }
  },
  watch: {
    selectedSlide: {
      handler () {
        this.updateBanner()
      }
    }
  },
  created () {
    this.initTable()
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.windowWidth = window.innerWidth
    },
    addBanner () {
      const rowNumber = this.localOptions.list.length + 1
      this.localOptions.list.push({
        title: '',
        photo: {
          src: '',
          width: '',
          height: ''
        },
        features: {
          xl: {
            src: '',
            width: '',
            height: ''
          },
          lg: {
            src: '',
            width: '',
            height: ''
          },
          md: {
            src: '',
            width: '',
            height: ''
          },
          sm: {
            src: '',
            width: '',
            height: ''
          },
          xs: {
            src: '',
            width: '',
            height: ''
          }
        },
        link: '',
        useAEEEvent: false,
        AEEEventBody: {
          id: '-',
          name: '-',
          creative: null,
          position: null
        }
      })
      this.rows.push({
        name: rowNumber,
        title: '',
        photo: ''
      })
    },
    responsiveFeatures (features) {
      if (this.windowWidth >= 1920) {
        return features.xl.src !== '' ? features.xl : features.lg.src !== '' ? features.lg : features.sm.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return features.lg.src !== '' ? features.lg : features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 599) {
        return features.xs.src !== '' ? features.xs : features.sm.src !== '' ? features.sm : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      }
    },
    removeBanner (name) {
      const index = this.rows.findIndex(row => row.name === name)
      this.localOptions.list.splice(index, 1)
      this.rows.splice(index, 1)
    },
    removeSizeFeatures (size) {
      this.localOptions.list[this.selectedBannerIndex].features[size].src = ''
      this.updateResponsiveRows()
    },
    initTable () {
      for (let i = 0; i < this.localOptions.list.length; i++) {
        this.rows.push({
          name: i + 1,
          title: this.localOptions.list[i].title,
          photo: this.localOptions.list[i].photo.src ? this.localOptions.list[i].photo.src : this.responsiveFeatures(this.localOptions.list[i].features).src
        })
      }
    },
    isVideo () {
      return !!this.localOptions.video
    },
    isPhoto () {
      return !!this.localOptions.photo
    },
    hasThumbnail () {
      return this.isVideo() && this.isPhoto()
    },
    updateTable () {
      for (let i = 0; i < this.localOptions.list.length; i++) {
        this.rows[i] = {
          name: i + 1,
          title: this.localOptions.list[i].title,
          photo: this.localOptions.list[i].photo.src ? this.localOptions.list[i].photo.src : this.responsiveFeatures(this.localOptions.list[i].features).src
        }
      }
    },
    updateBanner () {
      this.localOptions.list[this.selectedBannerIndex] = this.selectedSlide
      this.updateTable()
    },
    showFullBanner (index) {
      this.expandBanner = true
      this.selectedSlide = new Banner(this.localOptions.list[index - 1])
      this.selectedBannerIndex = index - 1
      this.updateResponsiveRows()
    },
    showFullResponsiveBanner (name) {
      this.expandResponsiveBanner = true
      this.selectedSlide.features[name].src = this.localOptions.list[this.selectedBannerIndex].features[name].src
      this.selectedSlide.features[name].videoSrc = this.localOptions.list[this.selectedBannerIndex].features[name].videoSrc
      this.selectedSlide.features[name].videoWidth = this.localOptions.list[this.selectedBannerIndex].features[name].videoWidth
      this.selectedSlide.features[name].videoHeight = this.localOptions.list[this.selectedBannerIndex].features[name].videoHeight
      this.selectedResponsiveSize = name
    },
    updateResponsiveRows () {
      this.responsiveRows.forEach(row => {
        Object.keys(this.localOptions.list[this.selectedBannerIndex].features).forEach(key => {
          if (key === row.name) {
            row.thumbnail = this.localOptions.list[this.selectedBannerIndex].features[key].src
            row.video = this.localOptions.list[this.selectedBannerIndex].features[key].videoSrc
          }
        })
      })
    },
    updateImage (data) {
      if (!this.localOptions.list[this.selectedBannerIndex].features[data.size]) {
        this.localOptions.list[this.selectedBannerIndex].features[data.size] = {}
      }
      this.localOptions.list[this.selectedBannerIndex].features[data.size].width = data.width
      this.localOptions.list[this.selectedBannerIndex].features[data.size].height = data.height
      if (data.size) {
        this.localOptions.list[this.selectedBannerIndex].features[data.size].src = data.src
        const index = this.responsiveRows.findIndex(row => row.name === data.size)
        this.responsiveRows[index].thumbnail = data.src
      } else {
        this.localOptions.list[this.selectedBannerIndex].photo.src = data.src
      }

      this.$emit('update:options', this.localOptions)
    },
    updateVideo (data) {
      if (!this.localOptions.list[this.selectedBannerIndex].features[data.size]) {
        this.localOptions.list[this.selectedBannerIndex].features[data.size] = {}
      }
      this.localOptions.list[this.selectedBannerIndex].features[data.size].videoWidth = data.width
      this.localOptions.list[this.selectedBannerIndex].features[data.size].videoHeight = data.height
      if (data.size) {
        this.localOptions.list[this.selectedBannerIndex].features[data.size].videoSrc = data.src
        const index = this.responsiveRows.findIndex(row => row.name === data.size)
        this.responsiveRows[index].videoSrc = data.src
      } else {
        this.localOptions.list[this.selectedBannerIndex].video.src = data.src
      }

      this.$emit('update:options', this.localOptions)
    }
  }
})
</script>

<style scoped>
.thumbnail {
  padding: 0;
}

.card {
  width: 50%;
}
</style>
