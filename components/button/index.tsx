import React, { forwardRef } from 'react'
import { clsx } from 'clsx'
import ButtonGroup from './group'
import { ButtonProps } from './types'
import {
  StyledButton,
  borderlessCls,
  circleCls,
  defaultButtonCls,
  loadingCls,
  primaryButtonCls,
} from './styles'
import { IconWrap, LineMdLoadingTwotoneLoop } from '@/icon'
import { fcc_inline, waveCls } from '@/_utils/styles'

const InternalButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      circle,
      borderless,
      disabled,
      loading,
      onClick: customOnClick,
      type,
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
          [primaryButtonCls]: type === 'primary' || loading,
          [defaultButtonCls]: type !== 'primary' && !loading,
          [loadingCls]: loading,
          [circleCls]: circle,
          [waveCls]: !loading && !disabled && !borderless,
          [borderlessCls]: borderless,
        })}
        {...restProps}
        disabled={disabled}
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
  },
)

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
