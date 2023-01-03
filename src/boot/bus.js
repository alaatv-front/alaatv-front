import { boot } from 'quasar/wrappers'
import { EventBus } from 'quasar'

export default boot(({ app }) => {
  const bus = new EventBus()
  app.config.globalProperties.$bus = bus
})
