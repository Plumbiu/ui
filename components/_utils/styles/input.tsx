import { css } from '@pigment-css/react'

export const inputWrapperCls = css(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  color: theme.vars['text-1'],
  fontSize: 14,
  height: 30,
  overflow: 'hidden',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.vars['info-4'],
  transition: 'border-color 0.2s,box-shadow 0.2s',
  borderRadius: 4,
}))

export const inputActiveCls = css(({ theme }) => ({
  borderColor: theme['blue-4'],
  boxShadow: `0 0 0 3px ${theme.vars['primary-6']}`,
}))

export const inputDisabledCls = css(({ theme }) => ({
  cursor: 'not-allowed',
  backgroundColor: theme.vars['info-6'],
  color: theme.vars['text-4'],
}))
