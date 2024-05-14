import { css } from '@pigment-css/react'
import { colorsVar } from '../_styles/vars'
import { TableContent } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import { useEffect, useRef } from 'react'
import { useScroll } from 'ahooks'
import React from 'react'
import { calOffset } from './utils'

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

  const tabledRef = useRef(null)
  const pos = useScroll(tabledRef)

  const ColGroup = React.useMemo(() => {
    let left = 0
    let shadowLeft = 0
    let right = 0
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
      const { fixed, width } = column
      if (fixed === 'right' || !fixed) {
        continue
      }
      column.__left__ = left
      left += calOffset(width)
      if (i === 0) {
        column.__shadowLeft__ = 0
      } else {
        const lastFixed = columns[i - 1].fixed
        column.__shadowLeft__ = shadowLeft
        if (!lastFixed) {
          shadowLeft += left
        }
      }
    }
    for (let i = columns.length - 1; i >= 0; i--) {
      const column = columns[i]
      const { fixed, width } = column
      if (fixed === 'left' || !fixed) {
        continue
      }
      column.__right__ = right
      right += calOffset(width)
    }
    return (
      <colgroup>
        {columns.map(({ width }) => (
          <col style={{ width: width ?? 'auto' }} />
        ))}
      </colgroup>
    )
  }, [columns, props.scroll])

  useEffect(() => {
    const posX = pos?.left
    if (!posX) {
      return
    }
    let isFirstRightFixed = true
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const column = columns[colIndex]
      const { fixed, width } = column
      if (!fixed || !width) {
        continue
      }
      if (fixed === 'right' && isFirstRightFixed) {
        columns[colIndex].__shadow__ = true
        isFirstRightFixed = false
        continue
      }
      if (fixed === 'left' || fixed === true) {
        let hasShadow =
          column.__shadowLeft__ !== undefined && posX > column.__shadowLeft__
        if (hasShadow) {
          for (let i = 0; i < colIndex; i++) {
            const cur = columns[i]
            if (cur.__shadow__ && cur.__left__ !== undefined) {
              cur.__shadow__ = false
            }
          }
          columns[colIndex].__shadow__ = true
        } else {
          columns[colIndex].__shadow__ = false
        }
      }
    }
  }, [pos])

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
            posX={pos?.left}
            rowIndex={0}
            columns={columns}
            rowKey={rowKey}
            isHead
          />
        </thead>
        <tbody>
          {dataSource.map((data, rowIndex) => (
            <TableContent
              posX={pos?.left}
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
