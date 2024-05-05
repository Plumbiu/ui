import { css } from '@pigment-css/react'

export const fcc_inline = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const fcc = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const transparent_border = css({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'transparent',
})

export const selfStart = css({
  alignSelf: 'flex-start',
})

export const scrollCss = css({
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    backgroundColor: 'transparent',
  },
  '&:hover': {
    backgroundColor: 'inherit',
  },
})
