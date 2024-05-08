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
  className?: string
  style?: React.CSSProperties
  maskClosable?: boolean
  mask?: boolean
  maskStyle?: React.CSSProperties
  closable?: boolean
  closeIcon?: React.ReactNode
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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, calc(-50% - 220px))',
  minWidth: 320,
  backgroundColor: theme.vars['background'],
  borderRadius: 8,
  padding: '12px 16px',
  boxShadow: theme.boxShadow,
  animation: `0.2s ${modalAnimation}`,
  '&>div:first-child>span>svg': {
    width: 20,
    fontSize: 20,
  }
}))

const titleCls = css(({ theme }) => ({
  fontSize: 16,
  color: theme.vars['title-1'],
}))

const footerCls = css({
  display: 'flex',
  justifyContent: 'flex-end',
  '& > button': {
    minWidth: 56,
    '&+button': {
      marginLeft: 8,
    },
  },
})

const contentCls = css(({ theme }) => {
  const p = 36
  return {
    position: 'relative',
    fontSize: 14,
    paddingTop: p,
    paddingBottom: p,
    color: theme.vars['text-1'],
    '&::after,&::before': {
      position: 'absolute',
      left: -16,
      right: -16,
      top: p / 3,
      content: '""',
      height: 1,
      backgroundColor: theme.vars['info-5'],
    },
    '&::after': {
      bottom: p / 3,
      top: 'unset',
    }
  }
})

const Modal: React.FC<ModalProps> = (props) => {
  const {
    visible,
    mask = true,
    title,
    footer,
    onOk,
    onCancel,
    onClose,
    portal,
  } = props
  const modalRef = React.useRef<HTMLDivElement>(null)

  useClickAway(() => {
    onClose?.()
  }, modalRef)

  const renderButton =
    footer === undefined ? (
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
    )
  function renderNode() {
    let node: React.ReactNode = (
      <StyledModal ref={modalRef}>
        <div className={fcb}>
          <div className={titleCls}>{title}</div>
          <IconWrap size="lg" hover onClick={() => onClose?.()}>
            <MaterialSymbolsCloseRounded />
          </IconWrap>
        </div>
        <div className={contentCls}>{props.children}</div>
        {renderButton}
      </StyledModal>
    )
    if (mask) {
      node = <StyledMask>{node}</StyledMask>
    }
    return <Portal target={portal}>{node}</Portal>
  }

  if (!visible) {
    return null
  }

  return renderNode()
}

export default Modal
