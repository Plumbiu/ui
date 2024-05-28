import { css, styled } from '@pigment-css/react'
import { ButtonProps } from './types'

// @ts-ignore
export const StyledButton = styled('button')<ButtonProps>(({ theme }) => {
  const primaryColor = theme['primary']
  const primaryHoverColor = primaryColor + 'd8'
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
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      borderRadius: 'inherit',
      opacity: 0,
      boxShadow: `0 0 0 8px ${primaryColor}`,
      transition: '0.2s',
    },
    variants: [
      {
        props: { borderless: true },
        style: {
          border: 'none',
        },
      },
      {
        props: { borderless: false },
        style: {
          boxShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
        },
      },
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
        props: { circle: true },
        style: {
          borderRadius: '50%',
          aspectRatio: 1,
          padding: 6,
        },
      },
      {
        props: ({ disabled, borderless, loading }) =>
          !borderless && !disabled && !loading,
        style: {
          '&:active': {
            '&::after': {
              boxShadow: `0 0 0 1px ${primaryColor}`,
              opacity: 0.3,
              transition: '0s',
            },
          },
        },
      },
      {
        props: ({ disabled, type, loading }) =>
          type !== 'primary' && !disabled && !loading,
        style: {
          '&:hover': {
            color: primaryColor,
            borderColor: primaryColor,
          },
        },
      },
      {
        props: ({ disabled, type, loading }) =>
          (type === 'primary' || loading) && !disabled,
        style: {
          '&:hover': {
            backgroundColor: primaryHoverColor,
          },
        },
      },
      {
        props: ({ disabled, borderless }) => borderless && !disabled,
        style: {
          '&:hover': {
            backgroundColor: primaryHoverColor,
          },
        },
      },
      {
        props: { disabled: true },
        style: {
          backgroundColor: `${theme.vars['info-6']}!important`,
          color: `${theme.vars['text-4']}!important`,
          cursor: 'not-allowed',
          borderColor: `${theme.vars['info-3']}!important`,
        },
      },
      {
        props: { loading: true },
        style: {
          opacity: 0.5,
          '&:hover': {
            opacity: 0.4,
          },
          '&:active': {
            opacity: 0.7,
          },
        },
      },
    ],
  }
})

export const primaryButtonCls = css(({ theme }) => ({
  backgroundColor: theme['primary'],
  color: 'white',
  borderColor: 'transparent',
}))

export const defaultButtonCls = css(({ theme }) => {
  return {
    borderColor: theme.vars['info-3'],
  }
})
