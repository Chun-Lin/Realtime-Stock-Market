export const moveObjKeysToNestedObj = (objects, keyName) => {
  const name = keyName
  return Object.keys(objects).map(obj => ({
    [name]: obj,
    ...objects[obj],
  }))
}

