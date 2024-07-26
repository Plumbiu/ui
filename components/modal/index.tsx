import React, { useEffect, useRef } from 'react'
import { useUpdateEffect } from 'ahooks'
import {
  StyledModal,
  contentCls,
  footerCls,
  modalHeadCls,
  titleCls,
  fadeCls,
} from './styles'
import { IconWrap, MaterialSymbolsCloseRounded } from '@/icon'
import { fcb } from '@/_utils/styles'
import Button from '@/button'
import { Portal, StyledMask } from '@/_utils/components'
import { useAnimation } from '@/_utils/hooks'

export interface ModalProps {
  visible?: boolean
  onClose?: () => void
  onOk?: () => void
  okText?: string
  destoryOnClose?: boolean
  onCancel?: () => void
  cancelText?: string
  portal?: HTMLElement
  title?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  width?: number | string
  centered?: boolean
  style?: React.CSSProperties
  maskClosable?: boolean
  mask?: boolean
  maskStyle?: React.CSSProperties
  closable?: boolean
  closeIcon?: React.ReactNode
  maskZIndex?: number
  zIndex?: number
  wrapClassName?: string
  keyboard?: boolean
  top?: number
}

const closesFn = new Set<(() => void) | undefined>()

let visibleCount = 0

const Modal: React.FC<ModalProps> & {
  distoryAll: () => void
} = (props) => {
  const {
    visible,
    mask = true,
    zIndex = 9999,
    destoryOnClose = false,
    maskStyle = {},
    portal,
    title,
    footer,
    closable = true,
    maskClosable = true,
    onOk,
    okText = '确定',
    style = {},
    onCancel,
    centered,
    width,
    cancelText = '取消',
    onClose: customOnClose,
    keyboard = true,
    top,
  } = props

  const maskRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  let modalStyles: React.CSSProperties = {
    ...style,
    width,
    top,
  }
  const maskStyles: React.CSSProperties = {
    ...maskStyle,
    zIndex: zIndex + closesFn.size,
    backgroundColor: mask ? 'rgba(0, 0, 0, 0.45)' : 'transparent',
  }

  if (centered) {
    modalStyles = {
      ...modalStyles,
      top: 0,
      verticalAlign: 'middle',
    }
  }

  const onClose = useAnimation(
    [
      {
        ref: modalRef,
        cls: fadeCls,
      },
      {
        ref: maskRef,
        cls: fadeCls,
      },
    ],
    150,
    () => {
      closesFn.delete(customOnClose)
      customOnClose?.()
    },
  )

  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!maskClosable) {
      return
    }
    if (e.target === maskRef.current) {
      onClose()
    }
  }

  function handleESC(e: KeyboardEvent) {
    e.preventDefault()
    if (visible && e.key === 'Escape') {
      onClose?.()
    }
  }

  useEffect(() => {
    keyboard && window.addEventListener('keyup', handleESC)
    return () => {
      keyboard && window.removeEventListener('keyup', handleESC)
    }
  }, [onClose])

  useUpdateEffect(() => {
    closesFn.add(onClose)
    if (visible) {
      visibleCount++
      document.body.style.overflow = 'hidden'
    } else {
      visibleCount--
      if (visibleCount <= 0) {
        document.body.style.overflow = ''
      }
    }
  }, [visible])

  let children: React.ReactNode = (
    <StyledMask ref={maskRef} onClick={handleClose} style={maskStyles}>
      <StyledModal ref={modalRef} style={modalStyles}>
        <div className={`${fcb} ${modalHeadCls}`}>
          <div className={titleCls}>{title}</div>
          {closable ? (
            <IconWrap size="lg" hover onClick={() => onClose?.()}>
              <MaterialSymbolsCloseRounded />
            </IconWrap>
          ) : null}
        </div>
        <div className={contentCls}>{props.children}</div>
        {footer === undefined ? (
          <div className={footerCls}>
            <Button
              type="primary"
              onClick={() => {
                onClose?.()
                onOk?.()
              }}
            >
              {okText}
            </Button>
            <Button
              onClick={() => {
                onClose?.()
                onCancel?.()
              }}
            >
              {cancelText}
            </Button>
          </div>
        ) : (
          footer
        )}
      </StyledModal>
    </StyledMask>
  )
  if (!visible) {
    if (destoryOnClose) {
      children = null
    }
    maskStyles.display = 'none'
  }

  const node = <Portal target={portal}>{children}</Portal>

  return node
}

Modal.distoryAll = () => {
  closesFn.forEach((fn) => fn && fn())
  closesFn.clear()
}

export default Modal
