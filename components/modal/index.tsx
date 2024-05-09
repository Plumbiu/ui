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
  onCancel?: () => void
  portal?: HTMLElement
  title?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  width?: number
  height?: number
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
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
})

const StyledModal = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  justifyContent: 'space-between',
  position: 'fixed',
  zIndex: 10000,
  top: '8vh',
  left: '50%',
  transform: 'translate(-50%)',
  minWidth: 320,
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
    position: 'relative',
    fontSize: 14,
    paddingTop: GAP,
    paddingBottom: GAP,
    color: theme.vars['text-1'],
    '&::after,&::before': {
      content: '""',
      position: 'absolute',
      left: -16,
      right: -16,
      top: 0,
      bottom: 0,
      height: 1,
      backgroundColor: theme.vars['info-5'],
    },
    '&::after': {
      bottom: 0,
      top: 'unset',
    },
  }
})

const modalHeadCls = css({
  marginBottom: GAP,
})

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
    onCancel,
    onClose,
    portal,
  } = props
  const modalRef = React.useRef<HTMLDivElement>(null)

  useClickAway(() => {
    if (maskClosable) {
      onClose?.()
    }
  }, modalRef)

  let node: React.ReactNode = (
    <StyledModal style={{ zIndex }} ref={modalRef}>
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
            确认
          </Button>
          <Button
            onClick={() => {
              onClose?.()
              onCancel?.()
            }}
            outlined
          >
            取消
          </Button>
        </div>
      ) : (
        footer
      )}
    </StyledModal>
  )

  if (mask) {
    node = (
      <div>
        <StyledMask style={{ zIndex: maskZIndex }} />
        {node}
      </div>
    )
  }

  if (!visible && destoryOnClose) {
    node = null
  }

  return visible ? <Portal target={portal}>{node}</Portal> : null
}

export default Modal
