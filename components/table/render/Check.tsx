import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import { CheckEnum } from '../types'
import { ITableTr } from './types'

const halfCheckedCls = css(({ theme }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 2.5,
    left: 2.5,
    width: 8,
    height: 8,
    border: '0',
    zIndex: '1',
    borderRadius: 1.5,
    backgroundColor: theme['primary'],
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
      className={clsx({
        [halfCheckedCls]: head && !(isNoneChecked || isAllChecked),
      })}
    >
      <input {...commonProps} />
      <label htmlFor={id} />
    </div>
  )
  return head ? <th>{node}</th> : <td>{node}</td>
}
