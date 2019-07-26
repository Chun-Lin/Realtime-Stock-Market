export const apiPolish = data => {
  // If this is not an object, dont recurse.
  if (!data || typeof data !== 'object') {
    return data
  }

  // If the data is a complex object, walk all subtrees to normalize all branches.
  let clean = {}
  Object.keys(data).forEach(key => {
    const originalKey = key

    key = key
      .charAt(0)
      .toLowerCase()
      .concat(originalKey.substring(1))
      .replace(/\s|[()]|\d{1}\.\s/g, '')

    clean[key] = apiPolish(data[originalKey])
  })

  return clean
}
