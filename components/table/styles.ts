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
      tableLayout: 'fixed',
      position: 'relative',
      color: theme.vars['text-1'],
      '& ._td_fixed': {
        position: 'sticky',
        zIndex: 10,
      },
      variants: [
        ...colorsVar.flatMap((color) => {
          const border = `1px solid ${theme.vars[`${color}-5`]}`
          const hoverHeadBgColor = theme.vars[`${color}-5`]
          const bgColor = theme.vars[`${color}-6`]
          const hoverBgColor = theme.vars[`${color}-7`]
          const radius = 6
          return [
            {
              props: { bordered: true },
              style: {
                '& tr': {
                  '& > td': {
                    borderLeft: border,
                    borderTop: border,
                    '&:last-child': {
                      borderRight: border,
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
              props: { bordered: false },
              style: {
                '& ._shadow': {
                  zIndex: 10,
                  boxShadow: 'inset -10px 0 8px -8px rgba(5, 5, 5, 0.12)',
                  transition: '0.3s',
                },
                '& ._shadow_right': {
                  zIndex: 10,
                  boxShadow: 'inset 10px 0 8px -8px rgba(5, 5, 5, 0.12)',
                  transition: '0.3s',
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
                  '& ._td_hl': {
                    backgroundColor: hoverHeadBgColor,
                  },
                  '& > tr': {
                    '& > td': {
                      padding: 14,
                      backgroundColor: bgColor,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: hoverHeadBgColor,
                      }
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
                  '& ._td_hl': {
                    backgroundColor: hoverBgColor,
                  },
                  '& > tr': {
                    '&:hover > td': {
                      backgroundColor: hoverBgColor,
                    },
                    '& > td': {
                      padding: '10px 14px',
                      borderBottom: border,
                      backgroundColor: theme.vars['background-1'],
                    },
                    '&:first-child>td': {
                      borderTop: border,
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
