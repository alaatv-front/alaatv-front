import { boot } from 'quasar/wrappers'

const APP_ENV = process.env.APP_ENV
const APP_DOMAIN = process.env.APP_DOMAIN

export default boot(({ app }) => {
  // app.config.unwrapInjectedRef = true
  app.config.globalProperties.$env = {
    APP_ENV,
    APP_DOMAIN
  }
})
