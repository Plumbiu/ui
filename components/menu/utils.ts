import { MenuItem } from './types'

export const findAcitveArr = (items: MenuItem[]) => {
  function doFlat(
    item: MenuItem,
    beforeItem: MenuItem,
    depth = 1,
    activeArr: string[] = [],
  ) {
    if (item.type === undefined) {
      item._activeArr = activeArr
    }
    if (item.children) {
      const newArr =
        item.key && item.type === undefined
          ? [...activeArr, item.key]
          : activeArr
      for (const child of item.children) {
        doFlat(child, item, depth + 1, newArr)
      }
    }
  }
  for (const item of items) {
    doFlat(item, item)
  }
}
