import { useDropdown } from '@/_utils/hooks'
import { SelectProps } from './types'
import { useMemo, useRef, useState } from 'react'
import {
  inputActiveCls,
  inputDisabledCls,
  inputWrapperCls,
} from '@/_utils/styles/input'
import { clsx } from 'clsx'
import { selectTriggerCls, selectCls, selectIconCls } from './styles'
import {
  IconWrap,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsKeyboardArrowDownRounded,
} from '@/icon'
import { activeDropownItemCls } from '@/_utils/styles/dropdown'

const ArrordownIcon = <MaterialSymbolsKeyboardArrowDownRounded />

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  mode,
  defaultValue,
  disabled,
  allowClear,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    options?.find((item) => item.value === defaultValue)?.label ?? null,
  )
  const showCloseIcon = !disabled && allowClear && selectedLabel !== null
  const CloseIcon = useMemo(
    () => (
      <MaterialSymbolsCloseRounded
        onClick={() => {
          setSelectedLabel(null)
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
    children: options?.map((item) => (
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
    disabled,
  })

  return (
    <div>
      <div
        className={clsx(inputWrapperCls, selectTriggerCls, {
          [inputActiveCls]: isFocus,
          [inputDisabledCls]: disabled,
        })}
      >
        <div ref={triggerRef} className={selectCls}>
          {selectedLabel}
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
  )
}

export default Select
