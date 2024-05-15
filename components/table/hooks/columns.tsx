import { useMemo } from 'react'
import { TableProps } from '../types'

interface IUsePosition {
  columns: TableProps['columns']
  bordered?: boolean
}

const useColumns = (props: IUsePosition) => {
  const { columns, bordered } = props

  const ColGroup = useMemo(() => {
    if (!bordered) {
      let left = 0
      let lastLeftFixed
      // left
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        const { fixed, width } = column
        if (fixed !== 'left') {
          continue
        }
        lastLeftFixed = column
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
        lastRightFixed = column
        column._right = right
        right += width ?? 200
      }
      lastRightFixed && (lastRightFixed._shadow = true)
    }

    return (
      <colgroup>
        {columns.map(({ width }) => (
          <col style={{ width: width ?? 'auto' }} />
        ))}
      </colgroup>
    )
  }, [columns, bordered])

  return { ColGroup }
}

export default useColumns
