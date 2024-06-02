import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import { HTMLAttributes } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  dashed?: boolean
  orientation?: 'left' | 'right' | 'center'
  plain?: boolean
  type?: 'horizontal' | 'vertical'
  children?: React.ReactNode
}

const dividerWrapper = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minWidth: '100%',
  marginTop: 24,
  marginBottom: 24,
  whiteSpace: 'nowrap',
  fontWeight: 500,
  '&::after,&::before': {
    content: '""',
    display: 'inline-block',
    width: '50%',
    height: 1,
    backgroundColor: theme.vars['info-5'],
  },
}))

const shrinkWidth = {
  width: '5%',
}
const growWidth = {
  width: '95%',
}

const orientationLeftCls = css(({ theme }) => ({
  '&::before': shrinkWidth,
  '&::after': growWidth,
}))

const orientationRightCls = css(({ theme }) => ({
  '&::before': growWidth,
  '&::after': shrinkWidth,
}))

const dividerCls = css(({ theme }) => ({
  textAlign: 'center',
  paddingLeft: 16,
  paddingRight: 16,
  whiteSpace: 'nowrap',
}))

const plainCls = css({
  fontSize: 14,
  fontWeight: 400,
})

const dashedCls = css(({ theme }) => ({
  '&::after,&::before': {
    background: `linear-gradient(
      to left,
      transparent 0%,
      transparent 50%,
      ${theme.vars['info-5']} 50%,
      ${theme.vars['info-5']} 100%
    )`,
    backgroundSize: '5px 1px',
    backgroundRepeat: 'repeat-x',
  },
}))

const verticalCls = css(({ theme }) => ({
  position: 'relative',
  top: '-0.06em',
  display: 'inline-block',
  height: '0.9em',
  marginLeft: 8,
  marginRight: 8,
  verticalAlign: 'middle',
  width: 1,
  backgroundColor: theme.vars['info-5'],
}))

const Divider: React.FC<DividerProps> = ({
  className,
  dashed,
  orientation = 'center',
  plain,
  type = 'horizontal',
  children,
  ...restProps
}) => {
  if (type === 'vertical') {
    return <div className={verticalCls} />
  }
  return (
    <div
      {...restProps}
      className={clsx(className, dividerWrapper, {
        [orientationLeftCls]: orientation === 'left',
        [orientationRightCls]: orientation === 'right',
        [dashedCls]: dashed,
        [plainCls]: plain,
      })}
    >
      {!!children && <div className={dividerCls}>{children}</div>}
    </div>
  )
}

export default Divider
