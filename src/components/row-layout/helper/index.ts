import { VNode } from 'vue'

// 求一个数组的和
export const SumFromArray = (arr: number[]) => {
  return arr.reduce((prev, next) => prev + next, 0)
}

/**
 * @description
 * @param els   子节点集合
 * @param col   分割数组，即每行的的列数集合
 */
export const splitElements = (els: VNode[], col: number[]): Array<VNode[]> => {
  const arr: Array<VNode[]> = []
  let i = 0
  let start = 0
  let end = col[i]
  let isSplice = true
  while (isSplice) {
    arr.push(els.slice(start, end))
    if (i < col.length - 1) {
      i++
    }
    start = end
    end = start + col[i]
    if (end >= els.length) {
      arr.push(els.slice(start, end))
      isSplice = false
    }
  }
  return arr
}

// 通过递归，移除父级为<></>的标签（即Fragment标签）
export const removeFragment = (els: VNode[]): VNode[] => {
  return els.reduce((prev: VNode[], next: VNode) => {
    if (typeof next.type === 'symbol') {
      return Array.isArray(next.children)
        ? [...prev, ...removeFragment(next?.children as VNode[])]
        : prev
    }
    return prev.concat(next)
  }, [])
}
