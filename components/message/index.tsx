import { Fragment, useEffect } from 'react'
import { Root, createRoot } from 'react-dom/client'
import './styles.css'
import { StyledMessageItem, fadeOutCls } from './styles'
import { TBaseColor } from '@/types'
import {
  IconWrap,
  MaterialSymbolsInfoRounded,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsCancel,
} from '@/icon'

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
