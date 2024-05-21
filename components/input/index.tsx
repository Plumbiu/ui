import { css, styled } from '@pigment-css/react'
import React, { ReactNode } from 'react'
import { fcc_inline } from '@/_styles'

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'type'
  > {
  placeholder?: string
  disabled?: boolean
  beforeNode?: ReactNode
  afterNode?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
}

const StyledInputWrapper = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 14,
    height: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-4'],
    transition: 'border-color 0.3s',
    borderRadius: 4,
    '& > *': {
      margin: '0 auto',
      whiteSpace: 'nowrap',
      '&:first-child': {
        paddingLeft: 8,
      },
      '&:last-child': {
        paddingRight: 8,
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
  backgroundColor: '#f8f8f8',
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
    paddingRight: 8,
    paddingLeft: 8,
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

const Input: React.FC<InputProps> = (props) => {
  const {
    disabled = false,
    prefix,
    suffix,
    afterNode,
    beforeNode,
    ...restProps
  } = props

  return (
    <StyledInputWrapper>
      {!!beforeNode && <div className={addonCls}>{beforeNode}</div>}
      {!!prefix && <span>{prefix}</span>}
      <StyledInput className={fcc_inline} disabled={disabled} {...restProps} />
      {!!afterNode && <div className={addonCls}>{afterNode}</div>}
      {!!suffix && <span>{suffix}</span>}
    </StyledInputWrapper>
  )
}

export default Input
