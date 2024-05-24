import { useLayoutEffect, useState } from 'react'

export default function useMeature() {
  const [renderTime, setRenderTime] = useState(0)
  const [startTime] = useState(performance.now())

  useLayoutEffect(() => {
    const endTime = performance.now()
    setRenderTime(endTime - startTime)
  }, [startTime])
  return renderTime
}
