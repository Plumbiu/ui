import { keyframes, css } from '@pigment-css/react'

export const endPoint = {
  transform: 'rotateX(0)',
}

export const startPoint = {
  transform: 'rotateX(90deg)',
}

export const dropCls = keyframes({
  '0%': startPoint,
  '100%': endPoint,
})

export const reverseDropCls = keyframes({
  '100%': startPoint,
  '0%': endPoint,
})

export const animationDuration = 100

export const dropdownCls = css(({ theme }) => {
  const size = 12
  return {
    position: 'absolute',
    zIndex: 999,
    boxShadow: theme['boxShadow'],
    backgroundColor: theme.vars['background-1'],
    color: theme.vars['text-1'],
    transformOrigin: 'center 0',
    borderRadius: 8,
    padding: 4,
    animation: `${animationDuration}ms ${dropCls} forwards`,
    margin: 'auto',
    fontSize: 14,
    minWidth: 120,
    '& > div': {
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: 4,
      transition: 'background-color 0.15s',
      '&:hover': {
        backgroundColor: theme.vars['info-6'],
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      width: size,
      height: size,
      zIndex: -1,
      top: -size / 2,
      left: '50%',
      transform: `translateX(-${size / 2}px) rotate(45deg)`,
      backgroundColor: theme.vars['background-1'],
      boxShadow: theme['boxShadowTop'],
    },
  }
})

export const reverseAnimationCls = css({
  animation: `0.1s ${reverseDropCls} forwards`,
})
