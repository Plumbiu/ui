import { css, styled } from '@pigment-css/react'

export const labelWrapCls = css({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  '& > span': {
    display: 'flex',
    alignItems: 'center',
    svg: {
      fontSize: 16,
    },
  },
})

export const menuCls = css(({ theme }) => ({
  borderRight: `1px solid ${theme.vars['info-5']}`,
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
  marginLeft: 6,
}))

export const route90Cls = css({
  transform: 'rotate(180deg)',
})

export const chilrenBgcCls = css({
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
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
  overflow: 'unset',
}))

export const horizontalWrapperCls = css(({ theme }) => ({
  paddingBottom: 6,
  borderBottomWidth: 2,
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
  transition: '0.5s',
}))

export const activeHorizontalCls = css(({ theme }) => ({
  borderBottomColor: theme.vars['primary-1']
}))