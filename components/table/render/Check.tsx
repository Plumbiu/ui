import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import { CheckEnum } from '../types'
import { ITableTr } from './types'

const wrapperCls = css(({ theme }) => ({
  '> input': {
    display: 'none',
    '&:checked+label': {
      backgroundColor: theme['primary'],
      borderColor: theme['primary'],
      '&::before': {
        opacity: 1,
      },
    },
  },
  '> label': {
    display: 'inline-block',
    width: 13,
    height: 13,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-2'],
    position: 'relative',
    cursor: 'pointer',
    transition: '0.2s',
    '&::before': {
      content: '" "',
      position: 'absolute',
      top: 3,
      left: 1.7,
      display: 'inline-block',
      opacity: 0,
      width: 8,
      height: 4,
      border: '2px solid #fff',
      borderTop: 'none',
      borderRight: 'none',
      transform: 'rotate(-45deg)',
    },
  },
}))

const halfCheckCls = css(({ theme }) => ({
  '> label': {
    '&::before': {
      backgroundColor: theme['primary'],
      transform: 'none',
      opacity: '1',
      border: 'none',
      height: 8,
      borderRadius: 1.5,
      top: 1.5,
    },
  },
}))

const disabledCheckCls = css(({ theme }) => ({
  '> label': {
    borderColor: theme.vars['info-4'],
    cursor: 'not-allowed',
    backgroundColor: theme.vars['info-6'],
  },
}))

export const CheckInput: React.FC<ITableTr> = ({
  checkStatus,
  isAllChecked,
  head,
  updateCheckeboxByRowIndex,
  rowIndex,
  disabled,
  id,
  isNoneChecked,
  virtual,
}) => {
  if (virtual || !updateCheckeboxByRowIndex) {
    return null
  }
  const commonProps: any = {
    type: 'checkbox',
    value: checkStatus,
    id,
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
    style: {
      margin: 0,
    },
  }

  const node = (
    <div
      className={clsx(wrapperCls, {
        [halfCheckCls]: head && !(isAllChecked || isNoneChecked),
        [disabledCheckCls]: disabled,
      })}
    >
      <input {...commonProps} />
      <label htmlFor={id} />
    </div>
  )
  return head ? <th>{node}</th> : <td>{node}</td>
}
