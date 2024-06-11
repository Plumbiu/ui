import { memo, useContext, useMemo, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { SelectProps, SelectValue } from './types'
import { SelectContext } from './context'
import {
  multiSelectItemCls,
  selectCls,
  selectIconCls,
  selectItemCls,
  selectTriggerCls,
} from './styles'
import { activeDropownItemCls } from '@/_utils/styles/dropdown'
import {
  IconWrap,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsKeyboardArrowDownRounded,
} from '@/icon'
import { useDropdown } from '@/_utils/hooks'
import {
  inputWrapperCls,
  inputActiveCls,
  inputDisabledCls,
} from '@/_utils/styles/input'

const ArrordownIcon = <MaterialSymbolsKeyboardArrowDownRounded />

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
      {isActive && mode === 'multiple' && (
        <IconWrap color="primary" size="lg">
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

  const CloseIcon = useMemo(
    () => (
      <MaterialSymbolsCloseRounded
        onClick={() => {
          setSelectedLabel([])
          setIconNode(ArrordownIcon)
        }}
      />
    ),
    [],
  )
  const [iconNode, setIconNode] = useState(ArrordownIcon)
  const triggerRef = useRef<HTMLDivElement>(null)
  const { node, isFocus } = useDropdown({
    triggerRef,
    children: <DropdownChildren options={options} onChange={onChange} />,
    disabled,
  })

  const showCloseIcon = !disabled && allowClear && selectedLabel !== null

  return (
    <SelectContext.Provider
      value={{
        selectedLabel,
        setSelectedLabel,
        mode,
        options,
      }}
    >
      <div>
        <div
          className={clsx(inputWrapperCls, selectTriggerCls, {
            [inputActiveCls]: isFocus,
            [inputDisabledCls]: disabled,
          })}
        >
          <div
            ref={triggerRef}
            className={selectCls}
            style={{
              paddingLeft: mode === 'multiple' ? 6 : undefined,
            }}
          >
            {selectedLabel.map((item) => (
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
                      setSelectedLabel(
                        selectedLabel.filter((label) => label !== item),
                      )
                    }}
                  >
                    <MaterialSymbolsCloseRounded />
                  </IconWrap>
                )}
              </div>
            ))}
          </div>
          <IconWrap
            className={selectIconCls}
            hoverBg={showCloseIcon}
            onMouseEnter={() => {
              if (showCloseIcon) {
                setIconNode(CloseIcon)
              }
            }}
            onMouseLeave={() => {
              setIconNode(ArrordownIcon)
            }}
          >
            {iconNode}
          </IconWrap>
        </div>
        {node}
      </div>
    </SelectContext.Provider>
  )
}

export type { SelectProps } from './types'

export default Select
