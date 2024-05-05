import { scrollCss } from '../styles'
import { TableContent } from './render'
import { StyledTable } from './styles'
import { TableProps } from './types'

const ScrollTable: React.FC<TableProps> = (props) => {
  const {
    bordered = true,
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

  const ColGroup = (
    <colgroup>
      {columns.map((column) => (
        <col width={column.width} />
      ))}
    </colgroup>
  )
  return (
    <div>
      <div>
        <StyledTable {...tableProps}>
          {ColGroup}
          <thead>
            <TableContent columns={columns} rowKey={rowKey} isHead />
          </thead>
        </StyledTable>
      </div>
      <div className={scrollCss} style={{ height: props.scroll?.y }}>
        <StyledTable {...tableProps}>
          {ColGroup}
          <tbody>
            {dataSource.map((data) => (
              <TableContent
                key={data[rowKey]}
                columns={columns}
                rowKey={rowKey}
              />
            ))}
          </tbody>
        </StyledTable>
      </div>
    </div>
  )
}

export default ScrollTable
