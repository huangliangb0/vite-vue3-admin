/**
 * 获取所有的icon的名称集合
 */
export const getIconNameList = () => {
  const modules = import.meta.globEager('./icons/*.svg')

  return Object.keys(modules).map((path) => {
    const comp = modules[path].default
    const iconName = comp.slice(18, comp.length - 4)
    return iconName as string
  })
}

export const getImageUrl = (name: string) => {
  return new URL(`./images/${name}`, import.meta.url).href
}

export const getMenuImageUrl = (name: string) => {
  return new URL(`./menu_images/${name}`, import.meta.url).href
}

export const getErrorImageUrl = (name: string) => {
  return new URL(`./error_images/${name}`, import.meta.url).href
}
