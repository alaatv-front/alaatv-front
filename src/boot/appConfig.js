import { boot } from 'quasar/wrappers'

const APP_ENV = process.env.APP_ENV
const VITE_APP_DOMAIN = process.env.VITE_APP_DOMAIN || 'alaatv.com'

export default boot(({ app }) => {
  // app.config.unwrapInjectedRef = true
  app.config.globalProperties.$env = {
    APP_ENV,
    VITE_APP_DOMAIN
  }
})
