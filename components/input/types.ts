import { ReactNode } from 'react'

export type RowInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'sizse' | 'prefix' | 'type' | 'onChange'
>

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

export type ClickEvent = React.MouseEvent

export interface InputProps extends RowInputProps {
  placeholder?: string
  disabled?: boolean
  beforeNode?: ReactNode
  afterNode?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  allowClear?: boolean
  onChange?: (e: InputChangeEvent) => void
}

export const EventKey = '__e__'

export type InputProxy = HTMLInputElement & {
  [EventKey]?: any
}
