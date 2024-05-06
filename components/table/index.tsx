import { colorsVar } from '../styles/vars'
import { TableContent } from './render'
import ScrollTable from './scroll'
import { StyledTable } from './styles'
import { TableProps } from './types'

const Table: React.FC<TableProps> = (props) => {
  const {
    bordered = false,
    columns = [],
    dataSource = [],
    rowKey = 'key',
    color: custormColor = 'info',
    ...restProps
  } = props

  const color = colorsVar.includes(custormColor) ? custormColor : 'info'

  const tableProps = {
    bordered,
    columns,
    dataSource,
    rowKey,
    color,
    ...restProps,
  }

  return props.scroll ? (
    <ScrollTable {...tableProps} />
  ) : (
    <StyledTable {...tableProps}>
      <thead>
        <TableContent columns={columns} rowKey={rowKey} isHead />
      </thead>
      <tbody>
        {dataSource.map((data) => (
          <TableContent key={data[rowKey]} columns={columns} rowKey={rowKey} />
        ))}
      </tbody>
    </StyledTable>
  )
}

export default Table

export type * from './types'
