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

export interface MessageProps {
  duration?: number
  icon?: React.ReactNode
}

const PrefixClsID = 'plumbiu-message-container'
const toasts: { node: React.ReactNode; id: string }[] = []
let mainElm: HTMLDivElement
let root: Root
let idx = 0

const useMessage = (props?: MessageProps) => {
  const { duration = 3000, icon: customIcon } = props ?? {}

  const render = (
    node: React.ReactNode,
    icon: React.ReactNode,
    color: TBaseColor,
  ) => {
    const id = `plumbiu-message-item-${idx++}`
    toasts.push({
      node: (
        <StyledMessageItem className={`plumbiu-message-item ${id}`}>
          <IconWrap color={color}>{customIcon ?? icon}</IconWrap>
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
    if (!mainElm) {
      mainElm = document.createElement('div')
      mainElm.id = PrefixClsID
      root = createRoot(mainElm)
      document.body.appendChild(mainElm)
    }
  }, [])

  const apis = {
    success: (node: React.ReactNode) =>
      render(
        node,
        <MaterialSymbolsCheckCircleRounded fontSize={20} />,
        'success',
      ),
    info: (node: React.ReactNode) =>
      render(node, <MaterialSymbolsInfoRounded fontSize={20} />, 'primary'),
    warning: (node: React.ReactNode) =>
      render(node, <MaterialSymbolsCancel fontSize={20} />, 'warning'),
    destory() {
      root.render(null)
    },
  }

  return [apis]
}

export default useMessage
