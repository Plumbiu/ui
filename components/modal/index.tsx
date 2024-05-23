import { css, keyframes, styled } from '@pigment-css/react'
import React, { useRef } from 'react'
import { useEventListener, useUpdateEffect } from 'ahooks'
import { IconWrap, MaterialSymbolsCloseRounded } from '@/icon'
import { fcb } from '@/_styles'
import Button from '@/button'
import { Portal } from '@/_common'

// eslint-disable-next-line @stylistic/template-tag-spacing
const modalAnimation = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`

const GAP = 12
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

const StyledMask = styled('div')({
  position: 'fixed',
  overflow: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  lineHeight: 1.575,
  animation: `0.15s ${modalAnimation}`,
  textAlign: 'center',
  '&::after': {
    content: '""',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '100%',
  },
})

const StyledModal = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
  top: 50,
  textAlign: 'left',
  margin: '0 auto',
  minWidth: 380,
  maxWidth: 'calc(100vw - 32px)',
  width: 'max-content',
  backgroundColor: theme.vars['background-1'],
  borderRadius: 8,
  padding: '12px 16px',
  boxShadow: theme.boxShadow,
  '&>div:first-child>span>svg': {
    width: 20,
    fontSize: 20,
  },
}))

const titleCls = css(({ theme }) => ({
  fontSize: 16,
  color: theme.vars['title-1'],
}))

const footerCls = css(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
  paddingTop: GAP,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: -16,
    right: -16,
    top: 0,
    height: 1,
    backgroundColor: theme.vars['info-5'],
  },
  '& > button': {
    minWidth: 56,
    '&+button': {
      marginLeft: 8,
    },
  },
}))

const contentCls = css(({ theme }) => {
  return {
    fontSize: 14,
    paddingBottom: GAP,
    paddingTop: GAP,
    color: theme.vars['text-1'],
  }
})

const modalHeadCls = css(({ theme }) => ({
  paddingBottom: GAP,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: -16,
    right: -16,
    bottom: 0,
    height: 1,
    backgroundColor: theme.vars['info-5'],
  },
}))

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

  const onClose = () => {
    closesFn.delete(customOnClose)
    customOnClose?.()
  }

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

  useEventListener(
    'click',
    (e) => {
      if (!maskClosable) {
        return
      }
      if (e.target === modalRef.current) {
        onClose()
      }
    },
    {
      target: modalRef,
    },
  )

  function handleESC(e: KeyboardEvent) {
    e.preventDefault()
    if (visible && keyboard && e.key === 'Escape') {
      onClose?.()
    }
  }

  useEventListener('keyup', handleESC)

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
    <StyledMask ref={modalRef} style={maskStyles} key={closesFn.size}>
      <StyledModal style={modalStyles}>
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
              outlined
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
