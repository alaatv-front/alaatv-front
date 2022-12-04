import { boot } from 'quasar/wrappers'
import { API_Gateway} from 'src/api/APIGateway'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store}) => {
  app.config.globalProperties.$api_gateway = API_Gateway
  app.$api_gateway = API_Gateway
  router.$api_gateway = API_Gateway
  store.$api_gateway = API_Gateway
})
