import { css } from '@pigment-css/react'
import { clsx } from 'clsx'

// copyed https://github.com/react-component/checkbox/blob/master/LICENSE.md
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent<HTMLInputElement>['nativeEvent']
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean
}

export interface CheckboxRef {
  focus: (options?: FocusOptions) => void
  blur: () => void
  input: HTMLInputElement | null
  nativeElement: HTMLElement | null
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  indeterminate?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
}
const wrapperCls = css(({ theme }) => ({
  '> input': {
    display: 'none',
    '&:checked+span': {
      backgroundColor: theme['primary'],
      borderColor: theme['primary'],
      '&::before': {
        opacity: 1,
      },
    },
  },
  '> span': {
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
  '> span': {
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
  '> span': {
    borderColor: theme.vars['info-4'],
    cursor: 'not-allowed',
    backgroundColor: theme.vars['info-6'],
  },
}))

const Checkbox: React.FC<CheckboxProps> = (props) => {
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
        [halfCheckCls]: indeterminate,
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

export default Checkbox
