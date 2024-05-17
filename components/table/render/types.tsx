import {
  SortStatusEnum,
  SetOperaParams,
  TableSort,
  DefaultData,
  TableProps,
  FilterStatusEnum,
} from '../types'

export interface ITableActionsProps {
  sortStatus?: SortStatusEnum
  filterStatus?: FilterStatusEnum

  setOperaParams?: SetOperaParams
  title: string
  sorter: TableSort
  colIndex: number
}

export type TableTdProps = Omit<ITableActionsProps, 'title'> & {
  isHead: boolean
  data?: DefaultData
  rowIndex: number
  column: TableProps['columns'][number]
}