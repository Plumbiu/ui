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

  const { operaParams, setOperaParams, mergedDataSource } = useOperate({
    dataSource,
    setCurrent,
  })

  const { splitData, Pagintaion } = usePagination({
    pageSize,
    dataSource: mergedDataSource,
    pagination,
    total: mergedDataSource.length,
    pageCount,
    current,
    setCurrent,
  })

  const { checkArr, checkCallback, isAllChecked, isNoneChecked } = useCheck({
    splitData,
    rowSelection,
  })
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
                checkCallback={checkCallback}
                checkStatus={checkArr[0]}
                operaParams={operaParams}
                setOperaParams={setOperaParams}
                rowIndex={0}
                columns={columns}
                isHead
              />
            </thead>
          )}
          <tbody>
            {splitData.map((data, rowIndex) => (
              <TableTr
                checkCallback={checkCallback}
                checkStatus={checkArr[rowIndex + 1]}
                operaParams={operaParams}
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
      {Pagintaion}
    </div>
  )
}

export type { TableColumnTypes, TableProps } from './types'
export { default as VirtualTable } from './virtual'
export { default as BaseTable } from './base'

export default Table
