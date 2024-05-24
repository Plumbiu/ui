import { css, styled } from '@pigment-css/react'
import React, { useMemo, useRef } from 'react'
import { MaterialSymbolsCloseSmallOutlineRounded } from './icons'
import { EventKey, InputChangeEvent, InputProps, InputProxy } from './types'
import { fcc_inline } from '@/_styles'
import { IconWrap } from '@/icon'
import { useMounted } from '@/_hooks'

const StyledInputWrapper = styled('div')(({ theme }) => {
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
    transition: 'border-color 0.3s',
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
    '&:hover,&:focus-within': {
      borderColor: theme['primary'],
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
    paddingRight: 12,
    paddingLeft: 12,
    transition: 'border-color .15s',
    backgroundColor: 'transparent',
    color: theme.vars['text-1'],
    '&::placeholder': {
      color: theme.vars['text-4'],
    },
    variants: [
      {
        props: { disabled: false },
        style: {
          '&::after': {
            boxShadow: `0 0 0 4px ${theme.vars['primary-3']}`,
          },
        },
      },
    ],
  }
})

const closeCls = css(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  right: 8,
  color: '#fff',
  backgroundColor: theme.vars['info-2'],
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
    ...restProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
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
        if (target) {
          if (p === 'value') {
            Reflect.set(target, p, newValue ?? '')
          } else if (p === EventKey) {
            if (newValue.type === 'click') {
              const newEvent = Object.create(newValue, {
                target: { value: inputRef },
                currentTarget: { value: inputRef },
              })
              onChange?.(newEvent as InputChangeEvent)
            } else {
              onChange?.(newValue as InputChangeEvent)
            }
          }
        }
        return true
      },
    })
    return proxyRef
  }, [inputRef.current, mounted])

  const handleChange = (
    e: InputChangeEvent | React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    if (proxy) {
      if (e.type === 'click') {
        // clear
        proxy.value = ''
      } else {
        proxy.value = (e as InputChangeEvent).target.value
      }
      proxy[EventKey] = e
    }
  }

  return (
    <StyledInputWrapper>
      {!!beforeNode && <div className={addonCls}>{beforeNode}</div>}
      {!!prefix && <div>{prefix}</div>}
      <StyledInput
        ref={inputRef}
        className={fcc_inline}
        disabled={disabled}
        onChange={handleChange}
        {...restProps}
      />
      {allowClear && (
        <IconWrap
          onClick={handleChange}
          className={closeCls}
          color="info"
          hoverBg
        >
          <MaterialSymbolsCloseSmallOutlineRounded />
        </IconWrap>
      )}
      {!!afterNode && <div className={addonCls}>{afterNode}</div>}
      {!!suffix && <div>{suffix}</div>}
    </StyledInputWrapper>
  )
}

export default Input

export type { InputChangeEvent, RowInputProps, InputProps } from './types'
