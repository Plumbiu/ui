export const sizeVariants = [
  {
    props: { size: 'lg' },
    style: {
      height: 34,
      padding: '0 16px',
      fontSize: 16,
    },
  },
  {
    props: { size: 'md' },
    style: {
      height: 30,
      fontSize: 14,
      padding: '0 12px',
    },
  },
  {
    props: { size: 'sm' },
    style: {
      height: 26,
      fontSize: 12,
      padding: '0 8px',
    },
  },
] as const
