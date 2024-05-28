import useColumns from './hooks/columns'
import { TableTr } from './render'
import { StyledTable, theadCls, StyledFooter } from './styles'
import { BaseTableProps } from './types'
import { scrollBarCss } from '@/_utils/styles'

const BaseTable: React.FC<BaseTableProps> = (props) => {
  const {
    bordered = false,
    columns = [],
    dataSource = [],
    rowKey = 'key',
    headZIndex,
    footer,
    showHeader = true,
    sticky = true,
    tableLayout,
    ...restProps
  } = props

  const tableProps = {
    bordered,
    columns,
    dataSource,
    rowKey,
    ...restProps,
  }

  const { ColGroup, groupHeaderColumns } = useColumns({
    columns,
    bordered,
  })
  return (
    <div className={scrollBarCss} style={{ maxHeight: props.scroll?.y }}>
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
            {groupHeaderColumns.map((columns, rowIndex) => (
              <TableTr
                columns={columns}
                key={rowIndex}
                rowIndex={rowIndex}
                head
              />
            ))}
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
