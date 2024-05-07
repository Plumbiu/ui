import { TableProps } from './types'

export function calFixedLeft(columns: TableProps['columns']) {
  let left = 0
  for (const column of columns) {
    const { fixed, width } = column
    if (fixed) {
      column.__left__ = left
      if (typeof width === 'string') {
        left += parseFloat(width)
      } else if (typeof width === 'number') {
        left += width
      } else {
        left += 200
      }
    }
  }
}
