import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { styled } from '@pigment-css/react'

interface PortalProps {
  children: React.ReactNode
  target?: HTMLElement
  portalKey?: string
}

export function Portal({ children, target, portalKey }: PortalProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted && createPortal(children, target ?? document.body, portalKey)
}

export const StyledUnderlined = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 4,
  paddingBottom: 4,
  '&::after': {
    content: '""',
    position: 'absolute',
    height: 1,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.vars['info-5'],
  },
}))
