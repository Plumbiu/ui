import { css } from '@pigment-css/react'
import { TableTr } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps, VirtualTableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import React, { useMemo, useRef, useState } from 'react'
import useColumns from './hooks/columns'
import useOperate from './hooks/operate'
import usePagination from './hooks/pagination'
import { useEventListener, useThrottleFn } from 'ahooks'
import '@pigment-css/react/styles.css'

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
    pageSize = 15,
    pageCount = 8,
    pagination = false,
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
  const [current, setCurrent] = useState(1)

  const { operaParams, setOperaParams, mergedDataSource } = useOperate({
    dataSource,
    setCurrent,
  })

  const { splitData, Pagintaion } = usePagination({
    pageSize,
    dataSource: mergedDataSource,
    pagination,
    total: mergedDataSource.length,
    pageCount,
    current,
    setCurrent,
  })

  return (
    <div>
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
                isHead
              />
            </thead>
          )}
          <tbody>
            {splitData.map((data, rowIndex) => (
              <TableTr
                operaParams={operaParams}
                rowIndex={rowIndex + 1}
                data={data}
                key={data?.[rowKey] ?? rowIndex}
                columns={columns}
              />
            ))}
          </tbody>
        </StyledTable>
        {!!footer && <StyledFooter color={color}>{footer}</StyledFooter>}
      </div>
      {Pagintaion}
    </div>
  )
}

export const VirtualTable: React.FC<VirtualTableProps> = (props) => {
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
    wait = 150,
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
    const endIndex = start + showNum + 2
    if (start < 3) {
      return dataSource.slice(start, endIndex)
    }
    return dataSource.slice(start - 3, endIndex)
  }, [start, showNum])

  const { run: handleScroll } = useThrottleFn(
    (e) => {
      const top = e.target.scrollTop
      console.log(top)
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
      className={overflowAutoCss}
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
              isHead
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
              columns={columns}
            />
          ))}
        </tbody>
      </StyledTable>
    </div>
  )
}

export default Table

export type { TableColumnTypes, TableProps } from './types'
