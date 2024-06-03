import { css } from '@pigment-css/react'

export const dividerWrapper = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minWidth: '100%',
  marginTop: 24,
  marginBottom: 24,
  whiteSpace: 'nowrap',
  fontWeight: 500,
  '&::after,&::before': {
    content: '""',
    display: 'inline-block',
    width: '50%',
    height: 1,
    backgroundColor: theme.vars['info-5'],
  },
}))

export const shrinkWidth = {
  width: '5%',
}
export const growWidth = {
  width: '95%',
}

export const orientationLeftCls = css(({ theme }) => ({
  '&::before': shrinkWidth,
  '&::after': growWidth,
}))

export const orientationRightCls = css(({ theme }) => ({
  '&::before': growWidth,
  '&::after': shrinkWidth,
}))

export const dividerCls = css(({ theme }) => ({
  textAlign: 'center',
  paddingLeft: 16,
  paddingRight: 16,
  whiteSpace: 'nowrap',
}))

export const plainCls = css({
  fontSize: 14,
  fontWeight: 400,
})

export const dashedCls = css(({ theme }) => ({
  '&::after,&::before': {
    background: `linear-gradient(
      to left,
      transparent 0%,
      transparent 50%,
      ${theme.vars['info-5']} 50%,
      ${theme.vars['info-5']} 100%
    )`,
    backgroundSize: '5px 1px',
    backgroundRepeat: 'repeat-x',
  },
}))

export const verticalCls = css(({ theme }) => ({
  position: 'relative',
  top: '-0.06em',
  display: 'inline-block',
  height: '0.9em',
  marginLeft: 8,
  marginRight: 8,
  verticalAlign: 'middle',
  width: 1,
  backgroundColor: theme.vars['info-5'],
}))
