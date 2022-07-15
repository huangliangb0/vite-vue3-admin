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
