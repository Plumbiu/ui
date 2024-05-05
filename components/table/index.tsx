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
    ...restProps
  } = props
  const tableProps = {
    bordered,
    columns,
    dataSource,
    rowKey,
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
