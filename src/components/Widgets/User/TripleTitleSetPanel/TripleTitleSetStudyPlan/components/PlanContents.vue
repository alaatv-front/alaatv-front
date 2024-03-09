<template>
  <div class="plan-contents">
    <div :class="{'order-last': !firstPamphlet}">
      <q-list v-if="pamphletContents.length > 0"
              separator
              dense>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-icon name="ph:book-open-text"
                      size="20px"
                      color="blue-grey-7" />
              لیست جزوات
            </q-item-label>
          </q-item-section>
        </q-item>
        <plan-content v-for="content in pamphletContents"
                      :key="content.id"
                      :plan="plan"
                      :content="content" />
      </q-list>
    </div>
    <div v-if="nonEducationalLayerVideos.length > 0">
      <q-list dense
              class="q-mt-lg">
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-icon name="ph:video-camera"
                      size="20px"
                      color="blue-grey-7" />
              لیست فیلم ها
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
      <q-list dense
              separator>
        <plan-content v-for="content in nonEducationalLayerVideos"
                      :key="content.id"
                      :plan="plan"
                      :content="content" />
      </q-list>
    </div>
    <div v-if="educationalLayerVideos.length > 0">
      <q-list dense
              class="q-mt-lg">
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-icon name="ph:video"
                      size="20px"
                      color="blue-grey-7" />
              لیست دسته فیلم ها
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
      <q-tabs v-model="tab"
              dense
              class="text-grey bg-blue-grey-1"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator>
        <q-tab v-for="(educationalLayer, educationalLayerIndex) in educationalLayerVideos"
               :key="educationalLayerIndex"
               :name="educationalLayer.title"
               :label="educationalLayer.title" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-for="(educationalLayer, educationalLayerIndex) in educationalLayerVideos"
                    :key="educationalLayerIndex"
                    v-model="tab">
        <q-tab-panel :name="educationalLayer.title">

          <q-list dense
                  separator>
            <plan-content v-for="content in educationalLayer.contents"
                          :key="content.id"
                          :plan="plan"
                          :content="content" />
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { Plan } from 'src/models/Plan.js'
import PlanContent from './PlanContent.vue'

export default {
  name: 'PlanContents',
  components: { PlanContent },
  props: {
    educationalLayers: {
      type: Array,
      default () {
        return []
      }
    },
    firstPamphlet: {
      type: Boolean,
      default: true
    },
    plan: {
      type: Plan
    }
  },
  data () {
    return {
      tab: '',
      existSteps: []
    }
  },
  computed: {
    nonEducationalLayerVideos () {
      return this.videoContents.filter(content => {
        let hasEducationalLayer = false
        this.educationalLayers.forEach(educationalLayer => {
          if (content.title.includes(educationalLayer)) {
            hasEducationalLayer = true
          }
        })

        return !hasEducationalLayer
      })
    },
    educationalLayerVideos () {
      const tebs = []
      this.educationalLayers.forEach(educationalLayer => {
        const contents = this.videoContents.filter(content => content.title.includes(educationalLayer))
        if (contents.length > 0) {
          tebs.push({
            title: educationalLayer,
            contents
          })
        }
      })

      return tebs
    },
    pamphletContents () {
      return this.plan.contents.list.filter(content => content.isPamphlet())
    },
    videoContents () {
      return this.plan.contents.list.filter(content => content.isVideo())
    }
  },
  mounted () {
    this.getExistEducationalLayers()
  },
  methods: {
    getExistEducationalLayers () {
      this.videoContents.forEach(content => {
        const step = this.educationalLayers.find(step => content.title.includes(step))
        if (step && !this.existSteps.includes(step)) {
          this.existSteps.push(step)
        }
      })
      this.tab = this.existSteps.length > 0 ? this.existSteps[0] : ''
    },
    stepVideoContents (step) {
      return this.videoContents.filter(content => content.title.includes(step))
    },
    otherVideoContents () {
      const contents = this.videoContents
      const existSteps = this.existSteps
      this.videoContents.forEach(content => {
        if (existSteps.some(step => !content.title.includes(step))) {
          contents.push(content)
        }
      })
      return contents
    },
    downloadPdf (content) {
      if (!content?.file?.pamphlet || !content?.file?.pamphlet[0] || !content?.file?.pamphlet[0].link) {
        this.$q.notify({
          type: 'negative',
          message: 'مشکلی در دانلود فایل pdf این محتوا رخ داده است.'
        })
        return
      }

      window.open(content.file.pamphlet[0].link, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.plan-contents {

}
</style>
