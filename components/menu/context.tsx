import { createContext } from 'react'
import { SetState } from '@/types'

export const ActiveKeyContext = createContext<string | undefined>(undefined)

export const VisibleContext = createContext<boolean | undefined>(undefined)

interface IMenuContext {
  activeKey: string | undefined
  setActiveKey: SetState<IMenuContext['activeKey']>
  openKeys: string[]
  setOpenKeys: SetState<IMenuContext['openKeys']>
  inlineCollapsed: boolean
}

export const MenuContext = createContext<IMenuContext | undefined>(undefined)
