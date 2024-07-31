import { css, styled } from '@pigment-css/react'

export const itemWrapCls = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  '&>span+div': {
    marginLeft: 8,
  },
})

export const labelWrapCls = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  '& > span': {
    alignItems: 'center',
    svg: {
      fontSize: 18,
    },
  },
})

export const menuCls = css(({ theme }) => ({
  borderRight: `1px solid ${theme.vars['info-5']}`,
  marginRight: 8,
  paddingRight: 8,
  boxSizing: 'border-box',
}))

export const StyleMenuItem = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  color: theme.vars['text-1'],
  lineHeight: 1.5,
  fontSize: 14,
  cursor: 'pointer',
}))

export const labelCls = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 9,
  paddingRight: 16,
  paddingBottom: 9,
  borderRadius: 6,
  transition: '0.15s',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: theme.vars['info-6'],
  },
}))

export const activeCls = css(({ theme }) => ({
  backgroundColor: theme.vars['primary-6'],
  color: theme['primary'],
  '&:hover': {
    backgroundColor: theme.vars['primary-5'],
  },
}))

export const groupCls = css(({ theme }) => ({
  marginTop: 8,
  marginBottom: 8,
  fontWeight: 500,
  cursor: 'text',
  color: theme.vars['text-4'],
}))

export const iconCls = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  transition: '0.2s',
  marginLeft: 8,
}))

export const route90Cls = css({
  transform: 'rotate(180deg)',
})

export const gridAnimationCls = css({
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'max-height 0.5s',
})

export const gridAnimationItemCls = css({
  transition: 'max-height 0.7s!important',
  maxHeight: '100vh',
})

export const horizontalCls = css(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: theme.vars['info-5'],
  },
}))

export const horizontalWrapperCls = css(({ theme }) => ({
  paddingBottom: 6,
  borderBottomWidth: 2,
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
  transition: '0.5s',
}))

export const horizontalMenuItemCls = css(({ theme }) => ({
  position: 'absolute',
  zIndex: 999,
  right: 0,
  left: 0,
  top: '125%',
  backgroundColor: theme.vars['background-1'],
  borderRadius: 8,
  boxShadow: theme['boxShadow'],
}))

export const activeHorizontalOverflowCls = css(({ theme }) => ({
  overflow: 'hidden',
}))

export const activeHorizontalCls = css(({ theme }) => ({
  borderBottomColor: theme.vars['primary-1'],
}))

export const disabledCls = css(({ theme }) => ({
  color: theme.vars['text-5'],
  cursor: 'not-allowed',
}))

export const collapsecls = css(({ theme }) => ({
  transition: '0.2s',
  width: 0,
  overflow: 'hidden',
}))

export const collapseChildencls = css(({ theme }) => ({
  position: 'absolute',
  left: 'calc(100% + 8px)',
  top: 0,
  boxShadow: theme['boxShadow'],
  borderRadius: 6,
  zIndex: 9999,
  background: theme.vars['background-1'],
}))
