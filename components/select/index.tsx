import { memo, useContext, useState } from 'react'
import { clsx } from 'clsx'
import { SelectProps, SelectValue } from './types'
import { useRenderSelect } from './hooks'
import { SelectContext } from './context'
import { multiSelectItemCls, selectItemCls } from './styles'
import { activeDropownItemCls } from '@/_utils/styles/dropdown'
import {
  IconWrap,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsCloseRounded,
} from '@/icon'

const SelectItem: React.FC<{
  item: SelectProps['options'][number]
  onChange: SelectProps['onChange']
}> = ({ item, onChange }) => {
  const { selectedLabel, setSelectedLabel, mode, options } =
    useContext(SelectContext)!
  const isActive = selectedLabel.includes(item.label)
  return (
    <div
      className={clsx(selectItemCls, {
        [activeDropownItemCls]: isActive,
      })}
      onClick={() => {
        if (mode === undefined) {
          setSelectedLabel([item.label])
          onChange?.(item.value)
          return
        }
        const newSelectedLabel = isActive
          ? selectedLabel.filter((label) => label !== item.label)
          : [...selectedLabel, item.label]
        newSelectedLabel.sort((a, b) => {
          const aIdx = options?.findIndex((item) => item.label == a)
          const bIdx = options?.findIndex((item) => item.label == b)
          return aIdx - bIdx
        })
        setSelectedLabel(newSelectedLabel)
        onChange?.(newSelectedLabel)
      }}
    >
      {item.label}
      {isActive && (
        <IconWrap color="primary">
          <MaterialSymbolsCheckCircleRounded />
        </IconWrap>
      )}
    </div>
  )
}

const DropdownChildren: React.FC<{
  options: SelectProps['options']
  onChange: SelectProps['onChange']
}> = memo(({ options, onChange }) => {
  return options?.map((item) => (
    <SelectItem key={item.label} item={item} onChange={onChange} />
  ))
})

const Select: React.FC<SelectProps> = (props) => {
  const { options, onChange, defaultValue, disabled, allowClear, mode } = props
  const [selectedLabel, setSelectedLabel] = useState<SelectValue[]>(
    options
      ?.filter((item) => {
        if (Array.isArray(defaultValue)) {
          return defaultValue.includes(item.value)
        }
        return item.value === defaultValue
      })
      ?.map((item) => item.label) ?? [],
  )
  const returnedNode = useRenderSelect({
    disabled,
    closeCallback: () => setSelectedLabel([]),
    dropdownChildren: (
      <DropdownChildren options={options} onChange={onChange} />
    ),
    labelChildren: selectedLabel.map((item) => (
      <div
        className={clsx({
          [multiSelectItemCls]: mode === 'multiple',
        })}
        key={item}
      >
        {item}
        {mode === 'multiple' && (
          <IconWrap
            hoverBg
            size="sm"
            onClick={() => {
              setSelectedLabel(selectedLabel.filter((label) => label !== item))
            }}
          >
            <MaterialSymbolsCloseRounded />
          </IconWrap>
        )}
      </div>
    )),
    showCloseIcon: !disabled && allowClear && selectedLabel !== null,
  })

  return (
    <SelectContext.Provider
      value={{
        selectedLabel,
        setSelectedLabel,
        mode,
        options,
      }}
    >
      {returnedNode}
    </SelectContext.Provider>
  )
}

export default Select
