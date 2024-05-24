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
  display: 'inline-flex',
  height: 14,
  '> input': {
    display: 'none',
  },
  '> span': {
    display: 'inline-block',
    width: 14,
    height: 14,
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
      left: 2,
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

const checkedCls = css(({ theme }) => ({
  '> input': {
    '&:checked+span': {
      backgroundColor: theme['primary'],
      borderColor: theme['primary'],
      '&::before': {
        opacity: 1,
      },
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
      top: 2,
      borderRadius: 1.5,
    },
  },
}))

const disabledCheckCls = css(({ theme }) => ({
  '> span': {
    borderColor: theme.vars['info-4'],
    cursor: 'not-allowed',
    backgroundColor: theme.vars['info-6'],
    '&::before': {
      backgroundColor: theme.vars['info-3'],
    },
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
        [checkedCls]: !indeterminate && !disabled,
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
