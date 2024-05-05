import { memo } from 'react'
import { TableProps } from './types'

export const TdTag: React.FC<{
  column: TableProps['columns'][number]
  isHead: boolean
  index: number
}> = memo((props) => {
  const { column, isHead, index } = props
  const { align, width, title, render } = column
  return (
    <td align={align} width={width}>
      {isHead ? title : render ? render(title, column, index) : title}
    </td>
  )
})

export const TableContent: React.FC<{
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
}> = ({ columns, rowKey, isHead = false }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <TdTag
          key={column[rowKey]}
          column={column}
          index={index}
          isHead={isHead}
        />
      ))}
    </tr>
  )
}
