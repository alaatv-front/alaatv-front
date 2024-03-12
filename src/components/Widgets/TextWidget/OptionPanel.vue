<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-show="true"
                     :show-responsive-spacing="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-mt-sm">
          <div class="col-md-12">
            <editor v-model:value="localOptions.text" />
          </div>
          <div class="col-12 q-mt-md">
            <editor-options v-model:options="localOptions" />
          </div>
        </div>
        <div class="row q-col-gutter-sm q-mt-sm">
          <div class="col-12 col-md-3">
            <q-checkbox v-model="localOptions.hasTheme"
                        label="hasTheme" />
          </div>

        </div>
        <div v-if="localOptions.hasTheme && localOptions.activeTheme"
             class="row q-col-gutter-sm q-mt-sm">
          <div class="col-12 col-md-3">
            <q-select v-model="localOptions.activeTheme"
                      :options="themes"
                      label="themes"
                      filled />
          </div>
          <div v-for="(value, key, index) in localOptions.themes[localOptions.activeTheme]"
               :key="index"
               class="col-12 col-md-3">
            <template v-if="key === 'image'">
              نمونه تم
              <lazy-img :src="localOptions.themes[localOptions.activeTheme].image" />
            </template>
            <q-input v-else
                     v-model="localOptions.themes[localOptions.activeTheme][key]"
                     type="text"
                     :label="key" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import Editor from 'components/Utils/Editor.vue'
import EditorOptions from 'components/EditorOptions.vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import LazyImg from 'src/components/lazyImg.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { Editor, OptionPanelTabs, EditorOptions, LazyImg },
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
      fontStyle: ['inherit', 'normal', 'italic'],
      foreColor: '#000000',
      token: null,
      responsiveOpts: ['xs', 'sm', 'md', 'lg', 'xl'],
      responsive: 'xs',
      defaultOptions: {
        text: null,
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        letterSpacing: null,
        xs: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        sm: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        md: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        lg: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        xl: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
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
        hasTheme: null,
        activeTheme: 'default',
        themes: {
          theme1: {
            image: 'https://nodes.alaatv.com/upload/alaaPages/2024-02/Screenshotfrom2024-02-2614-30-001708946382.png',
            borderColor: null,
            borderSize: null,
            borderWidth: null,
            borderHeight: null,
            top: null,
            left: null,
            bottom: null,
            right: null
          }
        }
      },
      themes: ['default', 'theme1']
    }
  },
  mounted () {
    const windowWidth = window.innerWidth
    if (windowWidth > 1920) {
      this.responsive = 'xl'
    } else if (windowWidth > 1440 < 1920) {
      this.responsive = 'lg'
    } else if (windowWidth > 1024 < 1440) {
      this.responsive = 'md'
    } else if (windowWidth > 600 < 1024) {
      this.responsive = 'sm'
    } else if (windowWidth < 600) {
      this.responsive = 'xs'
    }
  },
  methods: {
    color (cmd, name) {
      const edit = this.$refs.editor
      this.$refs.token.hide()
      edit.caret.restore()
      edit.runCmd(cmd, name)
      edit.focus()
    }
  }
})
</script>

<style lang="scss" scoped>
.theme-pic {
  width: 100px;
  height: 50px;
}
</style>
