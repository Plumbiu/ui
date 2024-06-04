import { css, styled } from '@pigment-css/react'

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
  color: theme['primary'],
  fontWeight: 500,
  cursor: 'text',
}))

export const beforeCss = css(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -24,
    bottom: 0,
    width: 4,
    borderRadius: 4,
    background: theme['primary'],
  },
}))

export const iconCls = css(({ theme }) => ({
  transition: '0.2s',
}))

export const route90Cls = css({
  transform: 'rotate(180deg)',
})

export const gridAnimationCls = css({
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'max-height 0.2s',
})

export const gridAnimationItemCls = css({
  transition: 'max-height 0.5s!important',
  maxHeight: '100vh'
})
