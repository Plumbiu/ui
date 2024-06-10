import { css, styled } from '@pigment-css/react'
import { ButtonProps } from './types'

export const StyledButton = styled('button')<ButtonProps>(({ theme }) => {
  return {
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    color: theme.vars['text-1'],
    transition: '0.175s',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: '4px 15px',
    fontSize: 14,
    lineHeight: 1,
    gap: 4,
    height: 32,
    borderRadius: 6,
    boxShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
    variants: [
      {
        props: { size: 'lg' },
        style: {
          height: 40,
          fontSize: 16,
          borderRadius: 8,
        },
      },
      {
        props: { size: 'sm' },
        style: {
          height: 22,
          padding: '0 7px',
          borderRadius: 4,
        },
      },
      {
        props: { disabled: true },
        style: {
          backgroundColor: '#e9e9eb!important',
          color: `${theme['gray-5']}!important`,
          cursor: 'not-allowed',
          borderColor: `${theme['gray-3']}!important`,
        },
      },
    ],
  }
})

export const loadingCls = css(({}) => ({
  opacity: 0.5,
  '&:hover': {
    opacity: 0.4,
  },
  '&:active': {
    opacity: 0.7,
  },
}))

export const circleCls = css(({}) => ({
  borderRadius: '50%',
  aspectRatio: 1,
  padding: 6,
}))

export const primaryButtonCls = css(({ theme }) => ({
  backgroundColor: theme['blue-4'],
  color: 'white',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: theme['blue-4'] + 'd8',
  },
}))

export const borderlessCls = css(({ theme }) => ({
  border: 'none',
  boxShadow: 'none',
}))

export const defaultButtonCls = css(({ theme }) => {
  const primaryColor = theme['blue-4']
  return {
    borderColor: theme['gray-3'],
    '&:hover': {
      color: primaryColor,
      borderColor: primaryColor,
    },
  }
})
