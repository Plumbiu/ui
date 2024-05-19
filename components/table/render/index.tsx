/* eslint-disable @stylistic/indent */
import React from 'react'
import { clsx } from 'clsx'
import { css } from '@pigment-css/react'
import {
  DefaultData,
  ITableOperateParams,
  SortStatusEnum,
  TableProps,
  TableSort,
} from '../types'
import TableAction, { SortAction } from './Action'

const virtualTdCls = css({
  display: 'flex',
  alignItems: 'center',
})

const shadowLeftCls = css({
  zIndex: 10,
  boxShadow: 'inset -10px 0 8px -8px rgba(5, 5, 5, 0.12)',
  transition: '0.3s',
})

const shadowRightCls = css({
  zIndex: 10,
  boxShadow: 'inset 10px 0 8px -8px rgba(5, 5, 5, 0.12)',
  transition: '0.3s',
})

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
  height?: number
  virtual?: boolean
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
  virtual,
  height,
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
    width,
  } = column

  if (hidden) {
    return null
  }

  if (!dataIndex && !render) {
    return null
  }
  const style: React.CSSProperties = { zIndex, width, height }
  if (column._left !== undefined) {
    style.left = column._left
  } else if (column._right !== undefined) {
    style.right = column._right
  }

  if (virtual) {
    if (width) {
      style.flex = `0 0 ${width}px`
    } else {
      style.flex = 1
    }
  }

  const cl =
    clsx([
      {
        className: !!className,
        _td_fixed: !!fixed,
        _td_hl:
          sortStatus !== undefined && sortStatus !== SortStatusEnum.origin,
        [shadowLeftCls]: column._shadow && fixed === 'left',
        [shadowRightCls]: column._shadow && fixed === 'right',
        [virtualTdCls]: virtual,
      },
    ]) || undefined

  const renderNode = () => {
    if (isHead) {
      if (!sorter) {
        return title
      }
      const sortNode = <SortAction sortStatus={sortStatus} />
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

const virtualCls = css({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  alignItems: 'center',
})

export const TableTr: React.FC<{
  height?: number
  virtual?: boolean
  style?: React.CSSProperties
  operaParams?: ITableOperateParams
  data?: DefaultData
  columns: TableProps['columns']
  isHead?: boolean
  rowIndex: number
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperateParams>>
}> = ({
  columns,
  rowIndex,
  isHead = false,
  data,
  setOperaParams,
  operaParams,
  style,
  virtual,
  height,
}) => {
  const cl = virtual ? virtualCls : undefined
  return (
    <tr className={cl} style={style}>
      {columns.map((column, colIndex) => {
        return (
          <TableTd
            height={height}
            virtual={virtual}
            sortStatus={operaParams?.sortStatusMap?.[colIndex]}
            setOperaParams={setOperaParams}
            data={data}
            key={column['key'] ?? column['dataIndex']}
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
