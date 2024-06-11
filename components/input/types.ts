import { ReactNode } from 'react'

export type RowInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix' | 'onChange' | 'type'
>

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

export interface InputProps extends RowInputProps {
  type?: 'password' | 'text'
  placeholder?: string
  disabled?: boolean
  beforeNode?: ReactNode
  afterNode?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  allowClear?: boolean
  defaultValue?: string
  maxLength?: number

  onChange?: (e: InputChangeEvent) => void
}

export const EventKey = '__e__'

export type InputProxy = HTMLInputElement & {
  [EventKey]?: any
}
