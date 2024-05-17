import React from 'react'
import clsx from 'clsx'
import {
  DefaultData,
  ITableOperateParams,
  SortStatusEnum,
  TableProps,
  TableSort,
} from '../types'
import TableAction, { SortAction } from './Action'

function handleSort(
  params: ITableOperateParams,
  sorter: TableSort,
  colIndex: number,
) {
  const { sortStatusMap } = params
  let sortStatus = sortStatusMap?.[colIndex]
  if (sortStatus === undefined || sortStatus === SortStatusEnum.origin) {
    sortStatus = SortStatusEnum.ascend
  } else if (sortStatus === SortStatusEnum.ascend) {
    sortStatus = SortStatusEnum.descend
  } else {
    sortStatus = SortStatusEnum.origin
  }
  if (sortStatusMap) {
    sortStatusMap[colIndex] = sortStatus
  }

  return {
    ...params,
    sorter:
      sortStatus === SortStatusEnum.origin
        ? undefined
        : sortStatus === SortStatusEnum.descend
        ? sorter
        : (a: any, b: any) => -sorter!(a, b),
    sortStatusMap,
  }
}

export const TableTd: React.FC<{
  sortStatus?: SortStatusEnum
  column: TableProps['columns'][number]
  isHead: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperateParams>>
}> = ({
  column,
  isHead,
  colIndex,
  rowIndex,
  data,
  setOperaParams,
  sortStatus,
}) => {
  const {
    align,
    title,
    render,
    hidden,
    dataIndex,
    fixed,
    className,
    zIndex,
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

  const renderNode = () => {
    if (isHead) {
      if (!sorter && !filter) {
        return title
      }
      const sortNode = sorter ? <SortAction sortStatus={sortStatus} /> : null
      return <TableAction sortNode={sortNode} title={title} />
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
      onClick={() => {
        if (!sorter) {
          return
        }
        setOperaParams?.((prevProps) => handleSort(prevProps, sorter, colIndex))
      }}
      align={align}
      style={style}
      className={cl}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {renderNode()}
    </td>
  )
}

export const TableTr: React.FC<{
  operaParams: ITableOperateParams
  data?: DefaultData
  columns: TableProps['columns']
  rowKey: string
  isHead?: boolean
  rowIndex: number
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperateParams>>
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
