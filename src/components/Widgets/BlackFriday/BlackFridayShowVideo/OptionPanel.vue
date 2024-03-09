<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-show="true">
    <template #main-tab>

      <div class="q-my-md">
        <q-input v-model="localOptions.startIndex"
                 type="number"
                 label="step startIndex" />
      </div>
      <q-expansion-item expand-separator
                        icon="ph:arrow-down"
                        label="Scroll settings">
        <div class="row q-py-md q-col-gutter-md">
          <div class="col-6">
            <q-input v-model="localOptions.scrollToProducts"
                     label="scrollTo Products" />
          </div>
          <div class="col-6">
            <q-input v-model="localOptions.scrollToParticipateSection"
                     label="scrollTo Participate Section" />
          </div>
        </div>
      </q-expansion-item>
      <q-expansion-item expand-separator
                        icon="ph:steps"
                        label="Steps Icons">
        <div class="row q-py-md q-col-gutter-md">
          <div class="col-2">
            <q-input v-model="icon.index"
                     label="Step index" />
          </div>
          <div class="col-8">
            <q-input v-model="icon.src"
                     label="Icon Src" />
          </div>
          <div class="col-2">
            <q-btn color="primary"
                   label="Add"
                   @click="addIcon" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-list v-if="localOptions.stepsIconList.length > 0"
                    bordered>
              <q-item v-for="(iconItem, index) in localOptions.stepsIconList"
                      :key="index"
                      clickable>
                <q-item-section avatar>
                  <q-avatar size="60px"
                            color="primary">
                    <lazy-img :src="iconItem.src" />
                  </q-avatar>
                </q-item-section>
                <q-item-section side>
                  <q-input v-model="localOptions.stepsIconList[index].index"
                           type="text"
                           class="no-title" />
                </q-item-section>
                <q-item-section>
                  <q-input v-model="localOptions.stepsIconList[index].src"
                           type="text"
                           class="no-title" />
                </q-item-section>
                <q-item-section side>
                  <q-btn color="primary"
                         icon="ph:trash"
                         square
                         @click="deleteIcon(index)" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-expansion-item>
      <q-expansion-item expand-separator
                        icon="ph:gear"
                        label="Advance settings">
        <div class="row q-py-md q-col-gutter-md">
          <div class="col-3">
            <q-checkbox v-model="localOptions.popupForFirstVideo"
                        label="popup for first video" />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.showBtn"
                        label="show Btn" />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.disablePlaybackRateMenuButton"
                        label="disable Playback Rate Menu Button" />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.disableProgressControl"
                        label="disable Progress Control" />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.fromFirstIndex"
                        label="from First Index" />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.hasNewsletter"
                        label="has Newsletter" />
          </div>
          <div class="col-3">
            <q-input v-if="localOptions.hasNewsletter"
                     v-model="localOptions.newsletterEventName"
                     type="text"
                     label="Newsletter Event Name" />
          </div>
        </div>
      </q-expansion-item>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    LazyImg
  },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      icon: {
        index: null,
        src: null
      },
      defaultOptions: {
        showBtn: false,
        startIndex: 0,
        stepsIconList: [],
        hasNewsletter: false,
        fromFirstIndex: false,
        scrollToProducts: null,
        newsletterEventName: '',
        popupForFirstVideo: true,
        disableProgressControl: true,
        scrollToParticipateSection: null,
        disablePlaybackRateMenuButton: true
      }
    }
  },
  methods: {
    addIcon () {
      this.localOptions.stepsIconList.push(JSON.parse(JSON.stringify(this.icon)))
    },
    deleteIcon (index) {
      this.localOptions.stepsIconList.splice(index, 1)
    }
  }
})
</script>
