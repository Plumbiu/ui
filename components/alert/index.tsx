import React, { useState } from 'react'
import {
  iconMap,
  StyledAlert,
  headingCls,
  StyledAlertDescription,
  actionCls,
} from './styles'
import { AlertProps } from './types'
import { IconWrap, MaterialSymbolsCloseRounded } from '@/icon'
import { selfStart } from '@/_utils/styles'

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
