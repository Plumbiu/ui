import { ButtonHTMLAttributes } from 'react'
import { TSize } from '@/types'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  size?: TSize
  circle?: boolean
  type?: 'primary'
  borderless?: boolean
  disabled?: boolean
  loading?: boolean

  ref?: React.ForwardedRef<HTMLButtonElement>
  icon?: React.ReactNode
  suffixIcon?: React.ReactNode
}
