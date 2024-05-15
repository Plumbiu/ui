import { css } from '@pigment-css/react'
import { colorsVar } from '../_styles/vars'
import { TableTr } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import React from 'react'
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
    color: custormColor = 'info',
    headZIndex,
    footer,
    showHeader = true,
    sticky = true,
    tableLayout,
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

  const { ColGroup } = useColumns({
    columns,
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
        {showHeader && <thead
          className={theadCls}
          style={{
            zIndex: headZIndex,
            position: sticky ? undefined : 'static'
          }}
        >
          <TableTr rowIndex={0} columns={columns} rowKey={rowKey} isHead />
        </thead>}
        <tbody>
          {dataSource.map((data, rowIndex) => (
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
