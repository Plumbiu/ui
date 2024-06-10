import { css } from '@pigment-css/react'

export const selectTriggerCls = css(({ theme }) => ({
  outline: 'none',
  cursor: 'cursor',
}))

export const selectCls = css({
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  paddingLeft: 12,
  paddingRight: 64,
  minWidth: 126,
  height: '100%',
  cursor: 'pointer',
})

export const selectItemCls = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const selectIconCls = css(({ theme }) => ({
  position: 'absolute',
  right: 6,
  top: '50%',
  bottom: 0,
  transform: 'translateY(-50%)',
  color: theme.vars['text-4'],
}))

export const multiSelectItemCls = css(({ theme }) => ({
  backgroundColor: theme.vars['info-6'],
  paddingLeft: 6,
  borderRadius: 4,
  paddingTop: 2,
  paddingBottom: 3,
  '&+div': {
    marginLeft: 6,
  },
  '&>span': {
    marginLeft: 3,
    marginRight: 4,
    color: theme.vars['text-3'],
  },
}))
