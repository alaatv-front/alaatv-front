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

      if (!db.objectStoreNames.contains('contents')) {
        db.createObjectStore('contents', { keyPath: 'id' })// create unique index on keyPath === 'id'
          .createIndex('id', 'id', { unique: true })
          .createIndex('set_id', 'set_id', { unique: false })
      }
      if (!db.objectStoreNames.contains('sets')) {
        db.createObjectStore('sets', { keyPath: 'id' })// create unique index on keyPath === 'id'
          .createIndex('id', 'id', { unique: true })
      }
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

  function getTransaction (db, objectStoreName, readonly) {
    const transaction = db.transaction(objectStoreName, (typeof readonly !== 'undefined' && readonly === true) ? 'readonly' : 'readwrite')// add success event handleer for transaction
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
      for (let i = 0; (typeof objectStoreList[i] !== 'undefined'); i++) {
        const objectStoreItem = objectStoreList[i]
        const objectStore = getObjectStore(db, objectStoreItem.objectStoreName)
        objectStoreItem.objectStoreData.forEach(function (data) {
          // var db_op_req = contentsStore.add(content); // IDBRequest
          // const db_op_req = objectStore.put(data) // IDBRequest
          objectStore.put(data) // IDBRequest
        })
      }
    })
  }

  function searchInObjectStore (objectStoreName, index, indexValue, onsuccess) {
    query(function (db) {
      const objectStore = getObjectStore(db, objectStoreName, true)
      const objectStoreIndex = objectStore.index(index)
      const indexGet = objectStoreIndex.getAll(indexValue)
      indexGet.onsuccess = function (e) {
        const match = e.target.result
        if (match) {
          onsuccess(match)
        }
      }
    })
  }

  return {
    putObjectStores,
    searchInObjectStore
  }
}())

export default AppIndexedDB
