import { HTMLAttributes } from 'react'
import { styled } from '@pigment-css/react'
import { TColor } from '../types'
import { IconWrap } from '../icon'
import { formatHex, isDarkColor } from './utils'
import { fcc_inline } from '@/_utils/styles'
import { colorsVar } from '@/_utils/vars'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TColor
  fill?: boolean

  icon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

const StyledTag = styled('span')<TagProps>(({ theme }) => {
  return {
    gap: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: '3px 7px',
    fontSize: 12,
    borderRadius: 4,
    variants: [
      ...colorsVar.flatMap((color) => {
        return [
          {
            props: { color },
            style: {
              backgroundColor: theme.vars[`${color}-6`],
              color: theme.vars[`${color}-1`],
              borderColor: theme.vars[`${color}-1`],
            },
          },
          {
            props: { color, fill: true },
            style: {
              backgroundColor: theme[color],
              color: theme['text-1'],
            },
          },
        ]
      }),
    ],
  }
})

const Tag: React.FC<TagProps> = (props) => {
  const {
    color: customColor = 'primary',
    fill = false,
    icon = null,
    suffixIcon = null,
    ...restProps
  } = props
  const isPresetColor = customColor[0] !== '#'

  const tagProps: TagProps = {
    ...restProps,
    fill,
    color: customColor,
  }
  if (!isPresetColor) {
    delete tagProps.color
    if (fill === true) {
      const fontColor = isDarkColor(customColor) ? '#fefefe' : '#323232'
      const style: React.CSSProperties = {
        ...(props.style ?? {}),
        color: fontColor,
        backgroundColor: customColor,
      }
      tagProps.style = style
    } else {
      const color = formatHex(customColor) + '42'
      const style: React.CSSProperties = {
        ...(props.style ?? {}),
        color: customColor,
        borderColor: customColor,
        backgroundColor: color,
      }
      tagProps.style = style
    }
  }
  return (
    <StyledTag className={fcc_inline} {...tagProps}>
      {icon && <IconWrap>{icon}</IconWrap>}
      <span>{props.children}</span>
      {suffixIcon && <IconWrap>{suffixIcon}</IconWrap>}
    </StyledTag>
  )
}

export default Tag
