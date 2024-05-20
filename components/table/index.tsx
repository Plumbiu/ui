import React, { useState } from 'react'
import { TableTr } from './render'
import { StyledFooter, StyledTable, theadCls } from './styles'
import { TableProps } from './types'
import useColumns from './hooks/columns'
import useOperate from './hooks/operate'
import usePagination from './hooks/pagination'
import useCheck from './hooks/check'
import { overflowAutoCss } from '@/_styles'

const Table: React.FC<TableProps> = (props) => {
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

  const { ColGroup } = useColumns({
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

  const { checkArr, checkCallback, isAllChecked, isNoneChecked } = useCheck({
    splitData,
    rowSelection,
    rowKey,
  })

  const commonProps = {
    checkCallback,
    columns,
    operaParams,
  }
  return (
    <div>
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
              <TableTr
                isHalfChck={!isAllChecked && !isNoneChecked}
                checkStatus={checkArr[0]?.checkStatus}
                setOperaParams={setOperaParams}
                rowIndex={0}
                head
                {...commonProps}
              />
            </thead>
          )}
          <tbody>
            {mergedDataSource.map((data, rowIndex) => (
              <TableTr
                disabled={rowSelection?.getDisabledProps?.(data)}
                checkStatus={checkArr[rowIndex + 1]?.checkStatus}
                rowIndex={rowIndex + 1}
                data={data}
                key={data?.[rowKey] ?? rowIndex}
                {...commonProps}
              />
            ))}
          </tbody>
        </StyledTable>
        {!!footer && <StyledFooter>{footer}</StyledFooter>}
      </div>
      {Pagintaion}
    </div>
  )
}

export type { TableColumnTypes, TableProps } from './types'
export { default as VirtualTable } from './virtual'
export { default as BaseTable } from './base'

export default Table
