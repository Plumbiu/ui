import { createContext } from 'react'
import { SelectProps, SelectValue } from './types'

export const SelectContext = createContext<{
  selectedLabel: SelectValue[]
  setSelectedLabel: React.Dispatch<React.SetStateAction<SelectValue[]>>
  mode: SelectProps['mode']
  options: SelectProps['options']
} | null>(null)
