<template>
  <div class="plan-contents row q-col-gutter-md">
    <div v-if="pamphletContents.length > 0"
         class="col-12">
      <q-list dense
              bordered>
        <q-item-label class="text-center"
                      header>لیست جزوات</q-item-label>
        <div v-for="content in pamphletContents"
             :key="content.id">
          <q-item>
            <q-item-section avatar>
              <q-icon name="ph:book-open-text"
                      color="grey-7"
                      class="size-md" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{content.title}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div>
                <q-btn color="primary"
                       round
                       unelevated
                       :disable="!content.id"
                       icon="download"
                       class="size-xs"
                       @click="downloadPdf(content)" />
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>
      </q-list>
    </div>
    <!--    <div v-for="content in pamphletContents"-->
    <!--         :key="content.id"-->
    <!--         class="col-md-6 col-xs-12">-->
    <!--      <plan-content :plan="plan"-->
    <!--                    :content="content" />-->
    <!--    </div>-->
    <div v-for="content in otherVideoContentsَ"
         :key="content.id"
         class="col-md-6 col-xs-12">
      <plan-content :plan="plan"
                    :content="content" />
    </div>
    <div v-if="videoContents.length > 0"
         class="col-12">
      <q-list bordered>
        <q-item-label header
                      class="text-center">لیست فیلم ها</q-item-label>
        <q-tabs v-if="steps.length > 0"
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator>
          <div v-for="step in getExistSteps()"
               :key="step"
               class="col-grow">
            <q-tab :name="step"
                   :label="step" />
          </div>
        </q-tabs>

        <q-separator />

        <div v-if="steps.length > 0">
          <q-tab-panels v-for="step in getExistSteps()"
                        :key="step"
                        v-model="tab"
                        animated>
            <q-tab-panel :name="step">
              <div v-for="content in stepVideoContents(step)"
                   :key="content.id">
                <q-item>
                  <q-item-section>
                    <q-item-label>{{content.title}}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div>
                      <q-btn v-if="content.isVideo()"
                             color="primary"
                             round
                             unelevated
                             :disable="!content.id"
                             class="size-xs"
                             icon="play_arrow"
                             :to="{name:'UserPanel.Asset.TripleTitleSet.Content', params:{ productId: plan.product?.id, setId: content.set?.id, contentId: content?.id}}" />
                      <span v-if="!content.title"
                            class="item-plan--title">
                        {{ 'ویدیو ندارد' }}
                      </span>
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-list>
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
    steps: {
      type: Array,
      default () {
        return []
      }
    },
    plan: {
      type: Plan
    }
  },
  data () {
    return {
      tab: ''
    }
  },
  computed: {
    pamphletContents () {
      return this.plan.contents.list.filter(content => content.isPamphlet())
    },
    videoContents () {
      return this.plan.contents.list.filter(content => content.isVideo())
    }
  },
  mounted () {
    this.tab = this.steps[0]
  },
  methods: {
    getExistSteps () {
      const existSteps = []
      this.videoContents.forEach(content => {
        const step = this.steps.find(step => content.title.includes(step))
        if (step && !existSteps.includes(step)) {
          existSteps.push(step)
        }
      })
      return existSteps
    },
    stepVideoContents (step) {
      return this.videoContents.filter(content => content.title.includes(step))
    },
    otherVideoContentsَ () {
      const contents = []
      const existSteps = this.getExistSteps()
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
