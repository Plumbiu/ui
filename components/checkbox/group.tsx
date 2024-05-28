import { css } from '@pigment-css/react'
import { useEffect, useState } from 'react'
import Checkbox, { CheckboxChangeEvent } from '.'

type StrOrNum = string | number

export interface CheckboxGroupProps {
  defalutValue?: StrOrNum[]
  disabled?: boolean
  name?: string
  options: StrOrNum[]
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
  const [checkArr, setCheckArr] = useState<(StrOrNum | undefined)[]>(defaultArr)

  function onChange(e: CheckboxChangeEvent) {
    if (!customOnChange || checkArr.length === 0) {
      return
    }
    const value = e.target.value
    if (value == null || typeof value === 'object') {
      return
    }
    const checked = e.target.checked
    if (checked) {
      checkArr.push(value)
      setCheckArr([...checkArr])
    } else {
      setCheckArr(checkArr.filter((item) => item !== value))
    }
  }
  useEffect(() => {
    if (checkArr && customOnChange) {
      customOnChange(
        checkArr.sort((a, b) => {
          const aIdx = props.options?.findIndex((item) => item == a)
          const bIdx = props.options?.findIndex((item) => item == b)
          return aIdx - bIdx
        }),
      )
    }
  }, [checkArr])

  return (
    <div className={groupCls}>
      {props.options.map((val) => {
        return (
          <Checkbox
            checked={defaultArr.includes(val)}
            key={val}
            value={val}
            name={name}
            disabled={disabled}
            onChange={onChange}
          >
            {val}
          </Checkbox>
        )
      })}
    </div>
  )
}

export default CheckboxGroup
