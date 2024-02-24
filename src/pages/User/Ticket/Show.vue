
<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ShowTicket',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  data () {
    return {
      pageConfig: [{
        data: {
          rows: [
            {
              cols: [
                {
                  widgets: [
                    { name: 'TicketShow', options: { isAdmin: false } }
                  ],
                  options: { colNumber: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12', style: {}, boxShadows: [], backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, responsiveOrder: { xs: null, sm: null, md: null, lg: null, xl: null }, borderStyle: { borderCssString: '', borderRadiusCssString: '' }, cssHoverEffects: { boxShadows: [], borderStyle: { borderCssString: '', borderRadiusCssString: '' }, transition: { time: 0 }, transform: { rotate: null, scaleX: null, scaleY: null, skewX: null, skewY: null, translateX: null, translateY: null } }, responsiveShow: { xl: true, lg: true, md: true, sm: true, xs: true }, className: '' }
                }],
              options: { className: '', height: 'auto', boxed: true, boxedWidth: '1024', paddingOfBoxedInFullWidth: '30px', responsiveBoxedWidth: true, responsiveBoxedWidths: { xs: { width: '100%' }, sm: { width: '100%' }, md: { width: '701px' }, lg: { width: '1032px' }, xl: { width: '1224px' } }, gutterXSize: null, gutterYSize: null, absolute: 'none', backgrounds: { xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }, xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null } }, responsiveSpacing: { xs: { marginTop: null, marginLeft: null, marginRight: null, marginBottom: null, paddingTop: null, paddingLeft: null, paddingRight: null, paddingBottom: null }, sm: { marginTop: null, marginLeft: null, marginRight: null, marginBottom: null, paddingTop: null, paddingLeft: null, paddingRight: null, paddingBottom: null }, md: { marginTop: null, marginLeft: null, marginRight: null, marginBottom: null, paddingTop: null, paddingLeft: null, paddingRight: null, paddingBottom: null }, lg: { marginTop: null, marginLeft: null, marginRight: null, marginBottom: null, paddingTop: null, paddingLeft: null, paddingRight: null, paddingBottom: null }, xl: { marginTop: null, marginLeft: null, marginRight: null, marginBottom: null, paddingTop: null, paddingLeft: null, paddingRight: null, paddingBottom: null } }, boxShadows: [], borderStyle: { borderCssString: '', borderRadiusCssString: '' }, cssHoverEffects: { boxShadows: [], borderStyle: { borderCssString: '', borderRadiusCssString: '' }, transition: { time: 0 }, transform: { rotate: null, scaleX: null, scaleY: null, skewX: null, skewY: null, translateX: null, translateY: null } }, responsiveShow: { xl: true, lg: true, md: true, sm: true, xs: true }, alignment: { justifyContent: { global: null, xl: null, lg: null, md: null, sm: null, xs: null }, alignItems: { global: null, xl: null, lg: null, md: null, sm: null, xs: null }, alignContent: { global: null, xl: null, lg: null, md: null, sm: null, xs: null } }, style: { maxWidth: null, width: null, backgroundImage: null, paddingTop: '20px', paddingBottom: '0px' } }
            }
          ]
        }
      }]
    }
  }
}
</script>
