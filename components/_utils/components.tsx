import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { keyframes, styled } from '@pigment-css/react'

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

export const maskShowAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const StyledMask = styled('div')({
  position: 'fixed',
  overflow: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  transition: 'opacity 0.15s',
  animation: `0.15s ${maskShowAnimation}`,
  lineHeight: 1.575,
  textAlign: 'center',
  '&::after': {
    content: '""',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '100%',
  },
})
