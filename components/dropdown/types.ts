import { Placement } from '@/_utils/dropdown'

export interface DropdownProps {
  children: React.ReactNode
  menu?: any
  placement?: Placement
}

export interface Offset {
  x: number
  y: number
}
