/* eslint-disable @stylistic/function-paren-newline */
/* eslint-disable @stylistic/indent */
import React from 'react'
import { clsx } from 'clsx'
import { css } from '@pigment-css/react'
import {
  CheckEnum,
  DefaultData,
  ITableOperateParams,
  SortStatusEnum,
  TableProps,
} from '../types'
import TdItem from './Td'
import ThItem from './Th'

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

export const TableChildren: React.FC<{
  height?: number
  virtual?: boolean
  sortStatus?: SortStatusEnum
  column: TableProps['columns'][number]
  head: boolean
  colIndex: number
  rowIndex: number
  data?: DefaultData
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperateParams>>
}> = ({
  column,
  head,
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

  if (hidden || !(dataIndex || render)) {
    return null
  }

  const style: React.CSSProperties = {
    zIndex,
    width,
    height,
    left: column._left,
    right: column._right,
  }
  if (virtual) {
    style.flex = width ? `1 0 ${width}px` : 1
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

  const commonProps: any = {
    align,
    style,
    className: cl,
    colSpan,
    rowSpan,
  }
  if (head) {
    return (
      <ThItem
        {...commonProps}
        sorter={sorter}
        title={title}
        sortStatus={sortStatus}
        setOperaParams={setOperaParams}
        colIndex={colIndex}
      />
    )
  }
  return (
    <TdItem
      {...commonProps}
      render={render}
      column={column}
      data={data}
      colIndex={colIndex}
      rowIndex={rowIndex}
      dataIndex={dataIndex}
    />
  )
}

const virtualCls = css({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  alignItems: 'center',
})

const checkedCls = css(({ theme }) => ({
  '&:hover > td': {
    backgroundColor: `${theme.vars['primary-5']}!important`,
  },
  '& > td': {
    backgroundColor: `${theme.vars['primary-6']}!important`,
  },
}))

const halfCheckedCls = css(({ theme }) => ({
  position: 'relative',
  display: 'block',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: '#326bfb',
    border: '0',
    zIndex: 1,
    transform: 'translate(6.5px, -14px)',
    borderRadius: 1.5,
  },
}))

const disabledCls = css(({ theme }) => ({
  '& > td': {
    backgroundColor: `${theme.vars['info-6']}!important`,
    cursor: 'not-allowed',
  },
}))

export const TableTr: React.FC<{
  isNoneChecked?: boolean
  isAllChecked?: boolean
  updateCheckeboxByRowIndex?: (
    checkedStatus: CheckEnum,
    rowIndex: number,
  ) => void
  disabled?: boolean
  checkStatus?: CheckEnum
  height?: number
  virtual?: boolean
  style?: React.CSSProperties
  operaParams?: ITableOperateParams
  data?: DefaultData
  columns: TableProps['columns']
  head?: boolean
  rowIndex: number
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperateParams>>
}> = ({
  columns,
  rowIndex,
  head = false,
  data,
  setOperaParams,
  operaParams,
  style,
  virtual,
  height,
  checkStatus,
  updateCheckeboxByRowIndex,
  isNoneChecked,
  isAllChecked,
  disabled,
}) => {
  const cl = clsx({
    [virtualCls]: virtual,
    [checkedCls]: checkStatus === CheckEnum.on,
    [disabledCls]: disabled === true,
  })
  const commonProps: any = {
    type: 'checkbox',
    value: checkStatus,
    checked: head ? isAllChecked : checkStatus === CheckEnum.on,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (updateCheckeboxByRowIndex) {
        const value = e.target.value
        updateCheckeboxByRowIndex(
          value === CheckEnum.on ? CheckEnum.off : CheckEnum.on,
          rowIndex,
        )
      }
    },
    disabled: disabled || undefined,
  }
  const SelectInput = <input {...commonProps} />
  function renderSelect() {
    if (virtual || !updateCheckeboxByRowIndex) {
      return null
    }
    return head ? (
      <th>
        {SelectInput}
        {!(isNoneChecked || isAllChecked) && (
          <span className={halfCheckedCls} />
        )}
      </th>
    ) : (
      <td>{SelectInput}</td>
    )
  }
  return (
    <tr className={cl} style={style}>
      {renderSelect()}
      {columns.map((column, colIndex) => {
        return (
          <TableChildren
            height={height}
            virtual={virtual}
            sortStatus={operaParams?.sortStatusMap?.[colIndex]}
            setOperaParams={setOperaParams}
            data={data}
            key={column['key'] ?? column['dataIndex']}
            column={column}
            colIndex={colIndex}
            head={head}
            rowIndex={rowIndex}
          />
        )
      })}
    </tr>
  )
}
