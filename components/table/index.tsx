import { css } from '@pigment-css/react'
import { colorsVar } from '../_styles/vars'
import { TableContent } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import { useRef } from 'react'
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
  console.log(tabledRef)

  const ColGroup = React.useMemo(() => {
    let left = 0
    let right = 0
    let shadowLeft = 0
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
      const { fixed, width } = column
      if (fixed) {
        if (fixed === 'left' || fixed === true) {
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
        } else if (fixed === 'right') {
          column.__right__ = right
          right += calOffset(width)
        }
      }
    }
    return (
      <colgroup>
        {columns.map(({ width }) => (
          <col style={{ width: width ?? 'auto' }} />
        ))}
      </colgroup>
    )
  }, [columns, props.scroll])

  return (
    <div
   
      ref={tabledRef}
      className={overflowAutoCss}
      style={{ height: props.scroll?.y }}
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
          <TableContent posX={pos?.left} rowIndex={0} columns={columns} rowKey={rowKey} isHead />
        </thead>
        <tbody >
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
