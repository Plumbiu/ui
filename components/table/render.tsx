import React from 'react'
import { DefaultData, TableProps } from './types'

export const TdTag: React.FC<{
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
  posX?: number
}> = (props) => {
  const { column, isHead, colIndex, rowIndex, data, posX } = props
  const {
    align,
    title,
    render,
    hidden,
    dataIndex,
    width,
    fixed,
    className,
    zIndex = 10,
    colSpan,
    rowSpan,
  } = column

  const hasShadow =
    fixed &&
    posX &&
    column.__shadowLeft__ !== undefined &&
    width &&
    posX > column.__shadowLeft__
  console.log(posX, column.__shadowLeft__, hasShadow)

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
  return hidden ? null : (
    <td
      align={align}
      style={style}
      className={`${className ?? ''} ${hasShadow ? '__shadow' : ''}`}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {isHead
        ? title
        : data?.[dataIndex]
        ? render
          ? render(data, column, rowIndex, colIndex)
          : data[dataIndex]
        : null}
    </td>
  )
}

export const TableContent: React.FC<{
  data?: DefaultData
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
  rowIndex: number
  posX?: number
}> = ({ columns, rowKey, rowIndex, isHead = false, data, posX }) => {
  return (
    <tr>
      {columns.map((column, colIndex) => (
        <TdTag
          posX={posX}
          data={data}
          key={column[rowKey]}
          column={column}
          colIndex={colIndex}
          isHead={isHead}
          rowIndex={rowIndex}
        />
      ))}
    </tr>
  )
}
