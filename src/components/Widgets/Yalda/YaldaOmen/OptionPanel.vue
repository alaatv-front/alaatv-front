<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-tabs v-model="tab"
              class="text-teal">
        <q-tab label="بخش فال"
               name="omen" />
        <q-tab name="dialog"
               label="دیالوگ" />
      </q-tabs>
      <q-tab-panels v-model="tab"
                    animated>
        <q-tab-panel name="omen">
          <q-list separator>
            <q-expansion-item expand-separator
                              icon="ph:image"
                              label="عکس"
                              caption="Yalda Omen image">
              <q-input v-model="localOptions.omen.image"
                       type="text"
                       label="Image" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="ph:book-open-text"
                              label="عنوان"
                              caption="Yalda Omen title">
              <text-widget-option-panel v-model:options="localOptions.omen.title" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="ph:text-align-justify"
                              label="توضیحات"
                              caption="Yalda Omen description">
              <text-widget-option-panel v-model:options="localOptions.omen.description" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="ph:number-circle-one"
                              label="مصراع اول شعر"
                              caption="poem first verse">
              <text-widget-option-panel v-model:options="localOptions.omen.poem.firstVerse" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="ph:number-circle-two"
                              label="مصراع دوم شعر"
                              caption="poem second verse">
              <text-widget-option-panel v-model:options="localOptions.omen.poem.secondVerse" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="ph:balloon"
                              label="bodymovin"
                              caption="bodymovin">
              <body-movein-option-panel v-model:options="localOptions.bodymovin" />
            </q-expansion-item>
            <q-expansion-item expand-separator
                              icon="ph:gear-six"
                              label="Action"
                              caption="ScrollTo">
              <q-input v-model="localOptions.scrollTo"
                       type="text"
                       label="ScrollTo" />
            </q-expansion-item>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="dialog">
          <yalda-gift-dialog-content-option-panel v-model:options="localOptions.yaldaGiftDialogContent" />
        </q-tab-panel>
      </q-tab-panels>

    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import TextWidgetOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import BodyMoveinOptionPanel from 'src/components/Widgets/Bodymovin/OptionPanel.vue'
import YaldaGiftDialogContentOptionPanel from 'src/components/Widgets/Yalda/YaldaGiftDialogContent/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    TextWidgetOptionPanel,
    BodyMoveinOptionPanel,
    YaldaGiftDialogContentOptionPanel
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      tab: 'omen',
      defaultOptions: {
        omen: {
          title: {
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
          description: {
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
          image: '',
          poem: {
            firstVerse: {
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
            secondVerse: {
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
        },
        bodymovin: {
          loop: true,
          animate: 'autoPlay',
          autoplay: true,
          xs: {
            directory: '',
            directory2: '',
            style: {
              width: null,
              height: null
            }
          },
          sm: {
            directory: '',
            directory2: '',
            style: {
              width: null,
              height: null
            }
          },
          md: {
            directory: '',
            directory2: '',
            style: {
              width: null,
              height: null
            }
          },
          lg: {
            directory: '',
            directory2: '',
            style: {
              width: null,
              height: null
            }
          },
          xl: {
            directory: '',
            directory2: '',
            style: {
              width: null,
              height: null
            }
          },
          action: {
            hasAction: false,
            actionName: null,
            scrollTo: null,
            route: null,
            eventName: null,
            eventArgs: null
          }
        },
        yaldaGiftDialogContent: {
          poemAndOmenList: [],
          congratulationMessage: {
            text: 'yoop',
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
      }
    }
  }
})
</script>
