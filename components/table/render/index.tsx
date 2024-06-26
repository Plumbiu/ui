import React, { Fragment, useContext } from 'react'
import { clsx } from 'clsx'
import { css } from '@pigment-css/react'
import { CheckEnum, TableProps } from '../types'
import { TableContext } from '../context'
import TdItem from './Td'
import ThItem from './Th'
import { ITableTr } from './types'
import { CheckInput } from './Check'

const virtualTdCls = css({
  display: 'flex',
  alignItems: 'center',
})

const shadowLeftCls = css({
  boxShadow: 'inset -10px 0 8px -8px rgba(5, 5, 5, 0.12)',
})

const shadowRightCls = css({
  boxShadow: 'inset 10px 0 8px -8px rgba(5, 5, 5, 0.12)',
})

export const TableChildren: React.FC<
  ITableTr & {
    column: TableProps['columns'][number]
    colIndex: number
  }
> = (props) => {
  const { column, head, colIndex, data, virtual, height } = props
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
  const { setOperaParams, operaParams } = useContext(TableContext)!
  const sortStatus = operaParams?.sortStatusMap?.[colIndex]

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
  const commonProps: any = {
    align,
    style,
    className:
      clsx([
        {
          className: !!className,
          _td_fixed: !!fixed,
          [shadowLeftCls]: column._shadow && fixed === 'left',
          [shadowRightCls]: column._shadow && fixed === 'right',
          [virtualTdCls]: virtual,
        },
      ]) || undefined,
    colSpan: head ? column._colspan : colspan,
    rowSpan: head ? column._rowspan : rowspan,
  }

  if (head) {
    return (
      <ThItem
        {...commonProps}
        sorter={sorter}
        colIndex={colIndex}
        title={title}
        sortStatus={sortStatus}
        setOperaParams={setOperaParams}
      />
    )
  }

  return (
    <Fragment>
      {colIndex === 0 && <CheckInput {...props} />}
      <TdItem
        {...commonProps}
        render={render}
        column={column}
        data={data}
        dataIndex={dataIndex}
      />
    </Fragment>
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

  const node = (
    <tr className={cl} style={style}>
      {head && rowIndex === 0 && <CheckInput {...props} />}
      {columns.map((column, colIndex) => {
        return (
          <TableChildren
            {...props}
            colIndex={colIndex}
            column={column}
            key={column['key'] ?? column['dataIndex'] ?? column['title']}
          />
        )
      })}
    </tr>
  )
  return node
}
