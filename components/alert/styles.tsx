import { styled, css } from '@pigment-css/react'
import { TColor } from '..'
import { AlertProps } from './types'
import { colorsVar } from '@/_utils/vars'
import {
  MaterialSymbolsInfoRounded,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsCancel,
} from '@/icon'

export const StyledAlert = styled('div')<AlertProps>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderStyle: 'solid',
    lineHeight: '16px',
    borderRadius: 8,
    padding: '7px 15px',
    color: theme.vars['text-1'],
    fontSize: 14,
    variants: [
      ...colorsVar.map((color) => ({
        props: { color },
        style: {
          backgroundColor: theme.vars[`${color}-4`],
          borderColor: theme[color],
        },
      })),
    ],
  }
})

export const StyledAlertDescription = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  lineHeight: 1.575,
  marginTop: 2,
})

export const iconMap: Record<TColor, React.ReactNode> = {
  primary: <MaterialSymbolsInfoRounded />,
  success: <MaterialSymbolsCheckCircleRounded />,
  warning: <MaterialSymbolsInfoRounded />,
  danger: <MaterialSymbolsCancel />,
  info: <MaterialSymbolsInfoRounded />,
}

export const headingCls = css({
  display: 'flex',
  gap: 6,
})

export const actionCls = css({
  alignSelf: 'flex-start',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})
