import { DefaultData, TableProps } from './types'

export const TdTag: React.FC<{
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  dataSource?: DefaultData
}> = (props) => {
  const { column, isHead, colIndex, rowIndex, dataSource } = props
  const { align, title, render, hidden, dataIndex, fixed } = column
  let style: React.CSSProperties | undefined = undefined
  if (fixed) {
    style = {
      ...style ?? {},
      position: 'sticky',
      left: column.__left__,
      zIndex: 10
    }
  }
  return hidden ? null : (
    <td align={align} style={style}>
      {isHead
        ? title
        : render
        ? render(dataSource, column, rowIndex, colIndex)
        : dataSource?.[dataIndex]}
    </td>
  )
}

export const TableContent: React.FC<{
  dataSource?: DefaultData
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
  rowIndex: number
}> = ({ columns, dataSource, rowKey, rowIndex, isHead = false }) => {
  return (
    <tr>
      {columns.map((column, colIndex) => (
        <TdTag
          dataSource={dataSource}
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
