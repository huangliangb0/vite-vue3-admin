export const getImageUrl = (name: string) => {
  return new URL(`./images/${name}`, import.meta.url).href
}

export const getMenuImageUrl = (name: string) => {
  return new URL(`./menu_images/${name}`, import.meta.url).href
}

export const getErrorImageUrl = (name: string) => {
  return new URL(`./error_images/${name}`, import.meta.url).href
}
