export const sizeVariants = [
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
] as const
