interface SelectOption {
  label: string
  value: string | number
  disbaled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  defaultValue?: string | number
  onChange?: (value: any) => void
  mode?: 'multiple'
  disabled?: boolean
  allowClear?: boolean
}