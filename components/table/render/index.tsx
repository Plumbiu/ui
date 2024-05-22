import React from 'react'
import { clsx } from 'clsx'
import { css } from '@pigment-css/react'
import { CheckEnum, SortStatusEnum, TableProps } from '../types'
import TdItem from './Td'
import ThItem from './Th'
import { ITableTr } from './types'
import { CheckInput } from './Check'

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

export const TableChildren: React.FC<ITableTr & {
  sortStatus?: SortStatusEnum
  column: TableProps['columns'][number]
  colIndex: number
}> = (props) => {
  const {
    column,
    head,
    colIndex,
    rowIndex,
    data,
    setOperaParams,
    sortStatus,
    virtual,
    height,
  } = props
  const {
    align,
    title,
    render,
    hidden,
    dataIndex,
    fixed,
    className,
    zIndex,
    colspan,
    rowspan,
    sorter,
    width,
  } = column

  if (hidden) {
    return null
  }
  if (!(head || dataIndex || render)) {
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
        [shadowLeftCls]: column._shadow && fixed === 'left',
        [shadowRightCls]: column._shadow && fixed === 'right',
        [virtualTdCls]: virtual,
      },
    ]) || undefined

  const commonProps: any = {
    align,
    style,
    className: cl,
    colspan,
    rowspan,
  }
  if (head) {
    return (
      <ThItem
        {...commonProps}
        colspan={column._colspan || undefined}
        rowspan={column._rowspan || undefined}
        sorter={sorter}
        title={title}
        sortStatus={sortStatus}
        setOperaParams={setOperaParams}
        colIndex={colIndex}
      />
    )
  }

  return (
    <>
      {colIndex === 0 && <CheckInput {...props} />}
      <TdItem
        {...commonProps}
        render={render}
        column={column}
        data={data}
        colIndex={colIndex}
        rowIndex={rowIndex}
        dataIndex={dataIndex}
      />
    </>
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

const disabledCls = css(({ theme }) => ({
  '& > td': {
    backgroundColor: `${theme.vars['info-6']}!important`,
    cursor: 'not-allowed',
  },
}))

export const TableTr: React.FC<ITableTr> = (props) => {
  const {
    columns,
    rowIndex,
    head = false,
    operaParams,
    style,
    virtual,
    checkStatus,
    disabled,
  } = props
  const cl = clsx({
    [virtualCls]: virtual,
    [checkedCls]: checkStatus === CheckEnum.on,
    [disabledCls]: disabled === true,
  })

  return (
    <tr className={cl} style={style}>
      {head && rowIndex === 0 && <CheckInput {...props} />}
      {columns.map((column, colIndex) => (
        <TableChildren
          {...props}
          colIndex={colIndex}
          column={column}
          sortStatus={operaParams?.sortStatusMap?.[colIndex]}
          key={column['key'] ?? column['dataIndex']}
        />
      ))}
    </tr>
  )
}
