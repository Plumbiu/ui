import { CheckEnum } from '../types'
import { ITableTr } from './types'
import Checkbox, { CheckboxProps } from '@/checkbox'

export const CheckInput: React.FC<ITableTr> = ({
  checkStatus,
  isAllChecked,
  head,
  updateCheckeboxByRowIndex,
  rowIndex,
  disabled,
  isNoneChecked,
  virtual,
}) => {
  if (virtual || !updateCheckeboxByRowIndex) {
    return null
  }
  const commonProps: CheckboxProps = {
    value: checkStatus,
    checked: head ? isAllChecked : checkStatus === CheckEnum.on,
    disabled,
    indeterminate: head && !(isAllChecked || isNoneChecked),
    onChange: (e) => {
      if (updateCheckeboxByRowIndex) {
        const value = e.target.value
        updateCheckeboxByRowIndex(
          value === CheckEnum.on ? CheckEnum.off : CheckEnum.on,
          rowIndex,
        )
      }
    },
  }
  const checkNode = <Checkbox {...commonProps} />

  return head ? <th>{checkNode}</th> : <td>{checkNode}</td>
}
