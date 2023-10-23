import { boot } from 'quasar/wrappers'

const evnVariables = process.env
export default boot(function ({ app }) {
  app.config.globalProperties.$env = {
    APP_ENV: evnVariables.APP_ENV,
    APP_DOMAIN: evnVariables.APP_DOMAIN
  }
})
