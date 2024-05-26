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
      borderRadius: 8,
    },
  },
  {
    props: { size: 'sm' },
    style: {
      borderRadius: 4,
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
    transition: 'opacity .4s ease-out',
  },
  '&:active::after': {
    opacity: 0.4,
    transition: 'none',
  },
}
