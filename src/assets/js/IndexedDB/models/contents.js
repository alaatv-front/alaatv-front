const contents = (db) =>
  db.createObjectStore('contents', { keyPath: 'id' })
    .createIndex('id_index', 'id', { unique: true })
    .createIndex('sent_index', 'sent', { unique: false })
    .createIndex('set_id_index', 'set_id', { unique: false })
    .createIndex('duration_index', 'duration', { unique: false })
    .createIndex('watched_seconds_index', 'watched_seconds', { unique: false })

export default contents
