import { css, keyframes, styled } from '@pigment-css/react'

export const fadeIn = keyframes({
  '0%': {
    padding: 0,
    transform: 'translateY(-100%)',
    opacity: 0,
  },
  '100%': {
    padding: '9px 12px',
    transform: 'translateY(0)',
    opacity: 1,
  },
})

export const fadeout = keyframes({
  '0%': {
    transform: 'translateY(0)',
    maxHeight: '100%',
    padding: '9px 12px',
    opacity: 1,
  },
  '100%': {
    transform: 'translateY(-100%)',
    maxHeight: 0,
    padding: 0,
    marginBottom: -16,
    opacity: 0,
  },
})

export const fadeOutCls = css({
  animationName: `${fadeout}!important`,
})

export const StyledMessageItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 4,
  pointerEvents: 'all',
  backgroundColor: theme.vars['background-1'],
  color: theme.vars['text-1'],
  padding: '9px 12px',
  lineHeight: 1.575,
  marginBottom: 16,
  borderRadius: 6,
  fontSize: 14,
  width: 'max-content',
  boxShadow: theme['boxShadow-secondary'],
  animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  animationDuration: '0.2s',
  animationFillMode: 'forwards',
  animationName: fadeIn,
  transform: 'translateY(-16px)',
}))
