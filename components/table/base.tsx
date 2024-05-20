import useColumns from './hooks/columns'
import { TableTr } from './render'
import { StyledTable, theadCls, StyledFooter } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '@/_styles'

const BaseTable: React.FC<TableProps> = (props) => {
  const {
    bordered = false,
    columns = [],
    dataSource = [],
    rowKey = 'key',
    headZIndex,
    footer,
    showHeader = true,
    rowSelection,
    sticky = true,
    tableLayout,
    pageSize = 15,
    pageCount = 8,
    ...restProps
  } = props

  const tableProps = {
    bordered,
    columns,
    dataSource,
    rowKey,
    ...restProps,
  }

  const { ColGroup } = useColumns({
    columns,
    bordered,
  })
  return (
    <div className={overflowAutoCss} style={{ maxHeight: props.scroll?.y }}>
      <StyledTable
        style={{
          minWidth: props.scroll?.x,
          tableLayout,
        }}
        {...tableProps}
      >
        {ColGroup}
        {showHeader && (
          <thead
            className={theadCls}
            style={{
              zIndex: headZIndex,
              position: sticky ? undefined : 'static',
            }}
          >
            <TableTr rowIndex={0} columns={columns} head />
          </thead>
        )}
        <tbody>
          {dataSource.map((data, rowIndex) => (
            <TableTr
              rowIndex={rowIndex + 1}
              data={data}
              key={data?.[rowKey] ?? rowIndex}
              columns={columns}
            />
          ))}
        </tbody>
      </StyledTable>
      {!!footer && <StyledFooter>{footer}</StyledFooter>}
    </div>
  )
}

export default BaseTable
