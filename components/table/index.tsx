import { css } from '@pigment-css/react'
import { colorsVar } from '../_styles/vars'
import { TableContent } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import { RefObject, useRef } from 'react'
import React from 'react'
import usePosition from './hooks/columns'

const theadCls = css({
  position: 'sticky',
  top: 0,
})

const Table: React.FC<TableProps> = (props) => {
  const {
    bordered = false,
    columns = [],
    dataSource = [],
    rowKey = 'key',
    color: custormColor = 'info',
    headZIndex = 99,
    footer,
    fixed = true,
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
  console.log('rerender');

  const tabledRef = useRef<RefObject<HTMLDivElement>['current']>(null)
  const { ColGroup } = usePosition({
    ref: tabledRef,
    columns,
  })

  return (
    <div
      ref={tabledRef}
      className={overflowAutoCss}
      style={{ maxHeight: props.scroll?.y }}
    >
      <StyledTable
        style={{
          minWidth: props.scroll?.x,
          tableLayout: props.scroll ? 'fixed' : 'auto',
        }}
        {...tableProps}
      >
        {ColGroup}
        <thead
          className={theadCls}
          style={{ zIndex: headZIndex, position: fixed ? undefined : 'static' }}
        >
          <TableContent
            rowIndex={0}
            columns={columns}
            rowKey={rowKey}
            isHead
          />
        </thead>
        <tbody>
          {dataSource.map((data, rowIndex) => (
            <TableContent
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
