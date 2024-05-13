import { css } from '@pigment-css/react'
import { colorsVar } from '../_styles/vars'
import { TableContent } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'

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
  const ColGroup = (
    <colgroup>
      {columns.map(({ width }) => (
        <col style={{ width: width ?? 'auto' }} />
      ))}
    </colgroup>
  )
  let left = 0
  for (const column of columns) {
    const { fixed, width} = column
    if (fixed) {
      column.__left__ = left
      if (typeof width === 'string') {
        left += parseFloat(width)
      } else if (typeof width === 'number') {
        left += width
      } else {
        left += 200
      }
    }
  }
  return (
    <div className={overflowAutoCss} style={{ height: props.scroll?.y }}>
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
          <TableContent rowIndex={0} columns={columns} rowKey={rowKey} isHead />
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
