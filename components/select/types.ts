type Value = string | number

interface SelectOption {
  label: string
  value: Value
  disbaled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  defaultValue?: Value | Value[]
  onChange?: (value: any) => void
  mode?: 'multiple'
  disabled?: boolean
  allowClear?: boolean
}
