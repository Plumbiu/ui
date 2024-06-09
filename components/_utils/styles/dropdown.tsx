import { keyframes, css } from '@pigment-css/react'

const dropdownEndPoint = {
  transform: 'rotateX(0)',
}

const dropdownStartPoint = {
  transform: 'rotateX(90deg)',
}

const dropdownAnimation = keyframes({
  '0%': dropdownStartPoint,
  '100%': dropdownEndPoint,
})

export const dropdownCls = css(({ theme }) => {
  return {
    position: 'absolute',
    zIndex: 999,
    boxShadow: theme['boxShadow'],
    backgroundColor: theme.vars['background-1'],
    color: theme.vars['text-1'],
    transformOrigin: 'center 0',
    borderRadius: 8,
    padding: 4,
    animation: `200ms ${dropdownAnimation} forwards`,
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
  }
})

const dropdownArrowSize = 8

export const dropdownWithArrowCls = css(({ theme }) => ({
  '&::after': {
    content: '""',
    position: 'absolute',
    display: 'inline-block',
    width: dropdownArrowSize,
    height: dropdownArrowSize,
    zIndex: -1,
    top: -dropdownArrowSize / 2,
    left: '50%',
    transform: `translateX(-${dropdownArrowSize / 2}px) rotate(45deg)`,
    backgroundColor: theme.vars['background-1'],
    boxShadow: theme['boxShadowTop'],
  },
}))

export const reverseDropdownAnimation = keyframes({
  '100%': dropdownStartPoint,
  '0%': dropdownEndPoint,
})

export const reverseDropdownCls = css({
  animation: `0.1s ${reverseDropdownAnimation} forwards`,
})
