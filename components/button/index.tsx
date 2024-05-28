/* eslint-disable @stylistic/max-len */
import React, { SVGProps, forwardRef } from 'react'
import { clsx } from 'clsx'
import ButtonGroup from './group'
import { ButtonProps } from './types'
import { StyledButton, defaultButtonCls, primaryButtonCls } from './styles'
import { IconWrap } from '@/icon'
import { fcc_inline } from '@/_styles'

function LineMdLoadingTwotoneLoop(props: SVGProps<SVGSVGElement>) {
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
          />
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
          />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </g>
    </svg>
  )
}

const InternalButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    circle = false,
    borderless = false,
    disabled = false,
    loading = false,
    onClick: customOnClick,
    ...restProps
  } = props

  delete restProps.ref

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (loading || disabled) {
      return
    }
    customOnClick?.(e)
  }

  return (
    <StyledButton
      ref={ref}
      className={clsx(fcc_inline, {
        [primaryButtonCls]: props.type === 'primary' || loading,
        [defaultButtonCls]: props.type !== 'primary' && !loading,
      })}
      {...restProps}
      // @ts-ignore
      circle={circle}
      borderless={borderless}
      disabled={disabled}
      loading={loading}
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
})

type ButtonComponentType = React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> & {
  ButtonGroup: typeof ButtonGroup
}

export type { ButtonProps } from './types'
export type { ButtonGroupProps } from './group'

const Button = InternalButton as unknown as ButtonComponentType
Button.ButtonGroup = ButtonGroup

export default Button
