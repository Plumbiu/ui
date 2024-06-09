import { css } from '@pigment-css/react'

export const selectTriggerCls = css(({ theme }) => ({
  outline: 'none',
  cursor: 'cursor',
}))

export const selectCls = css({
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  padding: '0 12px',
  minWidth: 126,
  height: '100%',
})

export const selectIconCls = css(({ theme }) => ({
  position: 'absolute',
  right: 6,
  top: '50%',
  bottom: 0,
  transform: 'translateY(-50%)',
  color: theme.vars['text-4'],
}))
