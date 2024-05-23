import { TBaseColor, TSize } from '@/types'

export const fontSizeVariants = [
  {
    props: { size: 'lg' },
    style: {
      fontSize: 16,
    },
  },
  {
    props: { size: 'sm' },
    style: {
      fontSize: 12,
    },
  },
] as const

export const borderRadiusVariants = [
  {
    props: { size: 'lg' },
    style: {
      borderRadius: 4,
    },
  },
  {
    props: { size: 'sm' },
    style: {
      borderRadius: 3,
    },
  },
] as const

export const colorsVar: TBaseColor[] = [
  'primary',
  'danger',
  'success',
  'warning',
  'info',
]

export const sizesVar: TSize[] = ['sm', 'md', 'lg']

export const wave = {
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    opacity: 0,
    transition: 'opacity .2s cubic-bezier(.645,.045,.355,1)',
  },
  '&:active::after': {
    opacity: 0.4,
    transition: 'none',
  },
}
