export default class Enum {
  constructor(...keys) {
    keys.forEach((key) => {
      this[key.name] = key.value
    })
    Object.freeze(this)
  }

  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) yield key
  }
}
