export type SelectValue = string | number

interface SelectOption {
  label: string
  value: SelectValue
  disbaled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  defaultValue?: SelectValue | SelectValue[]
  onChange?: (value: any) => void
  mode?: 'multiple'
  disabled?: boolean
  allowClear?: boolean
}
