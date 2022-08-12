/**
 * 获取最顶层的路由
 * 例如: /home/index/ -> home
 * @param {*} route_path
 * @returns string
 */
export function fetchTopRoutePath(route_path: string) {
  const arr = route_path.split('/')
  return arr[1]
}

/**
 * 移除对象的某些属性生成新的对象
 * @param o 对象
 * @param keys 从o筛选出不要的key值
 * @returns Object
 */
export const omit = (o: Recordable, keys: string[]) => {
  return Object.keys(o).reduce((v, k) => {
    if (keys.includes(k)) {
      return v
    }
    return { k: o[k], ...v }
  }, {} as Recordable)
}

/**
 * 筛选对象的某些属性生成新的对象
 * @param o 对象
 * @param keys 从o筛选出不要的key值
 * @returns Object
 */
export const pick = (o: Recordable, keys: string[]) => {
  return keys.reduce((v, k) => {
    if (keys.includes(k) && Object.prototype.hasOwnProperty.call(o, k)) {
      return { k: o[k], ...v }
    }
    return v
  }, {} as Recordable)
}
