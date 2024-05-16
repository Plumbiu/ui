import React from 'react'
import clsx from 'clsx'
import { fcb } from '../_styles/css'
import { DefaultData, ITableOperaParams, TableProps } from './types'

export const TableTd: React.FC<{
  isHighlight?: boolean
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
  setOperaParams?: React.Dispatch<
    React.SetStateAction<ITableOperaParams>
  >
}> = React.memo(
  (props) => {
    const { column, isHead, colIndex, rowIndex, data, setOperaParams, isHighlight } = props

    const {
      align,
      title,
      render,
      hidden,
      dataIndex,
      fixed,
      className,
      zIndex = 10,
      colSpan,
      rowSpan,
      sorter,
      filter,
    } = column

    if (hidden) {
      return null
    }

    if (!dataIndex && !render) {
      return null
    }

    const style: React.CSSProperties = { zIndex }
    if (column._left !== undefined) {
      style.left = column._left
    } else if (column._right !== undefined) {
      style.right = column._right
    }

    const cl =
      clsx([
        {
          className: !!className,
          _td_fixed: !!fixed,
          _td_hl: !!isHighlight,
          _shadow: column._shadow && fixed === 'left',
          _shadow_right: column._shadow && fixed === 'right',
        },
      ]) || undefined

    const sortFn = (isDesc = false) => {
      if (sorter) {
        setOperaParams?.(({ hlColIndexSet: hightlightColIndex }) => ({
          sorter: isDesc ? (a, b) => -sorter(a, b) : sorter,
          hlColIndexSet: hightlightColIndex?.add(colIndex),
        }))
      }
    }

    function renderTd() {
      if (isHead) {
        if (!sorter && !filter) {
          return title
        }
        if (sorter) {
          return (
            <div className={fcb}>
              {title}
              <div>
                <div onClick={() => sortFn()}>上</div>
                <div
                  onClick={() => {
                    sortFn(true)
                  }}
                >
                  下
                </div>
              </div>
            </div>
          )
        }
      }
      if (render) {
        return render(data, column, rowIndex, colIndex)
      }
      if (!dataIndex) {
        return null
      }
      return data?.[dataIndex]
    }
    return (
      <td
        align={align}
        style={style}
        className={cl}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {renderTd()}
      </td>
    )
  },
  (prevProps, nextProps) => {
    const { column } = prevProps
    if (prevProps.isHighlight !== nextProps.isHighlight) {
      return false
    }
    if (typeof column.render === 'function') {
      return false
    }
    if (!column.fixed) {
      return true
    }
    return false
  },
)

export const TableTr: React.FC<{
  hlColIndexSet?: Set<number>
  data?: DefaultData
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
  rowIndex: number
  setOperaParams?: React.Dispatch<
    React.SetStateAction<ITableOperaParams>
  >
}> = ({ columns, rowKey, rowIndex, isHead = false, data, setOperaParams, hlColIndexSet }) => {
  return (
    <tr>
      {columns.map((column, colIndex) => {
        return (
          <TableTd
            isHighlight={hlColIndexSet?.has(colIndex)}
            setOperaParams={setOperaParams}
            data={data}
            key={column[rowKey]}
            column={column}
            colIndex={colIndex}
            isHead={isHead}
            rowIndex={rowIndex}
          />
        )
      })}
    </tr>
  )
}
