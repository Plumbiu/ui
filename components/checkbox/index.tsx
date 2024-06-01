import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import CheckboxGroup from './group'

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
  boxSizing: 'border-box',
  alignItems: 'center',
  gap: 4,
  fontSize: 14,
  height: 16,
  '> input': {
    display: 'none',
    '&:checked+span': {
      backgroundColor: theme['blue-4'],
      borderColor: theme['blue-4'],
      '&::before': {
        opacity: 1,
        width: 9,
        height: 5,
        borderWidth: 2,
        top: 3.25,
        left: 2.75,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderTop: 'none',
        borderRight: 'none',
        transform: 'rotate(-45deg)',
      },
    },
  },
  '> span': {
    display: 'inline-block',
    boxSizing: 'border-box',
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-3'],
    position: 'relative',
    cursor: 'pointer',
    transition: '0.2s',
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      opacity: 0,
    },
  },
}))

const halfCheckCls = css(({ theme }) => ({
  '> span': {
    '&::before': {
      backgroundColor: theme['blue-4'],
      transform: 'none',
      opacity: 1,
      border: 'none',
      height: '60%',
      width: '60%',
      top: '20%',
      left: '20%',
      borderRadius: 2,
    },
  },
}))

const disabledCheckCls = css(({ theme }) => ({
  '>input:checked+span': {
    backgroundColor: `${theme.vars['info-6']}`,
    borderColor: `${theme.vars['info-4']}`,
    '&::before': {
      opacity: 1,
      borderColor: theme.vars['info-2'],
      backgroundColor: theme.vars['info-6'],
    },
  },
  '> span': {
    borderColor: theme.vars['info-4'],
    cursor: 'not-allowed',
    backgroundColor: theme.vars['info-6'],
    '&::before': {
      backgroundColor: theme.vars['info-3'],
    },
  },
}))

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
