import { useScroll } from 'ahooks'
import { RefObject, useEffect, useMemo } from 'react'
import { TableProps } from '../types'
import { calOffset } from '../utils'

interface IUsePosition {
  ref: RefObject<HTMLDivElement>
  columns: TableProps['columns']
}

const usePosition = (props: IUsePosition) => {
  const { ref, columns } = props
  const pos = useScroll(ref, ({ left }) => {
    if (!pos) {
      return true
    }
    if (Math.abs(pos.left - left) > 40 || pos.left <= 40) {
      return true
    }
    return false
  })
  useEffect(() => {
    if (!pos) {
      return
    }
    const posX = pos?.left
    if (posX === undefined) {
      return
    }
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const column = columns[colIndex]
      const { fixed } = column
      if (!fixed || fixed === 'right') {
        continue
      }
      if (fixed === 'left' || fixed === true) {
        let hasShadow =
          column.__shadowLeft__ !== undefined && posX > column.__shadowLeft__
        if (hasShadow) {
          for (let i = 0; i < colIndex; i++) {
            const cur = columns[i]
            if (cur.__shadow__ && cur.__left__ !== undefined) {
              cur.__shadow__ = false
            }
          }
          columns[colIndex].__shadow__ = pos.left <= 40 ? false : true
        } else {
          columns[colIndex].__shadow__ = false
        }
      }
    }
  }, [pos])

  useEffect(() => {
    let left = 0
    let right = 0
    let shadowLeft = 0
    let isFirstRightFixed = true
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
      const { fixed, width } = column
      if (!fixed) {
        continue
      }
      if (fixed === 'right') {
        if (isFirstRightFixed) {
          columns[i].__shadow__ = true
          isFirstRightFixed = false
        }
      } else {
        column.__left__ = left
        left += calOffset(width)
        if (i === 0) {
          column.__shadowLeft__ = 0
        } else {
          const lastFixed = columns[i - 1].fixed
          column.__shadowLeft__ = shadowLeft
          if (!lastFixed) {
            shadowLeft += left
          }
        }
      }
    }

    for (let i = columns.length - 1; i >= 0; i--) {
      const column = columns[i]
      const { fixed, width } = column
      if (fixed === 'left' || !fixed) {
        continue
      }
      column.__right__ = right
      right += calOffset(width)
    }
  }, [])

  const ColGroup = useMemo(() => {
    return (
      <colgroup>
        {columns.map(({ width }) => (
          <col style={{ width: width ?? 'auto' }} />
        ))}
      </colgroup>
    )
  }, [columns])

  return { pos, ColGroup }
}

export default usePosition
