<template>
  <div class="banner-container row items-center">
    <div class="col-md-4 col-xs-12">
      <div class="row items-center">
        <div class="text-1">
          <text-widget :options="localOptions.text1" />
        </div>
        <div class="text-2">
          <text-widget :options="localOptions.text2" />
        </div>
      </div>
    </div>
    <div class="col-md-7 col-xs-12 text-left">
      <div class="text-3">
        <text-widget :options="localOptions.text3" />
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
import textWidget from 'components/Widgets/TextWidget/TextWidget.vue'

export default {
  name: 'ProductBanner',
  components: {
    textWidget
  },
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        text1: {
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
        text2: {
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
        text3: {
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
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "quasar-ui-q-page-builder/src/components/Component.scss";
$backgrounds: (
  xs: (
    size: v-bind('localOptions.backgrounds.xs.size'),
    color: v-bind('localOptions.backgrounds.xs.color'),
    image: v-bind('localOptions.backgrounds.xs.image'),
    repeat: v-bind('localOptions.backgrounds.xs.repeat'),
    position: v-bind('localOptions.backgrounds.xs.position'),
    attachment: v-bind('localOptions.backgrounds.xs.attachment')
  ),
  sm: (
    size: v-bind('localOptions.backgrounds.sm.size'),
    color: v-bind('localOptions.backgrounds.sm.color'),
    image: v-bind('localOptions.backgrounds.sm.image'),
    repeat: v-bind('localOptions.backgrounds.sm.repeat'),
    position: v-bind('localOptions.backgrounds.sm.position'),
    attachment: v-bind('localOptions.backgrounds.sm.attachment')
  ),
  md: (
    size: v-bind('localOptions.backgrounds.md.size'),
    color: v-bind('localOptions.backgrounds.md.color'),
    image: v-bind('localOptions.backgrounds.md.image'),
    repeat: v-bind('localOptions.backgrounds.md.repeat'),
    position: v-bind('localOptions.backgrounds.md.position'),
    attachment: v-bind('localOptions.backgrounds.md.attachment')
  ),
  lg: (
    size: v-bind('localOptions.backgrounds.lg.size'),
    color: v-bind('localOptions.backgrounds.lg.color'),
    image: v-bind('localOptions.backgrounds.lg.image'),
    repeat: v-bind('localOptions.backgrounds.lg.repeat'),
    position: v-bind('localOptions.backgrounds.lg.position'),
    attachment: v-bind('localOptions.backgrounds.lg.attachment')
  ),
  xl: (
    size: v-bind('localOptions.backgrounds.xl.size'),
    color: v-bind('localOptions.backgrounds.xl.color'),
    image: v-bind('localOptions.backgrounds.xl.image'),
    repeat: v-bind('localOptions.backgrounds.xl.repeat'),
    position: v-bind('localOptions.backgrounds.xl.position'),
    attachment: v-bind('localOptions.backgrounds.xl.attachment')
  )
);
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

.banner-container {
  @include media-query-backgrounds($backgrounds, $sizes);
  @include media-query-spacings($responsiveSpacing, $sizes);
}
</style>
