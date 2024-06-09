import { useEventListener } from 'ahooks'
import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Portal } from './components'
import {
  dropdownCls,
  dropdownWithArrowCls,
  reverseDropdownCls,
} from './styles/dropdown'
import { clsx } from 'clsx'

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

interface UseDropdown {
  triggerRef: RefObject<HTMLElement>
  duration?: number
  children?: React.ReactNode
  widthArrow?: boolean
  offsetTop?: number
}

export function useDropdown(props: UseDropdown) {
  const { triggerRef, duration = 200, children, widthArrow, offsetTop } = props

  const formatOffsetTop = offsetTop ?? (widthArrow ? 8 : 4)
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleHidden = useAnimation(
    [{ ref: dropdownRef, cls: reverseDropdownCls }],
    duration,
    () => setOffset(null),
  )
  const rect = useMemo(
    () => triggerRef.current?.getBoundingClientRect(),
    [triggerRef.current],
  )

  useEventListener('click', (e) => {
    if (!rect) {
      return
    }
    const target = e.target
    if (target === triggerRef.current) {
      if (offset) {
        return
      }
      setOffset({
        x: rect.x,
        y: rect.y + rect.height + formatOffsetTop,
      })
    } else {
      handleHidden()
    }
  })

  const node = offset && (
    <Portal>
      <div
        className={clsx(dropdownCls, {
          [dropdownWithArrowCls]: widthArrow,
        })}
        ref={dropdownRef}
        style={{
          inset: `${offset?.y}px auto auto ${offset?.x}px`,
        }}
      >
        {children}
      </div>
    </Portal>
  )

  return {
    offset,
    node,
  }
}
