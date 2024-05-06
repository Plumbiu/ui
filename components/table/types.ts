import { HTMLAttributes } from 'react'
import { TBaseColor } from '..'

export type DefaultData= Record<string, any>
export interface TableColumnTypes<T extends DefaultData> {
  align?: 'left' | 'center' | 'right'
  className?: string | ((key: string) => string)
  colSpan?: number
  fixed?: boolean
  dataIndex: string
  key: string
  render?: (node: string, record: T, index: number) => React.ReactNode
  hidden?: boolean
  width?: string | number
  title: string
  [key: string]: any
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  bordered?: boolean
  color?: TBaseColor
  scroll?: { x?: number | string; y?: number | string }

  columns: TableColumnTypes<any>[]
  dataSource: DefaultData[]
  rowKey?: string
}
