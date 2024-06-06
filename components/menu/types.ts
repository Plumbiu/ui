import { HTMLAttributes } from 'react'

export interface MenuItemType {
  label?: React.ReactNode
  disabled?: boolean
  type?: 'group' | 'divider'
  icon?: React.ReactNode
  key?: string
  children?: MenuItemType[]
}

export type MenuMode = 'inline' | 'horizontal'

export type MenuOnClickParams = {
  domEvent:  React.MouseEvent<HTMLDivElement, MouseEvent>
  key?: string
  keyPath: string[]
  
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>{
  items: MenuItemType[]
  mode?: MenuMode
  onClick?: (e: MenuOnClickParams) => void
  inlineCollapsed?: boolean
  defaultOpenKeys?: string[]
}
