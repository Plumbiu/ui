import { DefaultData, TableProps } from './types'

export const TdTag: React.FC<{
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
}> = (props) => {
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
  } = column
  let style: React.CSSProperties | undefined = undefined
  if (fixed) {
    style = {
      ...(style ?? {}),
      position: 'sticky',
      left: column.__left__,
      zIndex,
    }
  }
  return hidden ? null : (
    <td
      align={align}
      style={style}
      className={className}
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
}> = ({ columns, rowKey, rowIndex, isHead = false, data }) => {
  return (
    <tr>
      {columns.map((column, colIndex) => (
        <TdTag
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
