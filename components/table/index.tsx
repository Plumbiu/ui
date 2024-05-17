import { css } from '@pigment-css/react'
import { TableTr } from './render'
import { StyledFooter, StyledTable } from './styles'
import { TableProps } from './types'
import { overflowAutoCss } from '../_styles/css'
import React, { useMemo, useRef, useState } from 'react'
import useColumns from './hooks/columns'
import useOperate from './hooks/operate'
import usePagination from './hooks/pagination'
import { useEventListener } from 'ahooks'

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
                rowKey={rowKey}
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
                rowKey={rowKey}
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

export const VirtualTable: React.FC<
  TableProps & {
    itemHeight?: number
    scroll: {
      x?: number
      y: number
    }
  }
> = (props) => {
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
    pageSize = 15,
    pageCount = 8,
    pagination = false,
    itemHeight = 50,
    scroll,
    ...restProps
  } = props

  const totalHeight = dataSource.length * itemHeight

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

  const showListNum = useMemo(() => Math.ceil(scroll.y / itemHeight), [])
  const wrapperRef = useRef(null)
  const [list, setList] = useState(dataSource.slice(0, showListNum))

  useEventListener(
    'scroll',
    (e) => {
      const top = e.target.scrollTop
      const start = Math.ceil(top / scroll.y)
      setList(dataSource.slice(start, start + showListNum))
      console.log(e.target.scrollTop)
    },
    {
      target: wrapperRef,
    },
  )
  return (
    <div
      style={{
        position: 'relative',
      }}
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
          <thead>
            <TableTr rowIndex={0} columns={columns} rowKey={rowKey} isHead />
          </thead>
        )}
      </StyledTable>
      <div style={{ height: props.scroll?.y }} className={overflowAutoCss}>
        <div>
          <StyledTable
            ref={wrapperRef}
            style={{
              width: props.scroll?.x,
              zIndex: 998,
              position: 'absolute',
              overflow: 'auto',
            }}
            {...tableProps}
          >
            {ColGroup}
            <tbody>
              {list.map((item, rowIndex) => (
                <TableTr
                  height={itemHeight}
                  rowIndex={rowIndex + 1}
                  data={item}
                  key={item[rowKey]}
                  columns={columns}
                  rowKey={rowKey}
                />
              ))}
            </tbody>
          </StyledTable>
          <div
            style={{
              height: totalHeight,
            }}
            className={overflowAutoCss}
          />
        </div>
      </div>
    </div>
  )
}

export default Table

export type { TableColumnTypes, TableProps } from './types'
