import { styled } from '@pigment-css/react'

export const StyledUnderlined = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 4,
  paddingBottom: 4,
  '&::after': {
    content: '""',
    position: 'absolute',
    height: 1,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.vars['info-5'],
  },
}))
