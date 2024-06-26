/* eslint-disable @stylistic/indent */
import { DefaultData, Render, TableColumnTypes } from '../types'

interface TdProps {
  render: Render<DefaultData>
  column: TableColumnTypes<DefaultData>
  rowIndex: number
  colIndex: number
  data: DefaultData
  dataIndex?: string
}

const TdItem: React.FC<TdProps> = ({
  render,
  column,
  data,
  dataIndex,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {render
        ? render(data, column)
        : dataIndex
        ? data?.[dataIndex]
        : null}
    </td>
  )
}

export default TdItem
