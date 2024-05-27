import { css } from '@pigment-css/react'
import { clsx } from 'clsx'

// copyed https://github.com/react-component/checkbox/blob/master/LICENSE.md
interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent<HTMLInputElement>['nativeEvent']
}

interface CheckboxChangeEventTarget extends RadioProps {
  checked: boolean
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  indeterminate?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
}
const SIZE = 16
const BEFORE_SIZE = 8

const wrapperCls = css(({ theme }) => ({
  display: 'inline-flex',
  height: SIZE,
  '> input': {
    display: 'none',
    '&:checked+span': {
      borderWidth: 5,
      borderColor: theme['primary'],
    },
  },
  '> span': {
    display: 'inline-block',
    position: 'relative',
    width: SIZE,
    height: SIZE,
    borderRadius: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-3'],
    cursor: 'pointer',
    transition: '0.2s',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: (SIZE - BEFORE_SIZE) / 2 - 1,
      left: (SIZE - BEFORE_SIZE) / 2 - 1,
      backgroundColor: 'transparent',
      borderRadius: '50%',
      width: BEFORE_SIZE,
      height: BEFORE_SIZE,
    },
  },
}))

const disabledCheckCls = css(({ theme }) => ({
  '> input:checked+span': {
    borderWidth: 1,
    borderColor: theme.vars['info-3'],
    '&::before': {
      backgroundColor: theme.vars['info-3'],
    },
  },
  '> span': {
    cursor: 'not-allowed',
    backgroundColor: theme.vars['info-6'],
  },
}))

const Radio: React.FC<RadioProps> = (props) => {
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
        [disabledCheckCls]: disabled,
      })}
    >
      <input
        type="radio"
        {...restProps}
        disabled={disabled}
        onChange={handleChange}
      />
      <span />
      {children}
    </label>
  )
}

export default Radio
