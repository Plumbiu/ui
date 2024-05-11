import { styled } from '@pigment-css/react'
import { TableProps } from './types'
import { colorsVar } from '../_styles/vars'
import { TBaseColor } from '../types'

export const StyledTable = styled('table')<
  Pick<TableProps, 'bordered' | 'color'>
>(
  // @ts-ignore
  ({ theme }) => {
    return {
      width: '100%',
      borderSpacing: 0,
      borderCollapse: 'separate',
      listStyle: 'none',
      fontSize: 14,
      position: 'relative',
      color: theme.vars['text-1'],
      variants: [
        ...colorsVar.flatMap((color) => {
          const commonBorder = `1px solid ${theme.vars[`${color}-5`]}`
          const commonBgColor = theme.vars[`${color}-6`]
          const radius = 6
          return [
            {
              props: { bordered: true },
              style: {
                '& tr': {
                  '& > td': {
                    borderLeft: commonBorder,
                    borderTop: commonBorder,
                    '&:last-child': {
                      borderRight: commonBorder,
                    },
                  },
                  '&:not(:last-child)': {
                    '& > td': {
                      borderBottom: 'none',
                    },
                  },
                },
                '& > tbody': {
                  '& > tr': {
                    '&:last-child': {
                      '& > td:first-child': {
                        borderBottomLeftRadius: radius,
                      },
                      '& > td:last-child': {
                        borderBottomRightRadius: radius,
                      },
                    },
                  },
                },
              },
            },
            {
              props: { color },
              style: {
                '& tr': {
                  '& > td': {
                    transition: 'background-color 0.1s',
                    overflow: 'hidden',
                  },
                },
                '& > thead': {
                  overflow: 'hidden',
                  fontWeight: 600,
                  '& > tr': {
                    '& > td': {
                      padding: 14,
                      backgroundColor: commonBgColor,
                    },
                    '&:first-child': {
                      '& >td:last-child': {
                        borderStartEndRadius: radius,
                      },
                      '& >td:first-child': {
                        borderStartStartRadius: radius,
                      },
                    },
                  },
                },
                '& > tbody': {
                  overflow: 'hidden',
                  backgroundColor: theme.vars['background-1'],
                  '& > tr': {
                    '&:hover > td': {
                      backgroundColor: commonBgColor,
                    },
                    '& > td': {
                      padding: '10px 14px',
                      borderBottom: commonBorder,
                      backgroundColor: theme.vars['background-1'],
                    },
                    '&:first-child>td': {
                      borderTop: commonBorder,
                    },
                  },
                },
              },
            },
          ]
        }),
      ],
    }
  },
)

export const StyledFooter = styled('div')<{
  color: TBaseColor
}>(({ theme }) => ({
  padding: 14,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  variants: [
    ...colorsVar.map((color) => {
      return {
        props: { color },
        style: {
          backgroundColor: theme.vars[`${color}-6`],
        },
      }
    }),
  ],
}))
