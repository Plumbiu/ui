import { styled } from '@pigment-css/react'
import { HTMLAttributes } from 'react'
import { TSize } from '../types'
import { borderRadiusVariants } from '../styles/vars'
import { ButtonProps } from '.'

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: TSize
  children: React.ReactElement<ButtonProps>[]
}
const borderColor = {
  primary: '#79bbff',
  success: '#95d475',
  warning: '#eebe77',
  danger: '#f89898',
  info: '#e9e9eb',
}
const StyledButtonGroup = styled('div')<ButtonGroupProps>(({ theme }) => {
  return {
    overflow: 'hidden',
    width: 'max-content',
    '& > button': {
      borderRadius: 0,
      position: 'relative',
      marginLeft: '0!important',
      marginRight: '0!important',
      boxShadow: 'none',
      borderColor: 'transparent',
      '&:not(:first-child)::after': {
        content: '""',
        position: 'absolute',
        width: 1,
        top: -1,
        left: -1.5,
        bottom: -1,
        backgroundColor: (node) =>
          borderColor[node.children?.[0]?.props?.color ?? 'primary'],
      },
    },
    variants: [...borderRadiusVariants],
  }
})

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { size = 'md', ...restProps } = props
  return (
    <StyledButtonGroup {...restProps} size={size}>
      {props.children}
    </StyledButtonGroup>
  )
}

export default ButtonGroup
