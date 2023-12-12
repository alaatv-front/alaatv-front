<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { defineComponent } from 'vue'
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'show',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'MothersDayPostCardBase',
                        options: {}
                      }
                    ],
                    options: {
                      colNumber: 'col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10',
                      style: {},
                      boxShadows: [],
                      backgrounds: {
                        xs: {
                          size: null,
                          color: null,
                          image: null,
                          repeat: null,
                          position: null,
                          attachment: null
                        },
                        sm: {
                          size: null,
                          color: null,
                          image: null,
                          repeat: null,
                          position: null,
                          attachment: null
                        },
                        md: {
                          size: null,
                          color: null,
                          image: null,
                          repeat: null,
                          position: null,
                          attachment: null
                        },
                        lg: {
                          size: null,
                          color: null,
                          image: null,
                          repeat: null,
                          position: null,
                          attachment: null
                        },
                        xl: {
                          size: null,
                          color: null,
                          image: null,
                          repeat: null,
                          position: null,
                          attachment: null
                        }
                      },
                      responsiveOrder: {
                        xs: null,
                        sm: null,
                        md: null,
                        lg: null,
                        xl: null
                      },
                      borderStyle: {
                        borderCssString: '',
                        borderRadiusCssString: ''
                      },
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
                          rotate: null,
                          scaleX: null,
                          scaleY: null,
                          skewX: null,
                          skewY: null,
                          translateX: null,
                          translateY: null
                        }
                      },
                      responsiveShow: {
                        xl: true,
                        lg: true,
                        md: true,
                        sm: true,
                        xs: true
                      },
                      className: ''
                    }
                  }
                ],
                options: {
                  className: '',
                  height: 'auto',
                  boxed: true,
                  boxedWidth: 1362,
                  paddingOfBoxedInFullWidth: '30px',
                  responsiveBoxedWidth: true,
                  responsiveBoxedWidths: {
                    xs: {
                      width: '320px'
                    },
                    sm: {
                      width: '536px'
                    },
                    md: {
                      width: '960px'
                    },
                    lg: {
                      width: '1360px'
                    },
                    xl: {
                      width: '1360px'
                    }
                  },
                  gutterXSize: null,
                  gutterYSize: null,
                  absolute: 'none',
                  backgrounds: {
                    xs: {
                      size: null,
                      color: null,
                      image: null,
                      repeat: null,
                      position: null,
                      attachment: null
                    },
                    sm: {
                      size: null,
                      color: null,
                      image: null,
                      repeat: null,
                      position: null,
                      attachment: null
                    },
                    md: {
                      size: null,
                      color: null,
                      image: null,
                      repeat: null,
                      position: null,
                      attachment: null
                    },
                    lg: {
                      size: null,
                      color: null,
                      image: null,
                      repeat: null,
                      position: null,
                      attachment: null
                    },
                    xl: {
                      size: null,
                      color: null,
                      image: null,
                      repeat: null,
                      position: null,
                      attachment: null
                    }
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
                  boxShadows: [],
                  borderStyle: {
                    borderCssString: '',
                    borderRadiusCssString: ''
                  },
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
                      rotate: null,
                      scaleX: null,
                      scaleY: null,
                      skewX: null,
                      skewY: null,
                      translateX: null,
                      translateY: null
                    }
                  },
                  responsiveShow: {
                    xl: true,
                    lg: true,
                    md: true,
                    sm: true,
                    xs: true
                  },
                  alignment: {
                    justifyContent: {
                      global: 'justify-center',
                      xl: null,
                      lg: null,
                      md: null,
                      sm: null,
                      xs: null
                    },
                    alignItems: {
                      global: 'items-center',
                      xl: null,
                      lg: null,
                      md: null,
                      sm: null,
                      xs: null
                    },
                    alignContent: {
                      global: null,
                      xl: null,
                      lg: null,
                      md: null,
                      sm: null,
                      xs: null
                    }
                  },
                  style: {
                    width: null,
                    maxWidth: null
                  }
                }
              }
            ]
          },
          options: {
            fullHeight: true,
            className: '',
            backgrounds: {
              xs: {
                size: null,
                color: null,
                image: null,
                repeat: null,
                position: null,
                attachment: null
              },
              sm: {
                size: null,
                color: null,
                image: null,
                repeat: null,
                position: null,
                attachment: null
              },
              md: {
                size: null,
                color: null,
                image: null,
                repeat: null,
                position: null,
                attachment: null
              },
              lg: {
                size: null,
                color: null,
                image: null,
                repeat: null,
                position: null,
                attachment: null
              },
              xl: {
                size: null,
                color: null,
                image: null,
                repeat: null,
                position: null,
                attachment: null
              }
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
            style: {
              minHeight: '100vh'
            },
            boxShadows: [],
            borderStyle: {
              borderCssString: '',
              borderRadiusCssString: ''
            },
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
                rotate: null,
                scaleX: null,
                scaleY: null,
                skewX: null,
                skewY: null,
                translateX: null,
                translateY: null
              }
            },
            responsiveShow: {
              xl: true,
              lg: true,
              md: true,
              sm: true,
              xs: true
            },
            verticalAlign: 'center'
          }
        }
      ]
    }
  },
  mounted () {
    this.currenSections = this.sections
    this.pageBuilderLoading = false
  }
})
</script>
