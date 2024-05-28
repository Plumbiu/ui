import { css, styled } from '@pigment-css/react'
import { ButtonProps } from './types'

export const StyledButton = styled('button')<ButtonProps>(({ theme }) => ({
  cursor: 'pointer',
  outline: 'none',
  color: theme.vars['text-1'],
  transition: 'opacity 0.175s',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'transparent',
  padding: '0 12px',
  fontSize: 14,
  lineHeight: 1,
  gap: 4,
  height: 32,
  borderRadius: 6,
  variants: [
    {
      props: { size: 'lg' },
      style: {
        height: 40,
        padding: '0 17px',
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
  ],
}))

export const primaryButtonCls = css(({ theme }) => ({
  backgroundColor: theme['primary'],
  color: 'white',
  borderColor: theme['primary'],
}))

export const defaultButtonCls = css(({ theme }) => {
  return {
    borderColor: theme.vars['info-3'],
  }
})
