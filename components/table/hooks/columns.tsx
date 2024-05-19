import { useMemo } from 'react'
import { TableProps, TableRowSelection } from '../types'

interface IUsePosition {
  columns: TableProps['columns']
  bordered?: boolean
  rowSelection?: TableRowSelection
}

const useColumns = (props: IUsePosition) => {
  const { columns, bordered, rowSelection } = props

  const ColGroup = useMemo(() => {
    let left = 0
    let lastLeftFixed
    // left
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
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
    for (let i = columns.length - 1; i >= 0; i--) {
      const column = columns[i]
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

    return (
      <colgroup>
        {rowSelection !== undefined && (
          <col key="_radio" style={{ width: 50 }} />
        )}
        {columns.map(({ width, key, dataIndex }) => (
          <col key={key ?? dataIndex} style={{ width: width ?? 'auto' }} />
        ))}
      </colgroup>
    )
  }, [columns, bordered])

  return { ColGroup }
}

export default useColumns
