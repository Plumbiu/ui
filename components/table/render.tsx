import React from 'react'
import { DefaultData, TableProps } from './types'
import clsx from 'clsx'

export const TdTag: React.FC<{
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
}> = React.memo((props) => {
  const {
    column,
    isHead,
    colIndex,
    rowIndex,
    data,
  } = props

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

  let style: React.CSSProperties | undefined = undefined
  if (fixed) {
    style = {
      ...(style ?? {}),
      position: 'sticky',
      zIndex,
    }
    if (column.__left__ !== undefined) {
      style.left = column.__left__
    } else if (column.__right__ !== undefined) {
      style.right = column.__right__
    }
  }

  const cl = clsx([
    {className: !!className},
    {
      __shadow: column.__shadow__ && fixed !== 'right',
      __shadow_right:
        column.__shadow__ &&
        fixed === 'right',
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
}, (prevProps) => {
  const { column } = prevProps
  if (typeof column.render === 'function') {
    return false
  }
  if (!column.fixed) {
    return true
  }
  return false
})

export const TableContent: React.FC<{
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
          <TdTag
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
