import { APIGateway } from 'src/api/APIGateway.js'
import AppIndexedDB from 'src/assets/js/IndexedDB/IndexedDB.js'

class ContentManager {
  static get lastSentTime () {
    return localStorage.getItem('lastContentsWatchedSecondsSentTime')
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
        if (!savedContent || savedContent.length === 0) {
          resolve()
          return
        }
        const isSavedBefore = savedContent.length > 0 && savedContent[0].watched_seconds >= content.watched_seconds
        if (isSavedBefore) {
          reject(savedContent[0].watched_seconds)
        } else {
          resolve(savedContent[0].watched_seconds)
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
    AppIndexedDB.searchInObjectStore('contents', 'sent_index', 0, false, (unsentContents, objectStore) => {
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
      try {
        // Update the indexedDB record with sent_index set to true
        await AppIndexedDB.updateRecord({ ...content, sent: 1 }, objectStore)
      } catch (error) {
        // Handle the error if updating the record fails
        console.error('Failed to update record:', error)
      }
    }
  }

  static handleSendError (error) {
    console.error(error)
  }
}

export default ContentManager
