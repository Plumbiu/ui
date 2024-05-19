import { CSSProperties } from 'react'

export type DefaultData = Record<'key' | string, any>

export type Render<T extends DefaultData> = (
  row: T,
  column: TableColumnTypes<T>,
  rowIndex: number,
  colIndex: number,
) => React.ReactNode
export interface TableColumnTypes<T extends DefaultData> {
  align?: 'left' | 'center' | 'right'
  className?: string
  colSpan?: number
  rowSpan?: number
  dataIndex?: string
  key?: React.Key
  fixed?: boolean | 'right' | 'left'
  zIndex?: number
  render?: Render<T>
  hidden?: boolean
  width?: number
  title: string
  sorter?: (a: T, b: T) => number
  [key: string]: any
}

export type TableRowSelection = {
  onChange: (data: any[]) => void
  selectedRowKeys?: React.Key[]
}

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  bordered?: boolean
  scroll?: { x?: number; y?: number }
  headZIndex?: number
  sticky?: boolean
  showHeader?: boolean
  tableLayout?: CSSProperties['tableLayout']
  pageSize?: number
  pagination?: boolean
  pageCount?: number
  rowSelection?: TableRowSelection

  columns: TableColumnTypes<any>[]
  dataSource: DefaultData[]
  rowKey?: string
  footer?: React.ReactNode
}

export type VirtualTableProps = Omit<
  TableProps,
  'pageSize' | 'pagination' | 'pageCount' | 'footer'
> & {
  scroll: { x?: number; y: number }
  itemHeight: number
  wait?: number
}

export enum SortStatusEnum {
  ascend,
  descend,
  origin,
}

export type TableSort = ((a?: any, b?: any) => number) | undefined

export interface ITableOperateParams {
  sorter?: TableSort
  sortStatusMap?: Record<number, SortStatusEnum>
}

export const sortHoverTitle = {
  [SortStatusEnum.ascend]: '点击升序',
  [SortStatusEnum.descend]: '取消排序',
  [SortStatusEnum.origin]: '点击降序',
}

export type SetOperaParams = React.Dispatch<
  React.SetStateAction<ITableOperateParams>
>

export enum CheckEnum {
  off = '1',
  on = '2',
}
