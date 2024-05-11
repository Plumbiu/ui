import { styled } from '@pigment-css/react'
import { wave } from '../_styles/vars'
import { HTMLAttributes } from 'react'
import { fcc_inline } from '../_styles/css'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string
  disabled?: boolean
}

const StyledInput = styled('input')<InputProps>(({ theme }) => {
  return {
    position: 'relative',
    outline: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-4'],
    height: 30,
    paddingLeft: 12,
    transition: 'border-color .15s',
    backgroundColor: 'transparent',
    color: theme.vars['text-1'],
    borderRadius: 4,
    '&::placeholder': {
      color: theme.vars['text-4'],
    },
    ...wave,
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
        },
      },
    ],
  }
})

const Input: React.FC<InputProps> = (props) => {
  const { disabled = false, ...restProps } = props
  return (
    <StyledInput className={fcc_inline} disabled={disabled} {...restProps}>
      {props.children}
    </StyledInput>
  )
}

export default Input
