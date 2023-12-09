<template>
  <div class="yalda-omen-container"
       :style="localOptions.style"
       :class="localOptions.className">
    <div class="omen-header">
      <div class="omen-header__image">
        <lazy-img :src="localOptions.omen.image" />
      </div>
      <div class="omen-header__title">
        <text-widget :options="localOptions.omen.title" />
      </div>
      <div class="omen-header__description">
        <text-widget :options="localOptions.omen.description" />
      </div>
      <div class="omen-poem">
        <div class="omen-poem__first verse">
          <text-widget :options="localOptions.omen.poem.firstVerse" />
        </div>
        <div class="omen-poem__separator">
          <div class="omen-poem__separator--dot">
            <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-12/vector1701681190.png" />
          </div>
          <div class="omen-poem__separator--dot">
            <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-12/vector1701681190.png" />
          </div>
          <div class="omen-poem__separator--dot">
            <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-12/vector1701681190.png" />
          </div>
        </div>
        <div class="omen-poem__second verse">
          <text-widget :options="localOptions.omen.poem.secondVerse" />
        </div>
      </div>
    </div>
    <div class="omen-body">
      <div v-for="item in 12"
           :key="item"
           class="pomegranate-wrapper">
        <bodymovin ref="bodymovin"
                   :options="localOptions.bodymovin" />
      </div>
    </div>
    <q-dialog v-model="dialog">
      <yalda-gift-dialog-content :options="localOptions.yaldaGiftDialogContent"
                                 @action-button-click="onActionButtonClick" />
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import TextWidget from 'components/Widgets/TextWidget/TextWidget.vue'
import LazyImg from 'src/components/lazyImg.vue'
import Bodymovin from 'src/components/Widgets/Bodymovin/Bodymovin.vue'
import YaldaGiftDialogContent from 'src/components/Widgets/Yalda/YaldaGiftDialogContent/YaldaGiftDialogContent.vue'

export default defineComponent({
  name: 'YaldaOmen',
  components: {
    TextWidget,
    LazyImg,
    Bodymovin,
    YaldaGiftDialogContent
  },
  mixins: [mixinWidget, mixinAuth],
  data () {
    return {
      dialog: false,
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
            text: 'yowg',
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
        scrollTo: ''
      }
    }
  },
  computed: {
    eventName () {
      return this.$refs.bodymovin[0].defaultOptions.action.eventName
    }
  },
  mounted () {
    this.$bus.on(this.eventName, () => {
      this.toggleDialog()
    })
    this.$bus.on('onLoggedIn', () => {
      this.toggleDialog()
    })
  },
  methods: {
    showLoginDialog () {
      this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params, query: this.$route.query })
      this.$store.commit('AppLayout/updateLoginDialog', true)
    },
    toggleDialog () {
      if (!this.isUserLogin) {
        this.showLoginDialog()
        return
      }
      this.dialog = !this.dialog
    },
    scrollToElement () {
      const el = document.getElementsByClassName(this.localOptions.scrollTo)[0]
      const headerOffset = 65
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    onActionButtonClick () {
      this.toggleDialog()
      this.$nextTick(() => {
        this.scrollToElement()
      })
    }
  }
})
</script>

<style lang="scss" scoped>

$page-size-lg: map-get($sizes, "lg");
$page-size-md: map-get($sizes, "md");
$page-size-sm: map-get($sizes, "sm");
.yalda-omen-container {
  display: flex;
  padding: 40px 165px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  border-radius: 40px;
  background: #FFF;
  box-shadow: 0px 4px 150px 0px rgba(120, 32, 31, 0.25);

  @media screen and (width < #{$page-size-lg}) {
    padding: 32px 72px;
  }
  @media screen and (width < #{$page-size-md}) {
    padding: 24px;
  }
  @media screen and (width < #{$page-size-sm}) {
    padding: 20px;
  }

  .omen-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__image {
      width: 32px;
      height: 32px;
    }

    &__description {
      margin-top: 12px;
    }
    .omen-poem {
      margin-top: 20px;
      display: flex;
      padding: 8px 20px;
      justify-content: center;
      align-items: center;
      gap: 16px;
      border-radius: 100px;
      background: #E4F7F2;

      @media screen and (width < #{$page-size-md}) {
        border-radius: 20px;
        flex-direction: column;
        align-self: stretch;
        gap: 12px;
      }

      &__separator {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 5.333px;

        &--dot {
          width: 8px;
          height: 8px;
        }
      }
    }
  }

  .omen-body {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    gap: 32px 48px;
    flex-wrap: wrap;
    align-self: stretch;

    @media screen and (width < #{$page-size-lg}) {
      gap: 24px 40px;
      padding: 0 80px;
    }
    @media screen and (width < #{$page-size-md}) {
      gap: 12px 20px;
      padding: 0;
    }
    @media screen and (width < #{$page-size-sm}) {
      row-gap: 8px;
      column-gap: 0;
      padding: 0;
    }

    .pomegranate-wrapper {
      display: flex;
      padding: 12px 16px 32px 16px;
      width: 110px;
      height: 148px;
      justify-content: center;
      align-items: center;

      @media screen and (width < #{$page-size-md}) {
        padding: 0;
        width: 86px;
        height: 116px;
      }
    }
  }

}
</style>
