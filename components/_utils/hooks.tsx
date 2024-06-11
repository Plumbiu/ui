import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { clsx } from 'clsx'
import { Portal } from './components'
import {
  dropdownCls,
  dropdownHiddenCls,
  dropdownWithArrowCls,
  reverseDropdownCls,
  reverseTopDropdownCls,
  topDropdownAnimationCls,
} from './styles/dropdown'

export function useMounted() {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])
  return mount
}

interface IUseAnimation<T extends HTMLDivElement> {
  ref: RefObject<T>
  cls: string
}

export function useAnimation<T extends HTMLDivElement>(
  params: IUseAnimation<T> | IUseAnimation<T>[],
  wait: number,
  cb?: () => void,
) {
  const formatPrams = Array.isArray(params) ? params : [params]
  const mounted = useMounted()
  const fn = useCallback(() => {
    if (!mounted) {
      return
    }
    for (const { ref, cls } of formatPrams) {
      if (ref.current) {
        ref.current.classList.add(cls)
      }
    }
    setTimeout(() => {
      for (const { ref, cls } of formatPrams) {
        if (ref.current) {
          ref.current.classList.remove(cls)
        }
      }
      cb?.()
    }, wait)
  }, [params, wait, cb, mounted])

  return fn
}

type Placement =
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
    [{ ref: dropdownRef, cls: placement === 'top' ? reverseTopDropdownCls : reverseDropdownCls }],
    150,
    () => setOffset(null),
  )
  const rect = useMemo(
    () => triggerRef.current?.getBoundingClientRect(),
    [triggerRef.current],
  )

  const handleSetOffset = () => {
    if (!rect) {
      return
    }
    if (placement === 'top') {
      setOffset({
        x: rect.x,
        y: rect.y - formatOffsetTop,
      })
    } else {
      setOffset({
        x: rect.x,
        y: rect.y + rect.height + formatOffsetTop,
      })
    }
  }

  const hanleClick = (e: MouseEvent) => {
    if (!rect || disabled) {
      return
    }
    const target = e.target as Node

    if (triggerRef.current?.contains(target)) {
      if (offset) {
        handleHidden()
      } else {
        handleSetOffset()
      }
      setIsFocus(true)
    } else {
      setIsFocus(!!dropdownRef.current?.contains(target))
      handleHidden()
    }
  }

  useEffect(() => {
    window.addEventListener('click', hanleClick)
    return () => window.removeEventListener('click', hanleClick)
  }, [rect, dropdownRef.current])

  const node = (
    <Portal>
      <div
        className={clsx(dropdownCls, {
          [dropdownWithArrowCls]: widthArrow,
          [dropdownHiddenCls]: !offset,
          [topDropdownAnimationCls]: placement === 'top',
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
