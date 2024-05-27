import { RefObject, useEffect, useState } from 'react'

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
  function fn() {
    for (const { ref, cls } of formatPrams) {
      if (ref.current) {
        ref.current.classList.add(cls)
      }
    }
    const timer = setTimeout(() => {
      for (const { ref, cls } of formatPrams) {
        if (ref.current) {
          ref.current.classList.remove(cls)
        }
      }
      cb?.()
      clearTimeout(timer)
    }, wait)
  }

  return fn
}
