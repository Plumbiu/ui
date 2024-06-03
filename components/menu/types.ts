import { HTMLAttributes } from 'react'

export interface MenuItem {
  label?: React.ReactNode
  disabled?: boolean
  type?: 'group' | 'divider'
  icon?: React.ReactNode
  key?: string
  children?: MenuItem[]
  [key: string]: any
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
}