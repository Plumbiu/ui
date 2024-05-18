/* eslint-disable @stylistic/max-len */
import { styled } from '@pigment-css/react'
import { HTMLAttributes, SVGProps } from 'react'
import { colorsVar } from '../_styles/vars'
import { TColor, TSize } from '..'
import { fcc_inline } from '../_styles/css'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: TSize
  color?: TColor
  hover?: boolean
  hoverBg?: boolean
}

const sizeMap: Record<TSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
}

const sizeVar: TSize[] = ['sm', 'lg']
export const StyledIcon = styled('span')<IconProps>(({ theme }) => ({
  fontSize: 14,
  variants: [
    ...colorsVar.map((color) => ({
      props: { color },
      style: {
        color: theme[color],
      },
    })),
    ...sizeVar.map((size) => ({
      props: { size },
      style: {
        fontSize: sizeMap[size],
      },
    })),
    {
      props: { hover: true },
      style: {
        cursor: 'pointer',
        transition: 'color 0.1s',
        '&:hover': {
          color: theme.vars['text-3'],
        },
      },
    },
    {
      props: { hoverBg: true },
      style: {
        cursor: 'pointer',
        transition: 'background-color 0.1s',
        borderRadius: '50%',
        padding: 4,
        '&:hover': {
          backgroundColor: theme.vars['info-3'],
        },
      },
    },
  ],
}))

export const IconWrap: React.FC<IconProps> = (props) => {
  const { color, size = 'md', ...restProps } = props
  return (
    <StyledIcon className={fcc_inline} {...restProps} color={color} size={size}>
      {props.children}
    </StyledIcon>
  )
}

export function MaterialSymbolsCloseRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
      />
    </svg>
  )
}
