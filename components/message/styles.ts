import { css, keyframes } from '@pigment-css/react'

export const startPoint = {
  opacity: 0,
  transform: 'translateY(-8px)',
}

export const endPoint = {
  opacity: 1,
  transform: 'translateY(0)',
}

export const fadeIn = keyframes({
  0: startPoint,
  '100%': endPoint,
})

export const fadeout = keyframes({
  0: endPoint,
  '100%': startPoint,
})

export const fadeOutCls = css({
  animation: `${fadeout} 0.2s forwards!important`,
})
