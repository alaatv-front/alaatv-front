const set = (db) =>
  db.createObjectStore('sets', { keyPath: 'id' })// create unique index on keyPath === 'id'
    .createIndex('id', 'id', { unique: true })

export default set
