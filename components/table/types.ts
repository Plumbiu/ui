import { CSSProperties } from 'react'
import { SetState } from '@/types'

export type DefaultData = Record<'key' | string, any>

export type Render<T extends DefaultData> = (
  row: T,
  column: TableColumnTypes<T>,
) => React.ReactNode
export interface TableColumnTypes<T extends DefaultData> {
  align?: 'left' | 'center' | 'right'
  className?: string
  colspan?: number
  rowspan?: number
  dataIndex?: string
  key?: React.Key
  fixed?: boolean | 'right' | 'left'
  zIndex?: number
  render?: Render<T>
  hidden?: boolean
  width?: number
  title: string
  sorter?: (a: T, b: T) => number
  children?: TableColumnTypes<T>[]
  [key: string]: any
}

export type TableRowSelection = {
  onChange: (data: React.Key[]) => void
  setRowSelection?: () => React.Key
  getDisabledProps?: (data: any) => boolean
}

export interface BaseTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  bordered?: boolean
  scroll?: { x?: number; y?: number }
  headZIndex?: number
  sticky?: boolean
  showHeader?: boolean
  tableLayout?: CSSProperties['tableLayout']

  columns: TableColumnTypes<any>[]
  dataSource: DefaultData[]
  rowKey?: string
  footer?: React.ReactNode
}

export interface TableProps extends BaseTableProps {
  pageSize?: number
  pagination?: boolean
  pageCount?: number
  rowSelection?: TableRowSelection
}

export type VirtualTableProps = Omit<
  TableProps,
  'pageSize' | 'pagination' | 'pageCount' | 'footer'
> & {
  scroll: { x?: number; y: number }
  itemHeight: number
  wait?: number
  overscan?: number
}

export enum SortStatusEnum {
  ascend,
  descend,
  origin,
}

export type TableSort = ((a?: any, b?: any) => number) | undefined

export interface ITableOperateParams {
  sorter?: TableSort
  sortStatusMap: Record<number, SortStatusEnum>
}

export const sortHoverTitle = {
  [SortStatusEnum.ascend]: '点击升序',
  [SortStatusEnum.descend]: '取消排序',
  [SortStatusEnum.origin]: '点击降序',
}

export type SetOperaParams = SetState<ITableOperateParams>

export enum CheckEnum {
  on = '1',
  off = '2',
}
