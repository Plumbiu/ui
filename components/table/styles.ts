import { css, styled } from '@pigment-css/react'
import { TableProps } from './types'

export const StyledTable = styled('table')<Pick<TableProps, 'bordered'>>(
  ({ theme }) => {
    const hoverHeadBgColor = theme.vars['info-6']
    const border = `1px solid ${theme.vars['info-5']}`
    const bgColor = theme.vars['info-7']
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
        transition: '0.3s',
      },
      '& tr': {
        '& > td, & > th': {
          padding: 14,
          transition: 'background-color 0.1s',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      },
      '& > thead': {
        overflow: 'hidden',
        fontWeight: 600,
        textAlign: 'left',
        '& > tr': {
          '& > th': {
            backgroundColor: bgColor,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: hoverHeadBgColor,
            },
          },
          '&:first-child': {
            '& >th:last-child': {
              borderStartEndRadius: radius,
            },
            '& >th:first-child': {
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
            backgroundColor: bgColor,
          },
          '& > td': {
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
              '& > td, & > th': {
                borderLeft: border,
                borderTop: border,
                '&:last-child:not(th[colspan]):not(th[rowspan])': {
                  borderRight: border,
                },
              },
              '&:not(:last-child)': {
                '& > td': {
                  borderBottom: 'none',
                },
              },
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

export const theadCls = css({
  position: 'sticky',
  top: 0,
  zIndex: 99,
})
