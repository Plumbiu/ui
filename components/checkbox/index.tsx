import { clsx } from 'clsx'
import CheckboxGroup from './group'
import { CheckboxProps } from './types'
import { wrapperCls, halfCheckCls, disabledCheckCls } from './styles'

const Checkbox: React.FC<CheckboxProps> & {
  Group: typeof CheckboxGroup
} = (props) => {
  const { indeterminate, children, disabled, onChange, ...restProps } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }

    onChange?.({
      target: {
        ...props,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation()
      },
      preventDefault() {
        e.preventDefault()
      },
      nativeEvent: e.nativeEvent,
    })
  }
  return (
    <label
      className={clsx(wrapperCls, {
        [halfCheckCls]: !props.checked && indeterminate,
        [disabledCheckCls]: disabled,
      })}
    >
      <input
        type="checkbox"
        {...restProps}
        disabled={disabled}
        onChange={handleChange}
      />
      <span />
      {children}
    </label>
  )
}

Checkbox.Group = CheckboxGroup

export default Checkbox
