function renameExistingIndex (existingObjectStore, oldIndexName, newIndexName, oldFieldName, newFieldName, options) {
  if (!existingObjectStore.indexNames.contains(oldIndexName)) {
    return
  }
  const oldIndex = existingObjectStore.index(oldIndexName)
  // const newIndex =
  existingObjectStore.createIndex(newIndexName, newFieldName, options)

  // Copy data from old index to new index
  const cursorRequest = oldIndex.openCursor()
  cursorRequest.onsuccess = function (event) {
    const cursor = event.target.result
    if (cursor) {
      // Access the value through the cursor's `value` property
      const value = cursor.value
      value[newFieldName] = value[oldFieldName]
      // Add the value to the object store, not the index
      existingObjectStore.put(value)

      cursor.continue()
    } else {
      // When cursor finishes, delete the old index
      existingObjectStore.deleteIndex(oldIndexName)
    }
  }

  // // Delete the old index
  // existingObjectStore.deleteIndex(oldIndexName)
}

function renameExistingProperty (existingObjectStore, oldPropertyName, newPropertyName, changeFunction) {
  const cursorRequest = existingObjectStore.openCursor()

  cursorRequest.onsuccess = function (event) {
    const cursor = event.target.result
    if (!cursor) {
      return
    }

    const value = cursor.value
    // Check if the old property exists
    if (oldPropertyName in value) {
      // Create the new property with the value of the old property
      value[newPropertyName] = typeof changeFunction === 'function' ? changeFunction(value[oldPropertyName]) : value[oldPropertyName]
      // Delete the old property
      delete value[oldPropertyName]
      // Update the object in the object store
      cursor.update(value)
    }
    cursor.continue() // Continue iterating
  }
}

export default {
  renameExistingIndex,
  renameExistingProperty
}
