export function get(writableStore, key) {
  let value = null
  writableStore.update(s => {
    value = s[key]
    return s
  })
  return value
}

export function set(writableStore, key, value) {
  writableStore.update(s => {
    s[key] = value
    return s
  })
}

