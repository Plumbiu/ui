import { createContext } from 'react'

export const ActiveKeyContext = createContext<string | undefined>(undefined)

export const VisibleContext = createContext<boolean | undefined>(undefined)

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>

interface IMenuContext {
  activeKey: string | undefined
  setActiveKey: SetStateType<IMenuContext['activeKey']>
  openKeys: string[]
  setOpenKeys: SetStateType<IMenuContext['openKeys']>
  inlineCollapsed: boolean
}

export const MenuContext = createContext<IMenuContext | undefined>(undefined)
