import { keyframes, styled, css } from '@pigment-css/react'

export const showAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const endPointStatus = {
  opacity: 0,
}

export const fadeAnimation = keyframes({
  '100%': endPointStatus,
})

export const fadeCls = css(endPointStatus)

export const StyledMask = styled('div')({
  position: 'fixed',
  overflow: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  transition: 'opacity 0.15s',
  animation: `0.15s ${showAnimation}`,
  lineHeight: 1.575,
  textAlign: 'center',
  '&::after': {
    content: '""',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '100%',
  },
})

export const StyledModal = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
  top: 50,
  textAlign: 'left',
  margin: '0 auto',
  minWidth: 380,
  animation: `0.15s ${showAnimation}`,
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
const GAP = 12

export const titleCls = css(({ theme }) => ({
  fontSize: 16,
  color: theme.vars['text-1'],
}))

export const footerCls = css(({ theme }) => ({
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

export const contentCls = css(({ theme }) => {
  return {
    fontSize: 14,
    paddingBottom: GAP,
    paddingTop: GAP,
    color: theme.vars['text-1'],
  }
})

export const modalHeadCls = css(({ theme }) => ({
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
