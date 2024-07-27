import { createContext } from 'react'
import { SelectProps, SelectValue } from './types'
import { SetState } from '@/types'

export const SelectContext = createContext<{
  selectedLabel: SelectValue[]
  setSelectedLabel: SetState<SelectValue[]>
  mode: SelectProps['mode']
  options: SelectProps['options']
} | null>(null)
