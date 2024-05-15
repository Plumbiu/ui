import { css } from '@pigment-css/react'
import { TableTr } from './render'
import { StyledFooter, StyledTable } from './styles'
import { ITableOperaParams, TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import React, { useMemo, useState } from 'react'
import useColumns from './hooks/columns'

const theadCls = css({
  position: 'sticky',
  top: 0,
  zIndex: 99,
})

const Table: React.FC<TableProps> = (props) => {
  const {
    bordered = false,
    columns = [],
    dataSource = [],
    rowKey = 'key',
    color = 'info',
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
    color,
    ...restProps,
  }

  const [operaParams, setOperaParams] = useState<ITableOperaParams>()
  const { ColGroup } = useColumns({
    columns,
    bordered,
  })

  const clonedDataSouce = dataSource.slice(0)
  const mergedDataSource = useMemo(() => {
    if (operaParams === undefined) {
      return clonedDataSouce
    }
    const { sorter, filter } = operaParams
    if (sorter) {
      clonedDataSouce.sort(sorter)
    }
    if (filter) {
      clonedDataSouce.filter(filter)
    }
    return clonedDataSouce
  }, [operaParams])

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
            <TableTr
              setOperaParams={setOperaParams}
              rowIndex={0}
              columns={columns}
              rowKey={rowKey}
              isHead
            />
          </thead>
        )}
        <tbody>
          {mergedDataSource.map((data, rowIndex) => (
            <TableTr
              rowIndex={rowIndex + 1}
              data={data}
              key={data?.[rowKey] ?? rowIndex}
              columns={columns}
              rowKey={rowKey}
            />
          ))}
        </tbody>
      </StyledTable>
      {!!footer && <StyledFooter color={color}>{footer}</StyledFooter>}
    </div>
  )
}

export default Table

export type * from './types'
