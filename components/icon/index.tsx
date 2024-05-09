/* eslint-disable @stylistic/max-len */
import { styled } from '@pigment-css/react'
import { HTMLAttributes, SVGProps } from 'react'
import { colorsVar, sizesVar } from '../_styles/vars'
import { TColor, TSize } from '..'


export function MaterialSymbolsCheckCircleRounded(
  props: SVGProps<SVGSVGElement>,
) {
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
        d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </svg>
  )
}

export function MaterialSymbolsCancel(props: SVGProps<SVGSVGElement>) {
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
        d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </svg>
  )
}

export function MaterialSymbolsInfoRounded(props: SVGProps<SVGSVGElement>) {
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
        d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </svg>
  )
}

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: TSize
  color?: TColor
  hover?: boolean
}

const sizesMap: Record<TSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
}

export const StyledIcon = styled('span')<IconProps>(({ theme }) => ({
  '& > svg': {
    display: 'block',
  },
  variants: [
    ...colorsVar.map((color) => ({
      props: { color },
      style: {
        color: theme[color],
      },
    })),
    ...sizesVar.map((size) => ({
      props: { size },
      style: {
        '& > svg': {
          width: sizesMap[size],
          fontSize: sizesMap[size],
        },
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
      }
    }
  ],
}))

export const IconWrap: React.FC<IconProps> = (props) => {
  const { color, size = 'md', hover = false, ...restProps } = props
  return (
    <StyledIcon {...restProps} hover={hover} color={color} size={size}>
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
