import { clsx } from 'clsx'
import { HTMLAttributes } from 'react'
import {
  verticalCls,
  dividerWrapper,
  orientationLeftCls,
  orientationRightCls,
  dashedCls,
  plainCls,
  dividerCls,
} from './styles'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  dashed?: boolean
  orientation?: 'left' | 'right' | 'center'
  plain?: boolean
  type?: 'horizontal' | 'vertical'
  children?: React.ReactNode
}

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
