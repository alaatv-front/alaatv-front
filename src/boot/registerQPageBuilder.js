import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-q-page-builder'
import QPageBuilder from 'quasar-ui-q-page-builder/src/components/QPageBuilder.vue'
import widgetList from '../components/Widgets/widget.json'
export const widgetExpanded = VuePlugin.extractWidgets(widgetList)

export default boot(({ app }) => {
  // app.use(VuePlugin)
  app.config.globalProperties.$q.$QPageBuilderWidgetList = widgetExpanded
  // app.component('q-page-builder', VuePlugin.QPageBuilder)
  app.component('q-page-builder', QPageBuilder)
})
