import { APIGateway } from 'src/api/APIGateway.js'

const actions = {
  showConfirmDialog: (context, newInfo) => {
    context.commit('AppLayout/showConfirmDialog', newInfo)
  },
  getSet: (context, productId) => {
    context.commit('toggleSetListLoading')
    APIGateway.product.getSets(productId)
      .then((setList) => {
        const normalizedSets = setList.list.map(set => {
          if (set.short_title !== null) {
            const splitted = set.short_title.split('-')
            const productName = splitted[0] ? splitted[0].trim() : 'متفرقه'
            const topicName = splitted[1] ? splitted[1].trim() : 'متفرقه'
            const setName = splitted[2] ? splitted[2].trim() : 'متفرقه'
            set.short_title = productName + '-' + topicName + '-' + setName

            return set
          } else {
            set.short_title = 'عنوان ندارد'
            return set
          }
        })
        const topicList = normalizedSets.map(set => {
          const splitted = set.short_title.split('-')
          const topicName = splitted[1] ? splitted[1] : 'متفرقه'
          return topicName
        })
          .filter((topic, topicIndex, topics) => topics.findIndex(topicItem => topicItem === topic) === topicIndex)
        context.commit('updateSetList', normalizedSets)
        context.commit('updateTopicList', topicList)
        context.commit('updateSelectedTopic', topicList[0])
        context.commit('toggleSetListLoading')
      }).catch(() => {
        context.commit('toggleSetListLoading')
      })
  },
  setSelectedTopic: (context, topic) => {
    context.commit('updateSelectedTopic', topic)
  },
  updateSet: (context, setId) => {
    context.commit('toggleSetLoading')
    APIGateway.set.getContents(setId)
      .then(contentList => {
        context.commit('updateSet', { contentList, setId })
        context.commit('toggleSetLoading')
      })
      .catch(() => {
        context.commit('toggleSetLoading')
      })
  },
  setSelectedProduct: (context, product) => {
    context.commit('setSelectedProduct', product)
  },
  getSelectedProduct: (context, productId) => {
    APIGateway.product.show(productId).then(res => {
      context.commit('setSelectedProduct', res)
    }).catch(() => { })
  },
  getSelectedContent: (context, contentId) => {
    APIGateway.content.show(contentId).then(res => {
      context.commit('setSelectedContent', res)
    }).catch(() => { })
  }
}

export default actions
