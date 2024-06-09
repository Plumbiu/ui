import { useDropdown } from '@/_utils/hooks'
import { SelectProps } from './types'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  inputActiveCls,
  inputDisabledCls,
  inputWrapperCls,
} from '@/_utils/styles/input'
import { clsx } from 'clsx'
import { selectTriggerCls, selectCls, selectIconCls } from './styles'
import { IconWrap, MaterialSymbolsCloseRounded } from '@/icon'
import { ArrowDownOutlined } from '@ant-design/icons'
import { activeDropownItemCls } from '@/_utils/styles/dropdown'

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
  const [showCloseIcon, setShowCloseIcon] = useState(false)

  useEffect(() => {
    onChange?.(selectedLabel)
  }, [selectedLabel])

  const iconNode = useMemo(() => {
    if (!allowClear) {
      return <ArrowDownOutlined />
    }
    if (showCloseIcon && allowClear && selectedLabel) {
      return (
        <MaterialSymbolsCloseRounded
          onMouseLeave={() => setShowCloseIcon(false)}
          onClick={() => {
            setSelectedLabel(null)
          }}
        />
      )
    }
    return (
      <ArrowDownOutlined
        onMouseEnter={() => setShowCloseIcon(true)}
      />
    )
  }, [allowClear, selectedLabel, showCloseIcon])

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
          size="sm"
          className={selectIconCls}
          hoverBg={!disabled && showCloseIcon && !!selectedLabel}
        >
          {iconNode}
        </IconWrap>
      </div>
      {node}
    </div>
  )
}

export default Select
