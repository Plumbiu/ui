import { keyframes, css } from '@pigment-css/react'

const dropdownEndPoint = {
  transform: 'scale(1)',
}

const topDropdownEndPoint = {
  transform: 'scale(1) translateY(-100%)',
}

const dropdownStartPoint = {
  transform: 'scale(0)',
}

const dropdownAnimation = keyframes({
  '0%': dropdownStartPoint,
  '100%': dropdownEndPoint,
})

const topDropownAnimation = keyframes({
  '0%': dropdownStartPoint,
  '100%': topDropdownEndPoint,
})

export const dropdownHiddenCls = css({
  display: 'none',
  pointerEvents: 'none',
})

export const bottomDropdownAnimationCls = css({
  animation: `125ms ${dropdownAnimation} forwards`,
})
export const topDropdownAnimationCls = css({
  transformOrigin: 'center 100%',
  animation: `125ms ${topDropownAnimation} forwards`,
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
    fontSize: 14,
    minWidth: 120,
    '& > div': {
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: 4,
      transition: 'background-color 0.15s',
      '& + div': {
        marginTop: 2,
      },
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

export const reverseTopDropdownAnimation = keyframes({
  '100%': dropdownStartPoint,
  '0%': topDropdownEndPoint,
})

export const reverseDropdownCls = css({
  animation: `125ms ${reverseDropdownAnimation} forwards`,
})
export const reverseTopDropdownCls = css({
  animation: `125ms ${reverseTopDropdownAnimation} forwards`,
})

export const activeDropownItemCls = css(({ theme }) => ({
  backgroundColor: theme.vars['primary-6'],
  '&:hover': {
    backgroundColor: `${theme.vars['primary-5']}!important`,
  },
}))
