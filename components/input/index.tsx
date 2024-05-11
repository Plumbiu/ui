import { styled } from "@pigment-css/react";
import { HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string
}

const StyledInput = styled('input')<InputProps>(({ theme }) => {
  return {
    outline: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.vars['info-3'],
    height: 30,
    paddingLeft: 12,
    transition: 'border-color .15s',
    borderRadius: 6,
    '&:focus,&:active,&:hover': {
      borderColor: theme['primary']
    }
  }
})

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props}>{props.children}</StyledInput>
}

export default Input