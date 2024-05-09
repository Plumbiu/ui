import { css, keyframes, styled } from '@pigment-css/react'
import { IconWrap, MaterialSymbolsCloseRounded } from '../icon'
import { fcb } from '../_styles/css'
import Button from '../button'
import React from 'react'
import { useClickAway } from 'ahooks'
import Portal from '../_common/portal'

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
  destoryOnClose?: boolean
  onClose?: () => void
  onOk?: () => void
  okText?: string
  onCancel?: () => void
  cancelText?: string
  portal?: HTMLElement
  title?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  width?: number | string
  height?: number | string
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
}

const StyledMask = styled('div')({
  position: 'fixed',
  overflow: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
})

const StyledModal = styled('div')(({ theme }) => ({
  margin: '0 auto',
  marginTop: '7vh',
  marginBottom: '3vh',
  minWidth: 380,
  width: 'max-content',
  backgroundColor: theme.vars['background'],
  borderRadius: 8,
  padding: '12px 16px',
  boxShadow: theme.boxShadow,
  animation: `0.2s ${modalAnimation}`,
  '&>div:first-child>span>svg': {
    width: 20,
    fontSize: 20,
  },
}))

const titleCls = css(({ theme }) => ({
  fontSize: 16,
  color: theme.vars['title-1'],
}))

const footerCls = css({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
  paddingTop: GAP,
  '& > button': {
    minWidth: 56,
    '&+button': {
      marginLeft: 8,
    },
  },
})

const contentCls = css(({ theme }) => {
  return {
    fontSize: 14,
    paddingBottom: GAP,
    color: theme.vars['text-1'],
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

const Modal: React.FC<ModalProps> = (props) => {
  const {
    visible,
    mask = true,
    maskZIndex,
    zIndex,
    title,
    footer,
    destoryOnClose,
    closable = true,
    maskClosable = true,
    onOk,
    okText = '确定',
    style,
    maskStyle,
    onCancel,
    width,
    height,
    cancelText = '取消',
    onClose,
    portal,
  } = props
  const modalRef = React.useRef<HTMLDivElement>(null)
  console.log(style)

  useClickAway(() => {
    if (maskClosable) {
      onClose?.()
    }
  }, modalRef)

  let node: React.ReactNode = (
    <StyledMask
      style={{
        ...maskStyle,
        zIndex: maskZIndex,
        width,
        height,
        backgroundColor: mask ? 'rgba(0, 0, 0, 0.45)' : 'transparent',
      }}
    >
      <StyledModal style={{ ...style, zIndex }} ref={modalRef}>
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

  if (!visible && destoryOnClose) {
    node = null
  }

  return visible ? <Portal target={portal}>{node}</Portal> : null
}

export default Modal
