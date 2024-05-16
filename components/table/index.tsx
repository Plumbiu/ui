import { css } from '@pigment-css/react'
import { TableTr } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import React from 'react'
import useColumns from './hooks/columns'
import useOperate from './hooks/operate'

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

  const { ColGroup } = useColumns({
    columns,
    bordered,
  })
  const { operaParams, setOperaParams, mergedDataSource } = useOperate({
    dataSource,
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
            <TableTr
              operaParams={operaParams}
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
              operaParams={operaParams}
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

export type { TableColumnTypes, TableProps } from './types'
