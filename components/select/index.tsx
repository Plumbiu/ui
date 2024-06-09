import { SelectProps } from './types'
import { useMemo, useState } from 'react'
import { clsx } from 'clsx'
import { activeDropownItemCls } from '@/_utils/styles/dropdown'
import MultiSelect from './multiple'
import { useRenderSelect } from './hooks'

const Select: React.FC<SelectProps> = (props) => {
  const { options, onChange, mode, defaultValue, disabled, allowClear } = props
  if (mode === 'multiple') {
    return <MultiSelect {...props} />
  }
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    options?.find((item) => item.value === defaultValue)?.label ?? null,
  )

  const dropdownChildren = useMemo(
    () =>
      options?.map((item) => (
        <div
          key={item.value}
          className={clsx({
            [activeDropownItemCls]: selectedLabel === item.label,
          })}
          onClick={() => {
            setSelectedLabel(item.label)
            onChange?.(item.value)
          }}
        >
          {item.label}
        </div>
      )),
    [options, selectedLabel],
  )

  const returnedNode = useRenderSelect({
    disabled,
    closeCallback: () => setSelectedLabel(null),
    dropdownChildren,
    labelChildren: selectedLabel,
    showCloseIcon: !disabled && allowClear && selectedLabel !== null,
  })

  return returnedNode
}

export default Select
