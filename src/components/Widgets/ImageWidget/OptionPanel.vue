<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-spacing="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="input-container col-12 q-mt-md">

            <div class="outsideLabel">آدرس فایل عکس</div>
            <image-upload-input v-model:value ="localOptions.imageSource"
                                @update:value="updateBackground($event, 'all')" />

          </div>
          <!--          <div class="input-container q-py-md">-->
          <!--            <div class="outsideLabel">height</div>-->
          <!--            <q-input v-model="localOptions.height"-->
          <!--                     label="image" />-->
          <!--          </div>-->
          <div class="input-container col-4">
            <div class="outsideLabel">size</div>
            <q-select v-model="size"
                      :options="sizeOptions"
                      label="page size" />
          </div>
          <div class="input-container col-4">

            <div class="outsideLabel">عرض در سایز {{size}}</div>
            <q-input v-model="localOptions[size].width"
                     label="width" />
          </div>
          <div class="input-container col-4">

            <div class="outsideLabel">ارتفاع در سایز {{size}}</div>
            <q-input v-model="localOptions[size].height"
                     label="height" />
          </div>
          <div class="input-container col-12">
            <div class="outsideLabel">لینک عکس در سایز {{size}}</div>
            <image-upload-input v-model:value ="localOptions[size].src"
                                @update:value="updateBackground($event, size)" />
          </div>
          <div class="action col-md-12">
            <div class="cehckBox">
              <q-checkbox v-model="localOptions.useAEEEvent"
                          label="استفاده از ایونت GTM"
                          right-label />
            </div>
            <div v-if="localOptions.useAEEEvent"
                 class="action-container q-gutter-lg-md">
              <div>فیلد های مورد نظر ایونت GTM :</div>
              <div class="col-9">
                <div class="outsideLabel">id</div>
                <q-input v-model="localOptions.AEEEventBody.id"
                         label="id" />
              </div>
              <div class="col-6">
                <div class="outsideLabel">name</div>
                <q-input v-model="localOptions.AEEEventBody.name"
                         label="name" />
              </div>
              <div class="col-6">
                <div class="outsideLabel">creative</div>
                <q-input v-model="localOptions.AEEEventBody.creative"
                         label="creative" />
              </div>
              <div class="col-6">
                <div class="outsideLabel">position</div>
                <q-input v-model="localOptions.AEEEventBody.position"
                         label="position" />
              </div>
            </div>
            <div class="cehckBox">
              <q-checkbox v-model="localOptions.hasAction"
                          label="hasAction"
                          right-label />
            </div>
            <div v-if="localOptions.hasAction"
                 class="action-container">
              <action-options v-model:action="localOptions.action.name"
                              v-model:scroll-to="localOptions.action.scrollTo"
                              v-model:link="localOptions.action.route"
                              v-model:event-name="localOptions.action.eventName"
                              v-model:event-args="localOptions.action.eventArgs" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import ImageUploadInput from 'src/components/Utils/ImageUploadInput.vue'
import ActionOptions from 'src/components/WidgetComponents/ActionOptions/ActionOptions.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    ActionOptions,
    OptionPanelTabs,
    ImageUploadInput
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      size: 'xs',
      sizeOptions: ['xs', 'sm', 'md', 'lg', 'xl'],
      actionTypes: ['event', 'scroll', 'link'],
      toggleSize: 'all',
      dialog: false,
      defaultOptions: {
        imageSource: null,
        ratio: null,
        hasAction: false,
        useAEEEvent: false,
        AEEEventBody: {
          id: '-',
          name: '-',
          creative: null,
          position: null
        },
        action: {
          name: null,
          route: null,
          scrollTo: null,
          eventName: null,
          eventArgs: null
        },
        xs: {
          height: null,
          width: null,
          src: null
        },
        sm: {
          height: null,
          width: null,
          src: null
        },
        md: {
          height: null,
          width: null,
          src: null
        },
        lg: {
          height: null,
          width: null,
          src: null
        },
        xl: {
          height: null,
          width: null,
          src: null
        },
        responsiveSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          }
        },
        borderStyle: {},
        boxShadows: [],
        cssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    }
  },
  watch: {
    localOptions: {
      handler (newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    updateBackground (image, size) {
      if (size === 'all') {
        this.localOptions.imageSource = image
      } else {
        this.localOptions[size].src = image
      }
    }
  }
})
</script>
