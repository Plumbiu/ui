import { RefObject, useMemo } from 'react'
import { TableProps } from '../types'

interface IUsePosition {
  ref: RefObject<HTMLDivElement>
  columns: TableProps['columns']
}

const usePosition = (props: IUsePosition) => {
  const { columns } = props

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
      lastLeftFixed = column
      column.__left__ = left
      left += width ?? 200
    }
    lastLeftFixed && (lastLeftFixed.__shadow__ = true)

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
      column.__right__ = right
      right += width ?? 200
    }
    lastRightFixed && (lastRightFixed.__shadow__ = true)

    return (
      <colgroup>
        {columns.map(({ width }) => (
          <col style={{ width: width ?? 'auto' }} />
        ))}
      </colgroup>
    )
  }, [columns])

  return { ColGroup }
}

export default usePosition
