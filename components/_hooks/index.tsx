import { useEffect, useState } from 'react'

export function useMounted() {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])
  return mount
}
