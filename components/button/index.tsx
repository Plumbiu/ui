/* eslint-disable @stylistic/max-len */
import React, { HTMLAttributes } from 'react'
import { styled } from '@pigment-css/react'
import { TBaseColor, TSize } from '../types'
import { fcc_inline } from '../_styles/css'
import { borderRadiusVariants, colorsVar } from '../_styles/vars'
import { IconWrap } from '../icon'
import { sizeVariants } from './constants'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: TSize
  circle?: boolean
  color?: TBaseColor
  outlined?: boolean
  borderless?: boolean
  disabled?: boolean
  plain?: boolean

  icon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

const StyledButton = styled('button')<ButtonProps>(({ theme }) => {
  return {
    cursor: 'pointer',
    color: theme['text-1'],
    opacity: 1,
    transition: '0.175s',
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'relative',
    '&:disabled': {
      filter: 'grayscale(1)',
      opacity: 0.5,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    lineHeight: 1,
    gap: 4,
    variants: [
      ...sizeVariants,
      ...borderRadiusVariants,
      ...colorsVar.flatMap((color) => {
        return [
          {
            props: { color },
            style: {
              backgroundColor: theme[color],
              borderColor: theme[color],
              color: theme['text-1'],
            },
          },
          {
            props: { color, disabled: false },
            style: {
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                opacity: 0,
                transition: 'opacity .3s cubic-bezier(.645,.045,.355,1)',
                boxShadow: `0 0 0 4px ${theme.vars[`${color}-3`]}`,
              },
              '&:active::after': {
                opacity: 0.4,
                transition: '0s',
              },

            },
          },
        ]
      }),
      ...colorsVar.flatMap((color) => {
        const commonProps = { outlined: true, color }
        return [
          {
            props: { ...commonProps },
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              borderColor: theme.vars[`${color}-1`],
              color: theme.vars[`${color}-1`],
            },
          },
          {
            props: { ...commonProps, disabled: false },
            style: {
              '&:hover': {
                backgroundColor: theme.vars[`${color}-6`],
              },
            },
          },
        ]
      }),
      ...colorsVar.map((color) => ({
        props: { plain: true, color },
        style: {
          backgroundColor: theme.vars[`${color}-6`],
          color: theme.vars[`${color}-1`],
        },
      })),
      {
        props: { circle: true },
        style: {
          borderRadius: '50%',
          aspectRatio: 1,
          padding: 6,
        },
      },
      {
        props: { disabled: false },
        style: {
          '&:hover': {
            opacity: 0.9,
          },
          '&:active': {
            opacity: 1
          }
        },
      },
    ],
  }
})

const Button: React.FC<ButtonProps> = (props) => {
  const {
    size = 'md',
    circle = false,
    color = 'primary',
    outlined = false,
    borderless = false,
    disabled = false,
    plain = false,
    ...restProps
  } = props
  return (
    <StyledButton
      className={fcc_inline}
      {...restProps}
      size={size}
      circle={circle}
      color={color}
      outlined={outlined}
      borderless={borderless}
      disabled={disabled}
      plain={plain}
    >
      {!!props.icon && <IconWrap>{props.icon}</IconWrap>}
      {!!props.children && <span>{props.children}</span>}
      {!!props.suffixIcon && <IconWrap>{props.suffixIcon}</IconWrap>}
    </StyledButton>
  )
}

export default Button
