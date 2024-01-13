const contents = (db) => {
  const contentsStore = db.createObjectStore('contents', { keyPath: 'id' })
  contentsStore.createIndex('id_index', 'id', { unique: true })
  contentsStore.createIndex('sent_index', 'sent', { unique: false })
  contentsStore.createIndex('set_id_index', 'set_id', { unique: false })
  contentsStore.createIndex('duration_index', 'duration', { unique: false })
  contentsStore.createIndex('watched_seconds_index', 'watched_seconds', { unique: false })
  return contentsStore
}
export default contents
