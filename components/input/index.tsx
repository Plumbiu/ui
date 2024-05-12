import { styled } from '@pigment-css/react'
import { HTMLAttributes } from 'react'
import { fcc_inline } from '../_styles/css'
import { useThrottleFn } from 'ahooks'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string
  disabled?: boolean
  wait?: number
  prefixText?: string
  suffixText?: string
}

const StyledInputWrapper = styled('span')<
  Pick<InputProps, 'suffixText' | 'prefixText'>
>({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 160,
  fontSize: 14,
  variants: [
    {
      props: ({ prefixText }) => typeof prefixText === 'string',
      style: {
        '&>input': {
          paddingLeft: 24,
        },
        '& >span:first-child': {
          position: 'absolute',
          left: 6,
        },
      },
    },
    {
      props: ({ suffixText }) => typeof suffixText === 'string',
      style: {
        '&>input': {
          paddingRight: 24,
        },
        '& >span:last-child': {
          position: 'absolute',
          right: 6,
        },
      },
    },
  ],
})

const StyledInput = styled('input')<InputProps>(({ theme }) => {
  return {
    position: 'relative',
    outline: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-4'],
    width: '100%',
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    transition: 'border-color .15s',
    backgroundColor: 'transparent',
    color: theme.vars['text-1'],
    borderRadius: 4,
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
          '&:focus,&:active,&:hover': {
            borderColor: theme['primary'],
          },
          '&:focus': {
            boxShadow: `0 0 0 2px ${theme.vars['primary-6']}`,
          },
        },
      },
      {
        props: ({ prefixText }) => typeof prefixText === 'string',
        style: {
          paddingLeft: 12,
        },
      },
    ],
  }
})

const Input: React.FC<InputProps> = (props) => {
  const {
    disabled = false,
    wait = 0,
    onChange: customOnChange,
    prefixText,
    suffixText,
    ...restProps
  } = props
  const { run } = useThrottleFn((e) => customOnChange?.(e), { wait })
  return (
    <StyledInputWrapper prefixText={prefixText} suffixText={suffixText}>
      {!!prefixText && <span>{prefixText}</span>}
      <StyledInput
        className={fcc_inline}
        disabled={disabled}
        onChange={run}
        {...restProps}
      ></StyledInput>
      {!!suffixText && <span>{suffixText}</span>}
    </StyledInputWrapper>
  )
}

export default Input
