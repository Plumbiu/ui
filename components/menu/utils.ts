import { MenuItem } from './types'

interface FlatParams {
  item: MenuItem
  depth: number
  activeArr: string[]
}

export const flatMenuItems = (items: MenuItem[]) => {
  function doFlat(
    arr: FlatParams[],
    item: MenuItem,
    depth = 1,
    activeArr: string[] = [],
  ) {
    arr.push({ item, depth, activeArr })
    if (item.children) {
      const newArr = item.key ? [...activeArr, item.key] : activeArr
      for (const child of item.children) {
        doFlat(arr, child, item.type === 'group' ? depth : depth + 1, newArr)
      }
    }
  }

  const flatItems: FlatParams[] = []
  for (const item of items) {
    doFlat(flatItems, item)
  }
  return flatItems
}
