interface SelectOption {
  label: string
  value: any
  disbaled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
}