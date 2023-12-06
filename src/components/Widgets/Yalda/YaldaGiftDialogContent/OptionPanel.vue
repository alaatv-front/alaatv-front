<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-list separator>

        <q-expansion-item expand-separator
                          icon="ph:text-align-justify"
                          label="فال و شعر"
                          caption="Poem & Omen">
          <h6> بیت اول شعر</h6>
          <text-widget-option-panel v-model:options="poemOmenObject.poem1" />
          <h6> بیت دوم شعر</h6>
          <text-widget-option-panel v-model:options="poemOmenObject.poem2" />
          <h6>فال</h6>
          <text-widget-option-panel v-model:options="poemOmenObject.omen" />
          <q-btn color="primary"
                 label="ذخیره"
                 @click="savePoemOmen()" />
          <q-separator spaced
                       inset />
          <q-list v-if="localOptions.poemAndOmenList.length > 0"
                  bordered>
            <q-item v-for="(poemOmen, index) in localOptions.poemAndOmenList"
                    :key="index"
                    clickable>
              <q-item-section avatar>
                <text-widget :options="poemOmen.poem1" />
              </q-item-section>
              <q-item-section avatar>
                <text-widget :options="poemOmen.poem2" />
              </q-item-section>
              <q-item-section>
                <text-widget :options="poemOmen.omen" />
              </q-item-section>
              <q-item-section side>
                <q-btn color="negative"
                       flat
                       icon="ph:trash"
                       @click="deletePoemOmen(index)" />
                <q-btn color="negative"
                       flat
                       icon="ph:pen"
                       @click="editPoemOmen(index)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item expand-separator
                          icon="ph:book-open-text"
                          label="پیام تبریک"
                          caption="Congratulation Message">
          <text-widget-option-panel v-model:options="localOptions.congratulationMessage" />
        </q-expansion-item>
      </q-list>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import TextWidgetOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import TextWidget from 'src/components/Widgets/TextWidget/TextWidget.vue'

const initialPoemOmen = {
  poem1: {
    text: '',
    fontFamily: null,
    color: null,
    fontSize: null,
    fontWeight: null,
    fontStyle: null,
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
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
  poem2: {
    text: '',
    fontFamily: null,
    color: null,
    fontSize: null,
    fontWeight: null,
    fontStyle: null,
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
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
  omen: {
    text: '',
    fontFamily: null,
    color: null,
    fontSize: null,
    fontWeight: null,
    fontStyle: null,
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
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
  }
}
export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, TextWidgetOptionPanel, TextWidget },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        poemAndOmenList: [],
        congratulationMessage: {
          text: 'ygc11',
          fontFamily: null,
          color: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          responsiveShow: {
            xl: true,
            lg: true,
            md: true,
            sm: true,
            xs: true
          },
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
        }
      },
      poemOmenObject: initialPoemOmen,
      selectIndex: 0,
      editFlag: false
    }
  },
  mounted () {
  },
  methods: {
    savePoemOmen () {
      if (this.editFlag) {
        this.localOptions.poemAndOmenList.splice(this.selectIndex, 1, this.poemOmenObject)
        this.editFlag = false
      } else {
        this.localOptions.poemAndOmenList.push(JSON.parse(JSON.stringify(this.poemOmenObject)))
      }
      this.poemOmenObject = { ...initialPoemOmen }
    },
    editPoemOmen (index) {
      this.editFlag = true
      this.selectIndex = index
      this.poemOmenObject = this.localOptions.poemAndOmenList[index]
    },
    deletePoemOmen (index) {
      this.localOptions.poemAndOmenList.splice(index, 1)
    }
  }
})
</script>
