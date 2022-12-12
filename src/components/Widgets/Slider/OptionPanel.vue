<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <q-table
          dir="rtl"
          title="جدول اسلایدها"
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-view="props">
            <q-td key="view"
                  :props="props"
                  auto-width>
              <q-btn class="q-mr-lg"
                     size="sm"
                     color="secondary"
                     round
                     dense
                     :icon="'add'"
                     @click="showFullBanner(props.row.name)" />
            </q-td>
          </template>
          <template v-slot:body-cell-photo="props">
            <q-td key="photo"
                  :props="props"
                  auto-width>
              <q-img :src="props.row.photo" />
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog v-model="expandBanner"
                persistent>
        <q-card v-ripple
                class="column"
                clickable
        >
          <div class="row col-12">
            <q-card-section class="row items-center q-pb-none">
              <q-btn v-close-popup
                     icon="close"
                     flat
                     round
                     dense
                     @click="responsive = ''" />
            </q-card-section></div>
          <div class="col-12 row">
            <q-card-section class="col-5">
              <q-input v-model="selectedSlide.title"
                       label="title"
              />
            </q-card-section>
            <q-card-section class="col-5">
              <q-input v-model="selectedSlide.link"
                       label="link"
              />
            </q-card-section>
            <q-card-section class="col-2">
              <q-input v-model="selectedSlide.ratio"
                       label="ratio"
              />
            </q-card-section>
          </div>
          <div class="row col-12 q-ml-md">
            <q-select v-model="responsive"
                      class="col-4"
                      :options="responsiveOptions"
                      label="responsive" />
          </div>
          <div v-if="responsive === 'xl'"
               class="row col-12">
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.features.xl.src"
                       label="src"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.xl.width"
                       label="width"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.xl.height"
                       label="height"
              />
            </q-card-section>
          </div>
          <div v-if="responsive === 'lg'"
               class="row col-12">
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.features.lg.src"
                       label="src"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.lg.width"
                       label="width"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.lg.height"
                       label="height"
              />
            </q-card-section>
          </div>
          <div v-if="responsive === 'md'"
               class="row col-12">
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.features.md.src"
                       label="src"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.md.width"
                       label="width"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.md.height"
                       label="height"
              />
            </q-card-section>
          </div>
          <div v-if="responsive === 'sm'"
               class="row col-12">
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.features.sm.src"
                       label="src"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.sm.width"
                       label="width"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.sm.height"
                       label="height"
              />
            </q-card-section>
          </div>
          <div v-if="responsive === 'xs'"
               class="row col-12">
            <q-card-section class="col-6">
              <q-input v-model="selectedSlide.features.xs.src"
                       label="src"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.xs.width"
                       label="width"
              />
            </q-card-section>
            <q-card-section class="col-2 offset-1">
              <q-input v-model="selectedSlide.features.xs.height"
                       label="height"
              />
            </q-card-section>
          </div>
          <div class="row col-12">
            <q-card-section class="col-12">
              <q-input v-model="selectedSlide.photo.src" />
            </q-card-section>
          </div>
          <div class="row col-12">
            <q-card-section class="col-12">
              <q-img :src="selectedSlide.photo.src" />
            </q-card-section>
          </div>
        </q-card>
      </q-dialog>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import mixinOptionPanel from 'quasar-ui-q-page-builder/src/mixin/OptionPanel.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import { Banner } from 'src/models/Banner'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      expandBanner: false,
      file: null,
      responsive: '',
      selectedSlide: new Banner(),
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
          field: row => row.title,
          sortable: true
        },
        {
          name: 'photo',
          align: 'center',
          label: 'تصویر',
          field: row => row.photo,
          sortable: true
        },
        {
          name: 'view',
          align: 'center',
          label: 'مشاهده بیشتر',
          field: row => row.view,
          sortable: true
        }
      ],
      rows: [],
      responsiveOptions: ['xl', 'lg', 'md', 'sm', 'xs'],
      defaultOptions: {
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
        photo: {
          src: ''
        },
        title: '',
        ratio: 1,
        link: ''
      }
    }
  },
  created() {
    for (let i = 0; i < this.localOptions.list.length; i++) {
      this.rows.push({
        name: i + 1,
        title: this.localOptions.list[i].title,
        photo: this.localOptions.list[i].photo.src
      })
    }
  },
  methods: {
    showFullBanner(index) {
      this.expandBanner = true
      this.selectedSlide = new Banner(this.localOptions.list[index - 1])
    }
  }
})
</script>

<style scoped>

</style>
