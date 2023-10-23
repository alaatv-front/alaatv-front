import { boot } from 'quasar/wrappers'

const evnVariables = process.env
export default boot(function ({ app }) {
  app.config.globalProperties.$evn = evnVariables
})
