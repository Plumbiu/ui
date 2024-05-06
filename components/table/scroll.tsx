import { css } from '@pigment-css/react'
import { overflowAutoCss } from '../styles'
import { TableContent } from './render'
import { StyledTable } from './styles'
import { TableProps } from './types'

const HeaderWrapperCss = css({
  overflow: 'hidden',
})

const TableWrapperCss = css({
  overflow: 'auto',
  position: 'relative',
})

const tableStyle: React.CSSProperties = {
  tableLayout: 'fixed',
}

const ScrollTable: React.FC<TableProps> = (props) => {
  const { columns = [], dataSource = [], rowKey = 'key' } = props

  const ColGroup = (
    <colgroup>
      {columns.map(({ width }) => (
        <col style={{ width: width ?? 'auto' }} />
      ))}
    </colgroup>
  )
  return (
    <div className={TableWrapperCss}>
      <div className={HeaderWrapperCss} style={{ width: props.scroll?.x }}>
        <StyledTable style={tableStyle} {...props}>
          {ColGroup}
          <thead>
            <TableContent columns={columns} rowKey={rowKey} isHead />
          </thead>
        </StyledTable>
      </div>
      <div
        className={overflowAutoCss}
        style={{ maxHeight: props.scroll?.y, width: props.scroll?.x }}
      >
        <StyledTable style={tableStyle} {...props}>
          {ColGroup}
          <tbody>
            {dataSource.map((data) => (
              <TableContent
                dataSource={data}
                key={data[rowKey]}
                columns={columns}
                rowKey={rowKey}
              />
            ))}
          </tbody>
        </StyledTable>
      </div>
    </div>
  )
}

export default ScrollTable
