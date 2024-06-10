import { createContext } from 'react'
import { ITableOperateParams, SetOperaParams } from './types'
import { UpdateCheckeboxByRowIndex } from './hooks/check'

export const TableContext = createContext<{
  setOperaParams?: SetOperaParams
  operaParams?: ITableOperateParams
  isAllChecked?: boolean
  isNoneChecked?: boolean
  updateCheckeboxByRowIndex?: UpdateCheckeboxByRowIndex
} | null>(null)
