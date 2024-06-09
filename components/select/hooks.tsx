import { useDropdown } from '@/_utils/hooks'
import {
  IconWrap,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsKeyboardArrowDownRounded,
} from '@/icon'
import { clsx } from 'clsx'
import { useState, useMemo, useRef } from 'react'
import { SelectProps } from './types'
import {
  inputWrapperCls,
  inputActiveCls,
  inputDisabledCls,
} from '@/_utils/styles/input'
import { selectTriggerCls, selectCls, selectIconCls } from './styles'

interface UseRenderSelect {
  disabled?: SelectProps['disabled']
  closeCallback?: () => void
  dropdownChildren?: React.ReactNode
  labelChildren?: React.ReactNode
  showCloseIcon?: boolean
}

const ArrordownIcon = <MaterialSymbolsKeyboardArrowDownRounded />

export function useRenderSelect(params: UseRenderSelect) {
  const {
    disabled,
    closeCallback,
    dropdownChildren,
    labelChildren,
    showCloseIcon,
  } = params
  // const showCloseIcon = !disabled && allowClear && selectedLabel !== null
  const CloseIcon = useMemo(
    () => (
      <MaterialSymbolsCloseRounded
        onClick={() => {
          closeCallback?.()
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
    children: dropdownChildren,
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
          {labelChildren}
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
