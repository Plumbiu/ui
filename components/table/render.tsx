import React from 'react'
import clsx from 'clsx'
import { fcb } from '../_styles/css'
import {
  DefaultData,
  ITableOperaParams,
  SortStatusEnum,
  TableProps,
} from './types'
import { IconWrap } from '../icon'
import { UpIcon, DownIcon } from './icons'
import { css } from '@pigment-css/react'

const tableActionCls = css({
  '& > span': {
    display: 'flex',
  },
})

export const TableTd: React.FC<{
  sortStatus?: SortStatusEnum
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperaParams>>
}> = (props) => {
  const {
    column,
    isHead,
    colIndex,
    rowIndex,
    data,
    setOperaParams,
    sortStatus,
  } = props

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
        _td_hl:
          sortStatus !== undefined && sortStatus !== SortStatusEnum.origin,
        _shadow: column._shadow && fixed === 'left',
        _shadow_right: column._shadow && fixed === 'right',
      },
    ]) || undefined

  const sortFn = () => {
    if (sorter) {
      setOperaParams?.(({ sortStatusMap }) => {
        let sortStatus = sortStatusMap?.[colIndex]
        if (sortStatus === undefined || sortStatus === SortStatusEnum.origin) {
          sortStatus = SortStatusEnum.ascend
        } else if (sortStatus === SortStatusEnum.ascend) {
          sortStatus = SortStatusEnum.descend
        } else {
          sortStatus = SortStatusEnum.origin
        }
        sortStatusMap[colIndex] = sortStatus

        return {
          sorter:
            sortStatus === SortStatusEnum.origin
              ? undefined
              : sortStatus === SortStatusEnum.descend
              ? sorter
              : (a: any, b: any) => -sorter(a, b),
          sortStatusMap,
        }
      })
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
            <div className={tableActionCls}>
              <IconWrap
                color={
                  sortStatus === SortStatusEnum.ascend ? 'primary' : undefined
                }
                size="sm"
              >
                <UpIcon />
              </IconWrap>
              <IconWrap
                color={
                  sortStatus === SortStatusEnum.descend ? 'primary' : undefined
                }
                size="sm"
              >
                <DownIcon />
              </IconWrap>
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
      onClick={() => sortFn()}
      align={align}
      style={style}
      className={cl}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {renderTd()}
    </td>
  )
}

export const TableTr: React.FC<{
  operaParams: ITableOperaParams
  data?: DefaultData
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
  rowIndex: number
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperaParams>>
}> = ({
  columns,
  rowKey,
  rowIndex,
  isHead = false,
  data,
  setOperaParams,
  operaParams,
}) => {
  return (
    <tr>
      {columns.map((column, colIndex) => {
        return (
          <TableTd
            sortStatus={operaParams?.sortStatusMap?.[colIndex]}
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
