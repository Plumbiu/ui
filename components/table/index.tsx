import { forwardRef, useImperativeHandle, useState } from 'react'
import { TableTr } from './render'
import { StyledFooter, StyledTable, theadCls } from './styles'
import { TableProps } from './types'
import useColumns from './hooks/columns'
import useOperate from './hooks/operate'
import usePagination from './hooks/pagination'
import useCheck, {
  UpdateCheckeboxByRowIndex,
  UpdateCheckboxByKey,
} from './hooks/check'
import { TableContext } from './context'
import { scrollBarCss } from '@/_utils/styles'

export type TableRefProps = Partial<{
  updateCheckeboxByRowIndex: UpdateCheckeboxByRowIndex
  updateCheckboxByKey: UpdateCheckboxByKey
  isNoneChecked: boolean
  isAllChecked: boolean
}>

const Table = forwardRef<TableRefProps, TableProps>((props, ref) => {
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
    pagination = false,
    ...restProps
  } = props

  const tableProps = {
    bordered,
    columns,
    dataSource,
    rowKey,
    ...restProps,
  }

  const { ColGroup, groupHeaderColumns, flatColumns } = useColumns({
    columns,
    bordered,
    rowSelection,
  })
  const [current, setCurrent] = useState(1)
  const { splitData, Pagintaion } = usePagination({
    pageSize,
    dataSource,
    pagination,
    total: dataSource.length,
    pageCount,
    current,
    setCurrent,
  })

  const { operaParams, setOperaParams, mergedDataSource } = useOperate({
    dataSource: splitData,
  })

  const {
    checkArr,
    updateCheckeboxByRowIndex,
    isNoneChecked,
    isAllChecked,
    updateCheckboxByKey,
  } = useCheck({
    splitData,
    rowSelection,
    rowKey,
  })

  useImperativeHandle(ref, () => ({
    updateCheckeboxByRowIndex,
    updateCheckboxByKey,
    isNoneChecked,
    isAllChecked,
  }))

  return (
    <TableContext.Provider
      value={{
        setOperaParams,
        operaParams,
        isAllChecked,
        isNoneChecked,
        updateCheckeboxByRowIndex,
      }}
    >
      <div>
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
                    checkStatus={checkArr?.[0]?.checkStatus}
                    columns={columns}
                    key={rowIndex}
                    rowIndex={rowIndex}
                    head
                  />
                ))}
              </thead>
            )}
            <tbody>
              {mergedDataSource.map((data, rowIndex) => (
                <TableTr
                  disabled={rowSelection?.getDisabledProps?.(data)}
                  checkStatus={checkArr?.[rowIndex + 1]?.checkStatus}
                  rowIndex={rowIndex + 1}
                  data={data}
                  key={data?.[rowKey] ?? rowIndex}
                  columns={flatColumns}
                />
              ))}
            </tbody>
          </StyledTable>
          {!!footer && <StyledFooter>{footer}</StyledFooter>}
        </div>
        {Pagintaion}
      </div>
    </TableContext.Provider>
  )
})

export type { TableColumnTypes, TableProps } from './types'
export { CheckEnum as TableCheckEnum } from './types'
export { default as VirtualTable } from './virtual'
export { default as BaseTable } from './base'

export default Table
