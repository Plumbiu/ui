import React from 'react'
import { DefaultData, TableProps } from './types'
import clsx from 'clsx'

export const TableTd: React.FC<{
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
}> = React.memo(
  (props) => {
    const { column, isHead, colIndex, rowIndex, data } = props

    const {
      align,
      title,
      render,
      hidden,
      dataIndex,
      fixed,
      className,
      zIndex = 10,
      colSpan,
      rowSpan,
    } = column

    if (hidden) {
      return null
    }

    if (!dataIndex && !render) {
      return null
    }

    const style: React.CSSProperties = { zIndex }
    if (column._left !== undefined) {
      style.left = column._left
    } else if (column._right !== undefined) {
      style.right = column._right
    }

    const cl =
      clsx([
        {
          className: !!className,
          _td_fixed: !!fixed,
          _shadow: column._shadow && fixed !== 'right',
          _shadow_right: column._shadow && fixed === 'right',
        },
      ]) || undefined

    function renderTd() {
      if (isHead) {
        return title
      }
      if (render) {
        return render(data, column, rowIndex, colIndex)
      }
      if (!dataIndex) {
        return null
      }
      return data?.[dataIndex]
    }
    return (
      <td
        align={align}
        style={style}
        className={cl}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {renderTd()}
      </td>
    )
  },
  (prevProps) => {
    const { column } = prevProps
    if (typeof column.render === 'function') {
      return false
    }
    if (!column.fixed) {
      return true
    }
    return false
  },
)

export const TableTr: React.FC<{
  data?: DefaultData
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
  rowIndex: number
}> = ({ columns, rowKey, rowIndex, isHead = false, data }) => {
  return (
    <tr>
      {columns.map((column, colIndex) => {
        return (
          <TableTd
            data={data}
            key={column[rowKey]}
            column={column}
            colIndex={colIndex}
            isHead={isHead}
            rowIndex={rowIndex}
          />
        )
      })}
    </tr>
  )
}
