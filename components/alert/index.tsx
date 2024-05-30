import React, { HTMLAttributes, useState } from 'react'
import { css, styled } from '@pigment-css/react'
import { TColor } from '@/types'
import {
  IconWrap,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsInfoRounded,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsCancel,
} from '@/icon'
import { selfStart } from '@/_utils/styles'
import { colorsVar } from '@/_utils/vars'

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
    lineHeight: '16px',
    borderRadius: 8,
    padding: '7px 15px',
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
  lineHeight: 1.575,
  marginTop: 2,
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
  gap: 6,
})

const actionCls = css({
  alignSelf: 'flex-start',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
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
              hover
              onClick={() => {
                setVisible(false)
                onClose && onClose()
              }}
              color={color}
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
