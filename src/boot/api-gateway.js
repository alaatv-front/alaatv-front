import { boot } from 'quasar/wrappers'
// eslint-disable-next-line
import { API_Gateway } from 'src/api/APIGateway'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  // eslint-disable-next-line
  app.config.globalProperties.$api_gateway = API_Gateway
  // eslint-disable-next-line
  app.$api_gateway = API_Gateway
  // eslint-disable-next-line
  router.$api_gateway = API_Gateway
  // eslint-disable-next-line
  store.$api_gateway = API_Gateway
})
