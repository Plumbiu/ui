import { styled } from '@pigment-css/react'
import { HTMLAttributes } from 'react'
import { ButtonProps } from './types'
import { TSize } from '@/types'
import { borderRadiusVariants } from '@/_styles'

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
    width: 'max-content',
    borderRadius: 4,
    '& > button': {
      '&:not(:first-child):not(:last-child)': {
        borderRadius: 0,
      },
      '&:first-child': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      '&:last-child': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      position: 'relative',
      marginLeft: '0!important',
      marginRight: '0!important',
      boxShadow: 'none',
      borderColor: 'transparent',
      '&:not(:first-child)::before': {
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
  const { size, ...restProps } = props
  return (
    <StyledButtonGroup {...restProps} size={size}>
      {props.children}
    </StyledButtonGroup>
  )
}

export default ButtonGroup
