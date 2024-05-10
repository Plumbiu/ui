import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  target?: HTMLElement
  portalKey?: string
}

export default function Portal({ children, target, portalKey }: PortalProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted && createPortal(children, target ?? document.body, portalKey)
}
