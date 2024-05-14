import { HTMLAttributes } from 'react'
import { TBaseColor } from '..'

export type DefaultData = Record<'key' | string, any>
export interface TableColumnTypes<T extends DefaultData> {
  align?: 'left' | 'center' | 'right'
  className?: string
  colSpan?: number
  rowSpan?: number
  dataIndex?: string
  key?: string
  fixed?: boolean | 'right' | 'left'
  zIndex?: number
  render?: (
    row: T,
    column: TableColumnTypes<T>,
    rowIndex: number,
    colIndex: number,
  ) => React.ReactNode
  hidden?: boolean
  width?: string | number
  title: string
  [key: string]: any
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  bordered?: boolean
  color?: TBaseColor
  scroll?: { x?: number; y?: number }
  headZIndex?: number
  fixed?: boolean

  columns: TableColumnTypes<any>[]
  dataSource: DefaultData[]
  rowKey?: string
  footer?: React.ReactNode
}
