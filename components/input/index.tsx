import { css, styled } from '@pigment-css/react'
import React, { useMemo, useRef, useState } from 'react'
import {
  IconoirEye,
  IconoirEyeClosed,
  MaterialSymbolsCloseSmallOutlineRounded,
} from './icons'
import {
  EventKey,
  InputChangeEvent,
  InputProps,
  InputProxy,
  status,
} from './types'
import { fcc_inline } from '@/_utils/styles'
import { IconWrap } from '@/icon'
import { useMounted } from '@/_utils/hooks'

const StyledInputWrapper = styled('div')<InputProps>(({ theme }) => {
  return {
    position: 'relative',
    display: 'inline-flex',
    color: theme.vars['text-1'],
    alignItems: 'center',
    fontSize: 14,
    height: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-4'],
    transition: 'border-color 0.2s,box-shadow 0.2s',
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
    variants: [
      {
        props: { disabled: false },
        style: {
          '&:hover,&:focus-within': {
            borderColor: theme['primary'],
          },
          '&:focus-within': {
            boxShadow: `0 0 0 2px ${theme.vars['primary-6']}`,
          },
        },
      },
      ...status.map((s) => ({
        props: { status: s },
        style: {
          borderColor: theme[s],
          '&:hover,&:focus-within': {
            borderColor: theme.vars[`${s}-2`],
          },
          '&:focus-within': {
            boxShadow: `0 0 0 2px ${theme.vars[`${s}-6`]}`,
          },
        },
      })),
      {
        props: { disabled: true },
        style: {
          cursor: 'not-allowed',
          backgroundColor: theme.vars['info-6'],
        },
      },
    ],
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
    status,
    type: customType = 'text',
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

  const focus = () => {
    if (inputRef.current) {
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
    <StyledInputWrapper status={status} disabled={disabled}>
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
