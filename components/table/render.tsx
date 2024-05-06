import { css } from '@pigment-css/react'
import { DefaultData, TableProps } from './types'

const fixedCls = css({
  position: 'sticky',
  zIndex: 1,
})

export const TdTag: React.FC<{
  column: TableProps['columns'][number]
  isHead: boolean
  index: number
  dataSource?: DefaultData
}> = (props) => {
  const { column, isHead, index, dataSource } = props
  const { align, title, render, hidden, fixed, dataIndex } = column
  return hidden ? null : (
    <td align={align} className={fixed ? fixedCls : ''}>
      {isHead
        ? title
        : render
        ? render(dataSource?.[dataIndex], dataSource, index)
        : dataSource?.[dataIndex]}
    </td>
  )
}

export const TableContent: React.FC<{
  dataSource?: DefaultData
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
}> = ({ columns, dataSource, rowKey, isHead = false }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <TdTag
          dataSource={dataSource}
          key={column[rowKey]}
          column={column}
          index={index}
          isHead={isHead}
        />
      ))}
    </tr>
  )
}
