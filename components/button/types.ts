import { HTMLAttributes } from "react"
import { TSize, TBaseColor } from "@/types"

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: TSize
  circle?: boolean
  color?: TBaseColor
  outlined?: boolean
  borderless?: boolean
  disabled?: boolean
  plain?: boolean
  loading?: boolean

  icon?: React.ReactNode
  suffixIcon?: React.ReactNode
}
