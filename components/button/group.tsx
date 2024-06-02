import { styled } from '@pigment-css/react'
import { HTMLAttributes } from 'react'
import { ButtonProps } from './types'
import { TSize } from '@/types'

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: TSize
  children: React.ReactElement<ButtonProps>[]
}

const StyledButtonGroup = styled('div')<ButtonGroupProps>(({ theme }) => {
  const borderColor = theme['blue-4']
  return {
    width: 'max-content',
    borderRadius: 6,
    color: theme.vars['text-1'],
    '& > button': {
      '&:hover': {
        borderColor: theme.vars['info-3'],
      },
      '&:focus': {
        borderColor: borderColor,
        color: borderColor,
        '&+button': {
          borderLeftColor: borderColor,
        },
      },
      '&:not(:first-child):not(:last-child)': {
        borderRadius: 0,
        borderRightWidth: 0,
      },
      '&:first-child': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
      },
      '&:last-child': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      position: 'relative',
      marginLeft: '0!important',
      marginRight: '0!important',
      boxShadow: 'none',
    },
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
