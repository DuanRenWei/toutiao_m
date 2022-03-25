import store from 'store2'

export const set = (key, val) => store.set(key, val)
export const get = key => store.get(key)
export const remove = key => store.remove(key)
