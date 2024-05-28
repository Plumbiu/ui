import { css } from '@pigment-css/react'
import { useEffect, useState } from 'react'
import Checkbox, { CheckboxChangeEvent } from '.'

type StrOrNum = string | number

export interface CheckboxGroupProps {
  defalutValue?: StrOrNum[]
  disabled?: boolean
  name?: string
  options?: StrOrNum[]
  value?: StrOrNum[]
  onChange?: (a: any[]) => void
}

const groupCls = css({
  '&>label+label': {
    marginLeft: 8,
  },
})

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    defalutValue,
    disabled,
    name,
    value,
    onChange: customOnChange,
  } = props
  const defaultArr = value || defalutValue || []
  const [checkedArr, setCheckedArr] =
    useState<(StrOrNum | undefined)[]>(defaultArr)

  function onChange(e: CheckboxChangeEvent, idx: number) {
    if (!customOnChange || checkedArr.length === 0) {
      return
    }
    const value = e.target.value
    if (value == null || typeof value === 'object') {
      return
    }
    const checked = e.target.checked
    if (checked) {
      checkedArr[idx] = value
    } else {
      checkedArr[idx] = undefined
    }
    setCheckedArr(checkedArr.filter(Boolean))
  }
  useEffect(() => {
    if (checkedArr && customOnChange) {
      console.log(checkedArr)
      customOnChange(checkedArr)
    }
  }, [checkedArr])

  return (
    <div className={groupCls}>
      {props.options?.map((val, idx) => {
        return (
          <Checkbox
            checked={defaultArr.includes(val)}
            key={val}
            value={val}
            name={name}
            disabled={disabled}
            onChange={(e) => onChange(e, idx)}
          >
            {val}
          </Checkbox>
        )
      })}
    </div>
  )
}

export default CheckboxGroup
