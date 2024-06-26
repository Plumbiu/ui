import { HTMLAttributes } from 'react'
import { styled } from '@pigment-css/react'
import { TBaseColor, TSize } from '@/types'
import { colorsVar } from '@/_utils/vars'

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  size?: TSize
  disabled?: boolean
  underline?: boolean
  color?: TBaseColor
}

const StyledLink = styled('a')<LinkProps>(({ theme }) => {
  return {
    cursor: 'pointer',
    color: theme.vars['primary-1'],
    padding: 2,
    transition: '0.1s',
    variants: [
      ...colorsVar.map((color) => ({
        props: { color, disabled: false },
        style: {
          color: theme[color],
          '&:hover': {
            color: theme[color] + 'a1',
          },
          '&:active': {
            color: theme[color] + 'ef',
          },
        },
      })),
      {
        props: { size: 'lg' },
        style: {
          fontSize: 16,
        },
      },
      {
        props: { size: 'sm' },
        style: {
          fontSize: 12,
        },
      },
      {
        props: { disabled: true },
        style: {
          filter: 'grayscale(1)',
          opacity: 0.5,
          cursor: 'not-allowed',
          boxShadow: 'none',
        },
      },
      {
        props: { underline: true, disabled: false },
        style: {
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    ],
  }
})

const Link: React.FC<LinkProps> = (props) => {
  const {
    size,
    color = 'primary',
    disabled = false,
    underline = true,
    ...restProps
  } = props
  return (
    <StyledLink
      {...restProps}
      size={size}
      disabled={disabled}
      color={color}
      underline={underline}
    >
      {props.children}
    </StyledLink>
  )
}

export default Link
