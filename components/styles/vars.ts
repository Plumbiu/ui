import { TBaseColor, TSize } from '../types'

export const fontSizeVariants = [
  {
    props: { size: 'lg' },
    style: {
      fontSize: 16,
    },
  },
  {
    props: { size: 'md' },
    style: {
      fontSize: 14,
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
    props: { size: 'md' },
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
