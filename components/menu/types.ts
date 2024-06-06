import { HTMLAttributes } from 'react'

export interface MenuItem {
  label?: React.ReactNode
  disabled?: boolean
  type?: 'group' | 'divider'
  icon?: React.ReactNode
  key?: string
  children?: MenuItem[]
}

export type MenuMode = 'inline' | 'horizontal'

export type MenuOnClickParams = {
  domEvent:  React.MouseEvent<HTMLDivElement, MouseEvent>
  key?: string
  keyPath: string[]
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>{
  items: MenuItem[]
  mode?: MenuMode
  uniqueOpen?: boolean
  onClick?: (e: MenuOnClickParams) => void
  inlineCollapsed?: boolean
}
