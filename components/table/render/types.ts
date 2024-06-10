import {
  CheckEnum,
  DefaultData,
  TableProps,
} from '../types'

export interface ITableTr {
  height?: number
  virtual?: boolean
  data?: DefaultData
  rowIndex: number
  head?: boolean
  disabled?: boolean
  checkStatus?: CheckEnum
  style?: React.CSSProperties
  columns: TableProps['columns']
}
