import { HTMLAttributes } from 'react'
import { styled } from '@pigment-css/react'
import { TColor } from '../types'
import { colorsVar } from '../styles/vars'
import { isDarkColor, formatHex } from '../utils'
import { IconWrap } from '../icon'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TColor
  plain?: boolean
  fill?: boolean

  icon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

const StyledTag = styled('span')<TagProps>(({ theme }) => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    gap: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: '3px 7px',
    fontSize: 12,
    borderRadius: 5,
    variants: [
      ...colorsVar.flatMap((color) => {
        return [
          {
            props: { color, fill: true },
            style: {
              backgroundColor: theme[color],
              color: theme['text-1'],
            },
          },
          {
            props: { color, fill: false },
            style: {
              backgroundColor: theme.vars[`${color}-6`],
              color: theme.vars[`${color}-1`],
              borderColor: theme.vars[`${color}-1`],
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
    plain = false,
    fill = false,
    icon = null,
    suffixIcon = null,
    ...restProps
  } = props
  const isPresetColor = customColor[0] !== '#'

  const tagProps: TagProps = {
    ...restProps,
    plain,
    fill,
  }
  if (!isPresetColor) {
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
  } else {
    tagProps.color = customColor
  }
  return (
    <StyledTag {...tagProps}>
      {icon && <IconWrap>{icon}</IconWrap>}
      <span>{props.children}</span>
      {suffixIcon && <IconWrap>{suffixIcon}</IconWrap>}
    </StyledTag>
  )
}

export default Tag
