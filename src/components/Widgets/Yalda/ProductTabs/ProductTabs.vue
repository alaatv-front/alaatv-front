<template>
  <div class="tabs-container row text-center justify-between"
       :class="localOptions.className"
       :style="localOptions.style">
    <div v-for="tab in localOptions.tabs"
         :key="tab"
         class="tab-content cursor-pointer"
         @click="scrollToElement(tab.scrollTo)">
      <div class="col-12">
        <text-widget class="text"
                     :options="tab.title" />
      </div>
      <div class="col-12">
        <text-widget class="text"
                     :options="tab.description" />
      </div>
    </div>
  </div>
</template>

<script>
import TextWidget from 'components/Widgets/TextWidget/TextWidget.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'ProductTabs',
  components: {
    TextWidget
  },
  mixins: [mixinWidget],
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
      defaultOptions: {
        tabs: [
          {
            title: {
              text: 'راه ابریشم',
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
              text: 'دوازدهم',
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
          {
            title: {
              text: 'چتر نجات',
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
              text: 'فارغ التحصیلان',
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
          {
            title: {
              text: 'شلیک نهایی',
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
              text: 'امتحانات نهایی',
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
          {
            title: {
              text: 'سه آ',
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
              text: 'تمامی پایه ها',
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
          {
            title: {
              text: 'هفتانه',
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
              text: 'یازدهم (به زودی)',
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
        ],
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
        }
      }
    }
  },
  methods: {
    scrollToElement (className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "quasar-ui-q-page-builder/src/components/Component";
$responsiveSpacing: (
  xs: (
    marginTop: v-bind('localOptions.responsiveSpacing.xs.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.xs.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.xs.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.xs.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.xs.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.xs.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.xs.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.xs.paddingBottom'),
  ),
  sm: (
    marginTop: v-bind('localOptions.responsiveSpacing.sm.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.sm.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.sm.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.sm.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.sm.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.sm.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.sm.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.sm.paddingBottom'),
  ),
  md: (
    marginTop: v-bind('localOptions.responsiveSpacing.md.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.md.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.md.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.md.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.md.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.md.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.md.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.md.paddingBottom'),
  ),
  lg: (
    marginTop: v-bind('localOptions.responsiveSpacing.lg.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.lg.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.lg.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.lg.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.lg.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.lg.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.lg.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.lg.paddingBottom'),
  ),
  xl: (
    marginTop: v-bind('localOptions.responsiveSpacing.xl.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.xl.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.xl.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.xl.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.xl.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.xl.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.xl.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.xl.paddingBottom'),
  )
);

.tabs-container {
  @include media-query-spacings($responsiveSpacing, $sizes);
  .tab-content {
    width: 190px;
    padding: 20px;
    border: 1.5px solid #AFAFAF;
    border-radius: 16px;
    &:hover {
      border: 1.5px solid #F4726F;
      .text {
        :deep(font) {
          color: #F4726F;
        }
      }
    }
    @media screen and (width < 1440px){
      width: 147.2px;
    }
    @media screen and (width < 1024px){
      width: 91.2px;
      padding: 8px;
    }
    @media screen and (width < 600px){
      width: 132px;
      padding: 8px;
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
        width: 280px
      }
    }
  }
}
</style>
