import models from './models/models.js'

const AppIndexedDB = (function () {
  const DBName = 'AlaaTV_DB',
    debugMode = false

  function query (useDB) {
    const openRequest = indexedDB.open(DBName, 1)
    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result

      /*
      // https://javascript.info/indexeddb
        IndexedDB has a built-in mechanism of “schema versioning”, absent in server-side databases.
        Unlike server-side databases, IndexedDB is client-side, the data is stored in the browser, so we, developers, don’t have full-time access to it. So, when we have published a new version of our app, and the user visits our webpage, we may need to update the database.
        If the local database version is less than specified in open, then a special event upgradeneeded is triggered, and we can compare versions and upgrade data structures as needed.
        The upgradeneeded event also triggers when the database doesn’t yet exist (technically, its version is 0), so we can perform the initialization.
        Let’s say we published the first version of our app.
        Then we can open the database with version 1 and perform the initialization in an upgradeneeded handler like this:
      */

      // // the existing database version is less than 2 (or it doesn't exist)
      // switch (db.version) { // existing db version
      //     case 0:
      //     // version 0 means that the client had no database
      //     // perform initialization
      //     case 1:
      //         // client had version 1
      //         // update

      Object.keys(models).forEach(modelKey => {
        if (!db.objectStoreNames.contains(modelKey)) {
          models[modelKey](db)
        }
      })
    }
    openRequest.onsuccess = function (event) {
      // get database from event
      const db = event.target.result// create transaction from database
      useDB(db)
    }
    openRequest.onerror = function () {
      console.error('Error', openRequest.error)
    }
  }

  function getTransaction (db, objectStoreName, readonly = false) {
    const transaction = db.transaction(objectStoreName, readonly ? 'readonly' : 'readwrite')// add success event handleer for transaction
    // you should also add onerror, onabort event handlers
    transaction.onerror = function (event) {
      if (transaction.error === null) {
        return
      }

      // ConstraintError occurs when an object with the same id already exists
      if (transaction.error.name === 'ConstraintError') {
        if (debugMode) {
          // console.warn('item with such id already exists') // handle the error
        }
      } else {
        if (debugMode) {
          // console.warn("unexpected error, can't handle it") // handle the error
        }
      }
    }
    transaction.onabort = function () {
      if (transaction.error.name === 'ConstraintError') {
        if (debugMode) {
          // console.warn('item with such id already exists') // handle the error
        }
      }
    }
    transaction.onsuccess = function (event) {
      if (debugMode) {
        // console.warn('[Transaction] ALL DONE!')
      }
    }

    return transaction
  }

  function getObjectStore (db, objectStoreName, readonly) {
    const transaction = getTransaction(db, objectStoreName, readonly)
    return transaction.objectStore(objectStoreName)
  }

  function putObjectStores (objectStoreList) {
    query(function (db) {
      objectStoreList.forEach(objectStoreItem => {
        const objectStore = getObjectStore(db, objectStoreItem.objectStoreName)
        objectStoreItem.objectStoreData.forEach((data) => {
          // var db_op_req = contentsStore.add(content); // IDBRequest
          // const db_op_req = objectStore.put(data) // IDBRequest
          objectStore.put(data) // IDBRequest
        })
      })
    })
  }

  function searchInObjectStore (objectStoreName, index, indexValue, readonly, onsuccess) {
    query(function (db) {
      const objectStore = getObjectStore(db, objectStoreName, readonly)
      const objectStoreIndex = objectStore.index(index)
      const request = objectStoreIndex.getAll(indexValue)
      request.onsuccess = function () {
        const result = request.result
        if (result) {
          onsuccess(result, objectStore)
        }
      }

      request.onerror = function (e) {
        // Handle any errors here
        console.error('Error accessing indexedDB', e.target.error)
      }
    })
  }

  function getItemInObjectStore (objectStoreName, index, indexValue, readonly, onsuccess) {
    query(function (db) {
      const objectStore = getObjectStore(db, objectStoreName, readonly)
      const objectStoreIndex = objectStore.index(index)
      const request = objectStoreIndex.get(indexValue)
      request.onsuccess = function () {
        const result = request.result
        if (result) {
          onsuccess(result, objectStore)
        }
      }

      request.onerror = function (e) {
        // Handle any errors here
        console.error('Error accessing indexedDB', e.target.error)
      }
    })
  }

  async function updateRecord (data, objectStore) {
    return new Promise((resolve, reject) => {
      const request = objectStore.put(data)
      request.onerror = function (event) {
        reject(event.target.error)
      }

      request.onsuccess = function () {
        resolve()
      }
    })
  }

  return {
    updateRecord,
    putObjectStores,
    searchInObjectStore,
    getItemInObjectStore
  }
}())

export default AppIndexedDB
