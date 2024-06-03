import { css } from '@pigment-css/react'

export const olCls = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  fontSize: 14,
  listStyle: 'none',
  color: theme.vars['text-1'],
  lineHeight: 1.525,
  '& a': {
    display: 'inline-block',
    boxSizing: 'border-box',
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 4,
    transition: '0.2s',
    '&:hover': {
      backgroundColor: theme.vars['info-4'],
      color: theme.vars['text-3'],
    },
  },
}))

export const liCls = css({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
})

export const separatorCls = css({
  marginLeft: 6,
  marginRight: 6,
})

export const grayColor = css(({ theme }) => ({
  color: theme.vars['text-4'],
  '& a': {
    color: theme.vars['text-4'],
  },
}))
