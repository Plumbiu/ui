import { createContext } from 'react'

export const ActiveKeyContext = createContext<string | undefined>(undefined)

export const VisibleContext = createContext<boolean | undefined>(undefined)
