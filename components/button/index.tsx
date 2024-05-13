/* eslint-disable @stylistic/max-len */
import React, { HTMLAttributes, SVGProps } from 'react'
import { styled } from '@pigment-css/react'
import { TBaseColor, TSize } from '../types'
import { fcc_inline } from '../_styles/css'
import { borderRadiusVariants, colorsVar, wave } from '../_styles/vars'
import { IconWrap } from '../icon'
import { sizeVariants } from './constants'
import ButtonGroup from './group'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: TSize
  circle?: boolean
  color?: TBaseColor
  outlined?: boolean
  borderless?: boolean
  disabled?: boolean
  plain?: boolean
  loading?: boolean

  icon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

export function LineMdLoadingTwotoneLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path
          strokeDasharray="60"
          strokeDashoffset="60"
          strokeOpacity=".3"
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="1.3s"
            values="60;0"
          ></animate>
        </path>
        <path
          strokeDasharray="15"
          strokeDashoffset="15"
          d="M12 3C16.9706 3 21 7.02944 21 12"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="15;0"
          ></animate>
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          ></animateTransform>
        </path>
      </g>
    </svg>
  )
}

const StyledButton = styled('button')<ButtonProps>(({ theme }) => {
  return {
    cursor: 'pointer',
    outline: 'none',
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
    height: 28,
    fontSize: 14,
    padding: '0 12px',
    lineHeight: 1,
    gap: 4,
    borderRadius: 4,
    ...wave,
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
                boxShadow: `0 0 0 4px ${theme.vars[`${color}-3`]}`,
              },
            },
          },
          {
            props: { loading: true, color },
            style: {
              opacity: 0.65,
              '&:hover': {
                opacity: 0.5,
              },
              '&:active': {
                opacity: 0.65,
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
        props: { disabled: false, loading: false },
        style: {
          '&:hover': {
            opacity: 0.9,
          },
          '&:active': {
            opacity: 1,
          },
        },
      },
    ],
  }
})

const Button: React.FC<ButtonProps> & {
  ButtonGroup: typeof ButtonGroup
} = (props) => {
  const {
    size,
    circle = false,
    color = 'primary',
    outlined = false,
    borderless = false,
    disabled = false,
    plain = false,
    loading = false,
    onClick: customOnClick,
    ...restProps
  } = props

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (loading || disabled) {
      return
    }
    customOnClick?.(e)
  }

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
      loading={loading}
      plain={plain}
      onClick={onClick}
    >
      {loading ? (
        <IconWrap>
          <LineMdLoadingTwotoneLoop />
        </IconWrap>
      ) : props.icon ? (
        <IconWrap>{props.icon}</IconWrap>
      ) : null}
      {!!props.children && <span>{props.children}</span>}
      {!!props.suffixIcon && <IconWrap>{props.suffixIcon}</IconWrap>}
    </StyledButton>
  )
}

Button.ButtonGroup = ButtonGroup

export default Button
