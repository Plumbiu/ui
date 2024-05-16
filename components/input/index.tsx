import { styled } from '@pigment-css/react'
import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import { fcc_inline } from '../_styles/css'
import React from 'react'
import clsx from 'clsx'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string
  disabled?: boolean
  prefixNode?: ReactNode
  suffixNode?: ReactNode
}

const StyledInputWrapper = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: 160,
    fontSize: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-4'],
    transition: 'border-color 0.3s',
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 4,
    '&:hover,&._focus': {
      borderColor: theme['primary'],
    },
    '& > span:first-child': {
      paddingRight: 4,
    },
    '& > span:last-child': {
      paddingLeft: 4,
    }
  }
})

const StyledInput = styled('input')<InputProps>(({ theme }) => {
  return {
    position: 'relative',
    outline: 'none',
    border: 'none',
    width: '100%',
    height: 30,
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
            boxShadow: `0 0 0 4px ${theme.vars[`primary-3`]}`,
          },
        },
      },
    ],
  }
})

const Input: React.FC<InputProps> = (props) => {
  const { disabled = false, prefixNode, suffixNode, ...restProps } = props
  const [isFocus, setIsFoucs] = React.useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus() {
    setIsFoucs(true)
  }

  function handleBlur() {
    setIsFoucs(false)
  }

  const cls = clsx({
    _focus: isFocus,
  })

  useEffect(() => {
    inputRef.current?.addEventListener('focus', handleFocus)
    inputRef.current?.addEventListener('blur', handleBlur)

    return () => {
      inputRef.current?.removeEventListener('focus', handleFocus)
      inputRef.current?.removeEventListener('blur', handleBlur)
    }
  }, [inputRef.current?.focus])
  return (
    <StyledInputWrapper className={cls}>
      {!!prefixNode && <span>{prefixNode}</span>}
      <StyledInput
        ref={inputRef}
        className={fcc_inline}
        disabled={disabled}
        {...restProps}
      ></StyledInput>
      {!!suffixNode && <span>{suffixNode}</span>}
    </StyledInputWrapper>
  )
}

export default Input
