import { Notify } from 'quasar'
import { APIGateway } from 'src/api/APIGateway'

const actions = {
  editPageWidget: (context, data) => {
    return new Promise((resolve, reject) => {
      APIGateway.pageSetting.update({ key: data.key, value: JSON.stringify(data.sections) })
        .then(pageData => {
          const parsedData = JSON.parse(pageData.value)
          context.commit('updateCurrentSections', parsedData)
          context.commit('updateInitialSections', parsedData)
          Notify.create({
            message: 'تغییرات با موفقیت ذخیره شد',
            type: 'positive'
          })
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getPageWidget: (context, value) => {
    return new Promise((resolve, reject) => {
      APIGateway.pageSetting.get(value)
        .then(pageData => {
          const parsedData = JSON.parse(pageData.value)
          context.commit('updateCurrentSections', parsedData)
          context.commit('updateInitialSections', parsedData)
          resolve(pageData)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default actions
