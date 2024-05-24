import { useThrottleFn, useEventListener } from 'ahooks'
import { useState, useRef, useMemo, useId } from 'react'
import useColumns from './hooks/columns'
import { TableTr } from './render'
import { StyledTable, theadCls } from './styles'
import { VirtualTableProps } from './types'
import { scrollBarCss } from '@/_styles'

const VirtualTable: React.FC<VirtualTableProps> = (props) => {
  const {
    bordered = false,
    columns = [],
    dataSource = [],
    rowKey = 'key',
    color = 'info',
    headZIndex,
    showHeader = true,
    sticky = true,
    tableLayout,
    itemHeight,
    scroll,
    wait = 0,
    overscan = 10,
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
  // virtual data
  const total = dataSource.length
  const showNum = scroll.y / itemHeight

  const [start, setStart] = useState(0)
  const { ColGroup } = useColumns({
    columns,
    bordered,
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  const list = useMemo(() => {
    const endIndex = start + showNum + overscan
    if (start <= overscan) {
      return dataSource.slice(start, endIndex)
    }
    return dataSource.slice(start - overscan, endIndex)
  }, [start, showNum])

  const { run: handleScroll } = useThrottleFn(
    (e) => {
      const top = e.target.scrollTop
      setStart(Math.floor(top / itemHeight))
    },
    {
      wait,
    },
  )

  useEventListener('scroll', handleScroll, {
    target: scrollRef,
  })

  return (
    <div
      ref={scrollRef}
      className={scrollBarCss}
      style={{ maxHeight: props.scroll?.y }}
    >
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
              virtual
              height={itemHeight}
              rowIndex={0}
              columns={columns}
              head
              id={useId()}
            />
          </thead>
        )}
        <tbody
          style={{
            height: total * itemHeight,
          }}
        >
          {list.map((data, rowIndex) => (
            <TableTr
              height={itemHeight}
              virtual
              style={{
                transform: `translateY(${
                  (start + rowIndex + 1) * itemHeight
                }px)`,
              }}
              rowIndex={rowIndex + 1}
              data={data}
              key={data?.[rowKey] ?? rowIndex}
              id={data?.[rowKey] ?? rowIndex}
              columns={columns}
            />
          ))}
        </tbody>
      </StyledTable>
    </div>
  )
}

export default VirtualTable
