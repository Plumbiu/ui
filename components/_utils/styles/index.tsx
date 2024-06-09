import { css } from '@pigment-css/react'

export const fcc_inline = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
})

export const fcc = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const fcb = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const gap4 = css({
  gap: 4,
})

export const transparent_border = css({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'transparent',
})

export const selfStart = css({
  alignSelf: 'flex-start',
})

export const overflowAutoCss = css({
  overflow: 'auto',
})
export const scrollBarCss = css(({ theme }) => ({
  overflow: 'auto',
  maxHeight: '100vh',
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--scroll-thumb-bg-color) var(--scroll-bg-color)',
  '&::-webkit-scrollbar': {
    display: 'block',
    width: 7.6,
    height: 7.6,
    backgroundColor: 'var(--scroll-bg-color)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--scroll-thumb-bg-color)',
    borderRadius: 4,
    borderRight: '4px solid transparent',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'var(--scroll-thumb-bg-color-active)',
  },
  '&::-webkit-scrollbar-track': {
    padding: '0 2px',
  },
  '&::-webkit-scrollbar-track-piece': {
    backgroundColor: 'var(--scroll-bg-color)',
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'var(--scroll-bg-color)',
  },
}))

export const waveCls = css(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 'inherit',
    opacity: 0,
    boxShadow: `0 0 0 8px ${theme.vars['primary-1']}`,
    transition: '0.75s cubic-bezier(0.08, 0.82, 0.17, 1) 85ms',
  },
  '&:active': {
    '&::after': {
      boxShadow: `0 0 0 0px ${theme['blue-4']}`,
      opacity: 0.4,
      transition: '0s',
    },
  },
}))
