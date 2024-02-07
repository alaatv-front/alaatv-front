import assists from 'src/assets/js/IndexedDB/models/assists.js'

const contents = (event) => {
  const db = event.target.result
  // Access the old and new version from the event object
  const oldVersion = event.oldVersion
  // const newVersion = event.newVersion
  const objectStoreName = 'contents'

  // Check if the object store exists, if not create it
  if (!db.objectStoreNames.contains(objectStoreName)) {
    const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id' })
    objectStore.createIndex('id_index', 'id', { unique: true })
    objectStore.createIndex('sent_index', 'sent', { unique: false })
    objectStore.createIndex('set_id_index', 'set_id', { unique: false })
    objectStore.createIndex('duration_index', 'duration', { unique: false })
    objectStore.createIndex('watched_seconds_index', 'watched_seconds', { unique: false })
    return objectStore
  }

  if (oldVersion >= 3) {
    return
  }

  // Accessing the existing object store
  const existingObjectStore = event.currentTarget.transaction.objectStore(objectStoreName)

  // Renaming an existing index
  assists.renameExistingIndex(existingObjectStore, 'contents_id_unqiue', 'id_index', 'id', 'id', { unique: true })
  assists.renameExistingIndex(existingObjectStore, 'contents_set_id_unqiue', 'set_id_index', 'set_id', 'set_id', { unique: false })

  // Rename existing property using the method
  assists.renameExistingProperty(existingObjectStore, 'lastSeenLength', 'watched_seconds')
  assists.renameExistingProperty(existingObjectStore, 'lastSeenTime', 'last_watched_date', function (oldValue) {
    return parseInt(oldValue)
  })
  assists.renameExistingProperty(existingObjectStore, 'lastWatchedDate', 'last_watched_date')
  assists.renameExistingProperty(existingObjectStore, 'length', 'duration')

  // // Removing a field from existing object store
  // existingObjectStore.deleteProperty('name')

  // // Deleting an existing index
  // if (existingObjectStore.indexNames.contains('id_index')) {
  //   existingObjectStore.deleteIndex('id_index')
  // }

  // Creating indexes
  if (!existingObjectStore.indexNames.contains('id_index')) {
    existingObjectStore.createIndex('id_index', 'id', { unique: true })
  }
  if (!existingObjectStore.indexNames.contains('sent_index')) {
    existingObjectStore.createIndex('sent_index', 'sent', { unique: false })
  }
  if (!existingObjectStore.indexNames.contains('set_id_index')) {
    existingObjectStore.createIndex('set_id_index', 'set_id', { unique: false })
  }
  if (!existingObjectStore.indexNames.contains('duration_index')) {
    existingObjectStore.createIndex('duration_index', 'duration', { unique: false })
  }
  if (!existingObjectStore.indexNames.contains('watched_seconds_index')) {
    existingObjectStore.createIndex('watched_seconds_index', 'watched_seconds', { unique: false })
  }
}
export default contents
