import { useEffect, useMemo } from 'react'
import { TableProps, TableRowSelection } from '../types'

interface IUsePosition {
  columns: TableProps['columns']
  bordered?: boolean
  rowSelection?: TableRowSelection
}

function calMaxDepth(columns: TableProps['columns']) {
  let max = 1
  for (const item of columns) {
    if (item.children) {
      max = Math.max(1 + calMaxDepth(item.children), max)
      item._colspan = max
    }
  }
  return max
}

function flatLoop(
  flatArr: TableProps['columns'],
  children: TableProps['columns'],
) {
  for (const column of children) {
    if (column.children) {
      flatLoop(flatArr, column.children)
    } else {
      flatArr.push(column)
    }
  }
}

function loop(
  mergedColumns: TableProps['columns'][],
  children: TableProps['columns'],
  idx: number = 0,
) {
  for (const column of children) {
    if (column.children) {
      loop(mergedColumns, column.children, idx + 1)
    } else {
      column._rowspan = idx
    }
    if (!mergedColumns[idx]) {
      mergedColumns[idx] = []
    }
    mergedColumns[idx].push(column)
  }
}

const useColumns = (props: IUsePosition) => {
  const { columns, bordered, rowSelection } = props

  const groupHeaderColumns = useMemo(() => {
    const groupHeaderColumns: TableProps['columns'][] = []
    loop(groupHeaderColumns, columns)
    for (const columns of groupHeaderColumns) {
      for (const column of columns) {
        if (column.children) {
          column._colspan = calMaxDepth(column.children) + 1
        }
        if (column._rowspan !== undefined) {
          column._rowspan = groupHeaderColumns.length - column._rowspan
        }
      }
    }
    return groupHeaderColumns
  }, [columns])

  const flatColumns: TableProps['columns'] = useMemo(() => {
    const newColumns: TableProps['columns'] = []
    flatLoop(newColumns, columns)
    return newColumns
  }, [columns])

  useEffect(() => {
    let left = 0
    let lastLeftFixed
    // left
    for (let i = 0; i < flatColumns.length; i++) {
      const column = flatColumns[i]
      const { fixed, width } = column
      if (fixed !== 'left') {
        continue
      }
      if (!bordered) {
        lastLeftFixed = column
      }
      column._left = left
      left += width ?? 200
    }
    lastLeftFixed && (lastLeftFixed._shadow = true)

    // right
    let lastRightFixed
    let right = 0
    for (let i = flatColumns.length - 1; i >= 0; i--) {
      const column = flatColumns[i]
      const { fixed, width } = column
      if (fixed !== 'right') {
        continue
      }
      if (!bordered) {
        lastRightFixed = column
      }
      column._right = right
      right += width ?? 200
    }
    lastRightFixed && (lastRightFixed._shadow = true)
  }, [columns])
  const ColGroup = useMemo(() => {
    return (
      <colgroup>
        {rowSelection !== undefined && <col style={{ width: 45 }} />}
        {flatColumns
          .map(({ width, key, dataIndex }) => (
            <col
              key={key ?? dataIndex}
              style={{ width: width ?? 'auto' }}
            />
          ))}
      </colgroup>
    )
  }, [flatColumns, bordered])

  return { ColGroup, groupHeaderColumns, flatColumns }
}

export default useColumns
