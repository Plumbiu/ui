import { UpdateCheckeboxByRowIndex } from '../hooks/check'
import {
  CheckEnum,
  DefaultData,
  ITableOperateParams,
  SetOperaParams,
  TableProps,
} from '../types'

export interface ITableTr {
  height?: number
  virtual?: boolean
  data?: DefaultData
  rowIndex: number
  setOperaParams?: SetOperaParams
  head?: boolean
  isNoneChecked?: boolean
  isAllChecked?: boolean
  updateCheckeboxByRowIndex?: UpdateCheckeboxByRowIndex
  disabled?: boolean
  checkStatus?: CheckEnum
  style?: React.CSSProperties
  operaParams?: ITableOperateParams
  columns: TableProps['columns']
}
