import { ButtonHTMLAttributes } from 'react'
import { TSize, TBaseColor } from '@/types'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  size?: TSize
  circle?: boolean
  type?: TBaseColor
  outlined?: boolean
  borderless?: boolean
  disabled?: boolean
  plain?: boolean
  loading?: boolean

  icon?: React.ReactNode
  suffixIcon?: React.ReactNode
}
