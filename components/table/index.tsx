import { css } from '@pigment-css/react'
import { colorsVar } from '../_styles/vars'
import { TableContent } from './render'
import { StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import { calFixedLeft } from './utils'

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

  if (props.scroll) {
    calFixedLeft(columns)
  }
  return (
    <div className={overflowAutoCss} style={{ height: props.scroll?.y }}>
      <StyledTable
        style={{ minWidth: props.scroll?.x, tableLayout: props.scroll ? 'fixed' : 'auto' }}
        {...tableProps}
      >
        {ColGroup}
        <thead className={theadCls} style={{ zIndex: headZIndex }}>
          <TableContent rowIndex={0} columns={columns} rowKey={rowKey} isHead />
        </thead>
        <tbody>
          {dataSource.map((data, rowIndex) => (
            <TableContent
              rowIndex={rowIndex + 1}
              dataSource={data}
              key={data?.[rowKey] ?? rowIndex}
              columns={columns}
              rowKey={rowKey}
            />
          ))}
        </tbody>
      </StyledTable>
    </div>
  )
}

export default Table

export type * from './types'
