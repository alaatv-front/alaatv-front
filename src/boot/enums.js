import { boot } from 'quasar/wrappers'
import Enums from 'src/assets/js/enums/Enums.js'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  app.config.globalProperties.$enums = Enums
  app.$enums = Enums
  router.$enums = Enums
  store.$enums = Enums
})
