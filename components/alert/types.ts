import { HTMLAttributes } from 'react'
import { TColor } from '..'

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
