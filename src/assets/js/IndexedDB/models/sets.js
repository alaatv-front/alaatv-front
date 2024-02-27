import assists from 'src/assets/js/IndexedDB/models/assists.js'

const sets = (event) => {
  const db = event.target.result
  const objectStoreName = 'sets'
  const oldVersion = event.oldVersion
  // const newVersion = event.newVersion
  if (!db.objectStoreNames.contains(objectStoreName)) {
    const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id' })// create unique index on keyPath === 'id'
    objectStore.createIndex('id_index', 'id', { unique: true })
    return objectStore
  }

  if (oldVersion >= 3) {
    return
  }

  // Accessing the existing object store
  const existingObjectStore = event.currentTarget.transaction.objectStore(objectStoreName)

  // Renaming an existing index
  assists.renameExistingIndex(existingObjectStore, 'sets_id_unqiue', 'id_index', 'id', 'id', { unique: true })
}

export default sets
