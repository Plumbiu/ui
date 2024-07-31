import { css, styled } from '@pigment-css/react'
import React, { useMemo, useRef, useState } from 'react'
import { clsx } from 'clsx'
import {
  IconoirEye,
  IconoirEyeClosed,
  MaterialSymbolsCloseSmallOutlineRounded,
} from './icons'
import { EventKey, InputChangeEvent, InputProps, InputProxy } from './types'
import { fcc_inline } from '@/_utils/styles'
import { IconWrap } from '@/icon'
import { useMounted } from '@/_utils/hooks'
import { inputDisabledCls, inputWrapperCls } from '@/_utils/styles/input'

const focusStyle = css(({ theme }) => ({
  '&:hover,&:focus-within': {
    borderColor: theme['blue-4'],
  },
  '&:focus-within': {
    boxShadow: `0 0 0 3px ${theme.vars['primary-6']}`,
  },
}))

const StyledInputWrapper = styled('div')<InputProps>(({ theme }) => {
  return {
    borderRadius: 4,
    '& > div': {
      margin: '0 auto',
      whiteSpace: 'nowrap',
      '&:first-child': {
        paddingLeft: 12,
      },
      '&:last-child': {
        paddingRight: 12,
      },
    },
  }
})

const addonCls = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  paddingRight: 12,
  paddingLeft: 12,
  backgroundColor: theme.vars['background-2'],
  '&:first-child': {
    borderRight: `1px solid ${theme.vars['info-4']}`,
  },
  '&:last-child': {
    borderLeft: `1px solid ${theme.vars['info-4']}`,
  },
}))

const StyledInput = styled('input')<InputProps>(({ theme }) => {
  return {
    position: 'relative',
    outline: 'none',
    border: 'none',
    width: '100%',
    height: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'transparent',
    color: theme.vars['text-1'],
    '&::placeholder': {
      color: theme.vars['text-4'],
    },
  }
})

const closeCls = css(({ theme }) => ({
  marginRight: 6,
  backgroundColor: theme.vars['info-3'],
  aspectRatio: 1,
  color: '#fff',
}))

const lengthCls = css(({ theme }) => ({
  color: theme.vars['info-3'],
}))

const Input: React.FC<InputProps> = (props) => {
  const {
    disabled = false,
    prefix,
    suffix,
    afterNode,
    beforeNode,
    allowClear,
    onChange,
    value,
    defaultValue,
    maxLength,
    type: customType = 'text',
    onFocus,
    ...restProps
  } = props

  const hasLimit = typeof maxLength === 'number'
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(defaultValue ?? '')
  const [type, setType] = useState(customType)
  const mounted = useMounted()

  const proxy = useMemo(() => {
    if (!inputRef.current || !mounted) {
      return
    }
    const proxyRef = new Proxy<InputProxy>(inputRef.current, {
      get(target, p) {
        return Reflect.get(target, p)
      },
      set(target, p, newValue) {
        if (p === EventKey) {
          let value = newValue.target.value ?? ''
          if (hasLimit && value.length > maxLength) {
            return false
          }
          let event = newValue
          if (newValue.type === 'click') {
            event = Object.create(newValue, {
              target: { value: inputRef.current },
              currentTarget: { value: inputRef.current },
            })
          }
          setInputValue(value)
          inputRef!.current!.value = value
          onChange?.(event as InputChangeEvent)
          return true
        }
        return false
      },
    })
    return proxyRef
  }, [inputRef.current, mounted])

  const handleChange = (
    e: InputChangeEvent | React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    if (!proxy) {
      return
    }
    if (e.type === 'click' || onChange) {
      proxy[EventKey] = e
    }
  }

  const focus = (e?: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e) {
      onFocus?.(e)
    }
    if (inputRef.current && maxLength) {
      inputRef.current.selectionEnd = inputValue.length
      setTimeout(() => {
        inputRef.current!.focus()
      })
    }
  }

  const handleTypeChange = () => {
    setType(type === 'password' ? 'text' : 'password')
    focus()
  }

  return (
    <StyledInputWrapper
      className={clsx(inputWrapperCls, {
        [inputDisabledCls]: disabled,
        [focusStyle]: !disabled,
      })}
    >
      {!!beforeNode && <div className={addonCls}>{beforeNode}</div>}
      {!!prefix && <div>{prefix}</div>}
      <StyledInput
        type={type}
        ref={inputRef}
        className={fcc_inline}
        disabled={disabled}
        onChange={handleChange}
        maxLength={maxLength}
        style={{ cursor: disabled ? 'not-allowed' : undefined }}
        onFocus={focus}
        {...restProps}
      />
      {allowClear && (
        <IconWrap
          style={{
            visibility: inputValue === '' ? 'hidden' : undefined,
          }}
          className={closeCls}
          onClick={handleChange}
          color="info"
          hoverBg
        >
          <MaterialSymbolsCloseSmallOutlineRounded />
        </IconWrap>
      )}
      {typeof maxLength === 'number' && (
        <div className={lengthCls}>
          {inputValue.length}/{maxLength}
        </div>
      )}
      {customType === 'password' && (
        <IconWrap
          hover
          color="info"
          style={{ marginRight: 8 }}
          onClick={handleTypeChange}
        >
          {type === 'password' ? <IconoirEyeClosed /> : <IconoirEye />}
        </IconWrap>
      )}
      {!!afterNode && <div className={addonCls}>{afterNode}</div>}
      {!!suffix && <div>{suffix}</div>}
    </StyledInputWrapper>
  )
}

export default Input

export type { InputChangeEvent, RowInputProps, InputProps } from './types'
