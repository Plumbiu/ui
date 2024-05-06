import { styled } from '@pigment-css/react'
import { TableProps } from './types'
import { colorsVar } from '../styles/vars'

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
      color: theme.vars['text-1'],
      variants: [
        ...colorsVar.flatMap((color) => {
          const commonBorder = `1px solid ${theme.vars[`${color}-5`]}`
          const commonBgColor = theme.vars[`${color}-6`]
          const headerSperatorColor = theme.vars[`${color}-4`]
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
              },
            },
            {
              props: { bordered: false },
              style: {
                '& > thead': {
                  '& > tr': {
                    '& > td': {
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        width: 1,
                        backgroundColor: headerSperatorColor,
                        top: '30%',
                        bottom: '30%',
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
                  '&:hover > td': {
                    backgroundColor: commonBgColor,
                  },
                },
                '& > thead': {
                  overflow: 'hidden',
                  backgroundColor: commonBgColor,
                  fontWeight: 600,
                  '& > tr': {
                    '& > td': {
                      padding: 14,
                    },
                    '&:first-child': {
                      '& >td:last-child': {
                        borderStartEndRadius: 10,
                      },
                      '& >td:first-child': {
                        borderStartStartRadius: 10,
                      },
                    },
                  },
                },
                '& > tbody': {
                  overflow: 'hidden',
                  backgroundColor: theme.vars['background'],
                  '& > tr': {
                    '& > td': {
                      padding: '10px 14px',
                      borderBottom: commonBorder,
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
