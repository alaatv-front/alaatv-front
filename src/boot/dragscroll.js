import { boot } from 'quasar/wrappers'
import { dragscrollNext } from 'vue-dragscroll'


export default boot(({ app }) => {
  app.directive('dragscroll', dragscrollNext)
})
