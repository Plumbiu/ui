import { useEventListener } from 'ahooks'
import { clsx } from 'clsx'
import { RefObject, useState, useRef } from 'react'
import { Portal } from '../components'
import { useAnimation } from '../hooks'
import {
  reverseTopDropdownCls,
  reverseDropdownCls,
  dropdownCls,
  dropdownWithArrowCls,
  dropdownHiddenCls,
  topDropdownAnimationCls,
  bottomDropdownAnimationCls,
} from './styles'

export type Placement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'

interface UseDropdown {
  triggerRef: RefObject<HTMLElement>
  children?: React.ReactNode
  widthArrow?: boolean
  offsetTop?: number
  disabled?: boolean
  placement?: Placement
}

function getPlacement(placement: Placement | undefined) {
  if (placement) {
    return placement.startsWith('top') ? 'top' : 'bottom'
  }
  return 'bottom'
}

export function useDropdown(props: UseDropdown) {
  const { triggerRef, children, widthArrow, offsetTop, disabled } = props

  if (disabled) {
    return {}
  }
  const placement = getPlacement(props.placement)
  const formatOffsetTop = offsetTop ?? (widthArrow ? 8 : 4)
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null)
  const [isFocus, setIsFocus] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleHidden = useAnimation(
    [
      {
        ref: dropdownRef,
        cls: placement === 'top' ? reverseTopDropdownCls : reverseDropdownCls,
      },
    ],
    225,
    () => setOffset(null),
  )

  useEventListener('click', (e) => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }
    const target = e.target as Node

    if (triggerRef.current?.contains(target)) {
      if (offset) {
        handleHidden()
      } else {
        setOffset({
          x: rect.x,
          y:
            rect.y +
            (placement === 'top'
              ? -formatOffsetTop
              : rect.height + formatOffsetTop),
        })
      }
      setIsFocus(true)
    } else {
      setIsFocus(!!dropdownRef.current?.contains(target))
      handleHidden()
    }
  })

  const node = (
    <Portal>
      <div
        className={clsx(dropdownCls, {
          [dropdownWithArrowCls]: widthArrow,
          [dropdownHiddenCls]: !offset,
          [topDropdownAnimationCls]: placement === 'top',
          [bottomDropdownAnimationCls]: placement === 'bottom',
        })}
        ref={dropdownRef}
        style={{
          top: offset?.y,
          left: offset?.x,
        }}
      >
        {children}
      </div>
    </Portal>
  )

  return {
    offset,
    node,
    isFocus,
  }
}
