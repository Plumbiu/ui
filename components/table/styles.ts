import { styled } from '@pigment-css/react'
import { TableProps } from './types'

export const StyledTable = styled('table')<Pick<TableProps, 'bordered'>>(
  // @ts-ignore
  ({ theme }) => {
    const hoverHeadBgColor = theme.vars['info-5']
    const border = `1px solid ${hoverHeadBgColor}`
    const bgColor = theme.vars['info-6']
    const hoverBgColor = theme.vars['info-7']
    const radius = 6
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
            },
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
      variants: [
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
      ],
    }
  },
)

export const StyledFooter = styled('div')(({ theme }) => ({
  padding: 14,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  backgroundColor: theme.vars['info-6'],
}))
