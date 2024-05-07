import { css, keyframes, styled } from '@pigment-css/react'
import { IconWrap } from '../icon'
import { fcb } from '../styles'
import Button from '../button'
import React from 'react'
import { useClickAway } from 'ahooks'
import Portal from '../utils/portal'

const modalAnimation = keyframes`
  from {
    opacity: 0;
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
  justifyContent: 'space-between',
  position: 'fixed',
  zIndex: 10000,
  top: '20%',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: 320,
  minHeight: 180,
  backgroundColor: theme.vars['background'],
  borderRadius: 6,
  padding: '8px 16px',
  boxShadow: theme.boxShadow,
  animation: `0.2s ${modalAnimation}`,
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
    console.log(111)

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
          <IconWrap>X</IconWrap>
        </div>
        {renderButton}
      </StyledModal>
    )
    if (mask) {
      node = (
        <StyledMask>
          <div>{node}</div>
        </StyledMask>
      )
    }
    return <Portal target={portal}>{node}</Portal>
  }

  if (!visible) {
    return null
  }

  return renderNode()
}

export default Modal
