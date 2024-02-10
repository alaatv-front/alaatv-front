import { APIGateway } from 'src/api/APIGateway.js'
import AppIndexedDB from 'src/assets/js/IndexedDB/IndexedDB.js'

class ContentManager {
  static get lastSentTime () {
    return localStorage.getItem('lastContentsWatchedSecondsSentTime') === null ? 0 : parseInt(localStorage.getItem('lastContentsWatchedSecondsSentTime'))
  }

  static set lastSentTime (value) {
    localStorage.setItem('lastContentsWatchedSecondsSentTime', value)
  }

  static get sendThreshold () {
    const sendThreshold = localStorage.getItem('sendThreshold')
    return sendThreshold || 30000
  }

  static set sendThreshold (value) {
    localStorage.setItem('sendThreshold', value)
  }

  static checkContentSavedBefore (content) {
    return new Promise((resolve, reject) => {
      AppIndexedDB.searchInObjectStore('contents', 'id_index', content.id, true, (savedContent, objectStore) => {
        const isSavedBefore = savedContent.length > 0 && savedContent[0].watched_seconds >= content.watched_seconds
        if (isSavedBefore) {
          reject(savedContent)
        } else {
          resolve(savedContent)
        }
      })
    })
  }

  static storeContent (content) {
    AppIndexedDB.putObjectStores([{ objectStoreName: 'contents', objectStoreData: [content] }])
    ContentManager.checkAndSendContentToBackend()
  }

  static checkAndStoreContent (content) {
    ContentManager.checkContentSavedBefore(content)
      .then(() => {
        ContentManager.storeContent(content)
      })
      .catch(() => {})
  }

  static checkAndSendContentToBackend () {
    const currentTime = Date.now()
    if (currentTime - ContentManager.lastSentTime >= ContentManager.sendThreshold) {
      ContentManager.sendUnsentContentToBackend(currentTime)
    }
  }

  static sendUnsentContentToBackend (currentTime) {
    AppIndexedDB.searchInObjectStore('contents', 'sent_index', 0, false, (result, objectStore) => {
      const unsentContents = result
      if (unsentContents.length === 0) {
        return
      }
      APIGateway.content.watchedBulk({
        data: unsentContents.map(item => {
          return {
            watchable_id: item.id,
            seconds_watched: item.watched_seconds
          }
        })
      })
        .then((response) => {
          ContentManager.handleSendSuccess(response, unsentContents, objectStore)
          ContentManager.lastSentTime = currentTime // Update last sent time upon successful send
        })
        .catch((error) => {
          ContentManager.handleSendError(error)
        })
      ContentManager.lastSentTime = currentTime // Update last sent time upon successful send
    })
  }

  static async handleSendSuccess (response, unsentContents, objectStore) {
    for (const content of unsentContents) {
      AppIndexedDB.getItemInObjectStore('contents', 'id_index', content.id, false, (result, objectStore) => {
        const finedContent = result
        finedContent.sent = 1
        objectStore.put(finedContent)
      })
    }
  }

  static handleSendError (error) {
    console.error(error)
  }
}

export default ContentManager
