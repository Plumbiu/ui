import { css } from '@pigment-css/react'

export const ceilCls = css(({ theme }) => ({
  color: theme['text-1'],
  width: 24,
  height: 24,
  lineHeight: '24px',
  borderRadius: 6,
  textAlign: 'center',
  cursor: 'pointer',
  margin: 4,
  transition: '0.2s',
  backgroundColor: theme['background-1'],
  fontSize: 14,
  fontWeight: 400,
  userSelect: 'none',
}))

export const ceilHoverCls = css(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.vars['info-5'],
  },
}))

export const activeCeilCls = css(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme['primary'],
}))

export const tableCls = css(({ theme }) => ({
  padding: 8,
  borderRadius: 6,
  boxShadow: theme['boxShadow'],
}))

export const actionHeadCls = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 14,
  paddingBottom: 8,
  marginBottom: 3,
  paddingTop: 4,
  textAlign: 'center',
  borderBottom: `1px solid ${theme.vars['info-5']}`,
  gap: 2,
  '& > div': {
    flex: 1,
    fontWeight: 600,
  },
  '& svg': {
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover': {
      color: theme['primary'],
    },
  },
}))

export const actionModeCls = css(({ theme }) => ({
  cursor: 'pointer',
  transition: 'color .2s',
  '&:hover': {
    color: theme.vars['text-3'],
  },
}))

export const tdH50 = css({
  height: 50,
})

export const w60m = css({
  width: 60,
  margin: '17.5px 10px',
})
