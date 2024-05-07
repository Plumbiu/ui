export const sizeVariants = [
  {
    props: { size: 'lg' },
    style: {
      height: 32,
      padding: '0 16px',
      fontSize: 16,
    },
  },
  {
    props: { size: 'md' },
    style: {
      height: 28,
      fontSize: 14,
      padding: '0 12px',
    },
  },
  {
    props: { size: 'sm' },
    style: {
      height: 24,
      fontSize: 12,
      padding: '0 8px',
    },
  },
] as const
