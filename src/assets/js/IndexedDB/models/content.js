const content = (db) =>
  db.createObjectStore('contents', { keyPath: 'id' })// create unique index on keyPath === 'id'
    .createIndex('id', 'id', { unique: true })
    .createIndex('set_id', 'set_id', { unique: false })

export default content
