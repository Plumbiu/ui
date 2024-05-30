import { Fragment, useEffect } from 'react'
import { Root, createRoot } from 'react-dom/client'
import './styles.css'
import { styled } from '@pigment-css/react'
import { fadeIn, fadeOutCls } from './styles'
import { TBaseColor } from '@/types'
import {
  IconWrap,
  MaterialSymbolsInfoRounded,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsCancel,
} from '@/icon'

const StyledMessageItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  pointerEvents: 'all',
  backgroundColor: theme.vars['background-1'],
  color: theme.vars['text-1'],
  padding: '9px 12px',
  borderRadius: 6,
  fontSize: 14,
  boxShadow: theme['boxShadow-secondary'],
  animation: `${fadeIn} 0.2s forwards`,
  transform: 'translateY(-16px)',
}))

interface MessageProps {
  duration?: number
  icon?: React.ReactNode
}

const useMessage = (props?: MessageProps) => {
  const { duration = 3000, icon: customIcon } = props ?? {}
  let idx = 0
  const toasts: { node: React.ReactNode; id: string }[] = []
  let mainElm: HTMLDivElement
  let root: Root

  function commonRender(
    node: React.ReactNode,
    icon: React.ReactNode,
    color: TBaseColor,
  ) {
    const id = `plumbiu-message-item-${idx++}`
    toasts.push({
      node: (
        <StyledMessageItem className={`plumbiu-message-item ${id}`}>
          <IconWrap color={color} size="lg">
            {customIcon ?? icon}
          </IconWrap>
          <div>{node}</div>
        </StyledMessageItem>
      ),
      id,
    })
    root.render(
      toasts.map(({ node, id }) => <Fragment key={id}>{node}</Fragment>),
    )
    setTimeout(() => {
      const toast = toasts.shift()
      if (toast) {
        const elm = mainElm.getElementsByClassName(toast.id)[0]
        if (toasts.length === 0) {
          root.render(null)
          idx = 0
        } else {
          elm?.classList?.add(fadeOutCls)
        }
      }
    }, duration)
  }

  useEffect(() => {
    mainElm = document.createElement('div')
    mainElm.id = 'plumbiu-message-container'
    root = createRoot(mainElm)
    document.body.appendChild(mainElm)
  }, [])

  const apis = {
    success: (node: React.ReactNode) =>
      commonRender(node, <MaterialSymbolsCheckCircleRounded />, 'success'),
    info: (node: React.ReactNode) =>
      commonRender(node, <MaterialSymbolsInfoRounded />, 'primary'),
    warn: (node: React.ReactNode) =>
      commonRender(node, <MaterialSymbolsCancel />, 'warning'),
  }

  return [apis]
}

export default useMessage
