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

const SIZE = 16
const BEFORE_WIDTH = 9
const BEFORE_HEIGHT = 5
const BORDER_SIZE = 2

const wrapperCls = css(({ theme }) => ({
  display: 'inline-flex',
  height: SIZE,
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
    width: SIZE,
    height: SIZE,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-3'],
    position: 'relative',
    cursor: 'pointer',
    transition: '0.2s',
    '&::before': {
      content: '" "',
      position: 'absolute',
      top: (SIZE - BEFORE_HEIGHT - BORDER_SIZE) / 2 - 1,
      left: (SIZE - BEFORE_WIDTH - BORDER_SIZE) / 2,
      display: 'inline-block',
      opacity: 0,
      width: BEFORE_WIDTH,
      height: BEFORE_HEIGHT,
      borderWidth: BORDER_SIZE,
      borderStyle: 'solid',
      borderColor: '#fff',
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
      height: BEFORE_WIDTH,
      top: (SIZE - BEFORE_WIDTH - BORDER_SIZE) / 2,
      borderRadius: BORDER_SIZE,
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
