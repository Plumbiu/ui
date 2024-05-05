/* eslint-disable @stylistic/max-len */
import React, { HTMLAttributes, useState } from 'react'
import { css, styled } from '@pigment-css/react'
import { TColor } from '../types'
import {
  IconWrap,
  MaterialSymbolsCancel,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsInfoRounded,
} from '../icon'
import { colorsVar } from '../styles/vars'
import { selfStart } from '../styles'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: TColor
  message?: React.ReactNode
  description?: React.ReactNode
  showIcon?: boolean

  closable?: boolean
  closeIcon?: React.ReactNode
  action?: React.ReactNode
  icon?: React.ReactNode
  onClose?: () => void
}

const StyledAlert = styled('div')<AlertProps>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderStyle: 'solid',
    lineHeight: 1,
    borderRadius: 8,
    padding: '8px 12px',
    color: theme.vars['text-1'],
    fontSize: 14,
    variants: [
      ...colorsVar.map((color) => ({
        props: { color },
        style: {
          backgroundColor: theme.vars[`${color}-4`],
          borderColor: theme[color],
        },
      })),
    ],
  }
})

const StyledAlertDescription = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  lineHeight: 1.45,
  marginTop: 4,
})

const iconMap: Record<TColor, React.ReactNode> = {
  primary: <MaterialSymbolsInfoRounded />,
  success: <MaterialSymbolsCheckCircleRounded />,
  warning: <MaterialSymbolsInfoRounded />,
  danger: <MaterialSymbolsCancel />,
  info: <MaterialSymbolsInfoRounded />,
}

const headingCls = css({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 6,
})

const closeIconCls = css(({ theme }) => ({
  cursor: 'pointer',
  transition: 'color 0.1s',
  '&:hover': {
    color: theme.vars['text-3'],
  },
}))

const actionCls = css({
  alignSelf: 'flex-start',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  '& > button': {
    boxShadow: 'none',
  },
})

const Alert: React.FC<AlertProps> = (props) => {
  const {
    color = 'primary',
    message,
    description,
    showIcon = true,
    icon: custormIcon = null,
    closable = false,
    closeIcon = <MaterialSymbolsCloseRounded />,
    action = null,
    onClose,
    ...restProps
  } = props

  const icon = showIcon ? iconMap[color] : custormIcon
  const [visible, setVisible] = useState(true)
  return (
    visible && (
      <StyledAlert {...restProps} color={color}>
        <div className={headingCls}>
          {icon && (
            <IconWrap className={selfStart} size="lg" color={color}>
              {icon}
            </IconWrap>
          )}
          <div>
            <div>{message ?? props.children ?? 'Info'}</div>
            {!!description && (
              <StyledAlertDescription>{description}</StyledAlertDescription>
            )}
          </div>
        </div>
        <div className={actionCls}>
          {action}
          {closable && (
            <IconWrap
              size="lg"
              onClick={() => {
                setVisible(false)
                onClose && onClose()
              }}
              color={color}
              className={closeIconCls}
            >
              {closeIcon}
            </IconWrap>
          )}
        </div>
      </StyledAlert>
    )
  )
}

export default Alert
