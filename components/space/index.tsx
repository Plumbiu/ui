import { styled } from '@pigment-css/react'
import { Children } from 'react'
import { slsx } from '@/_utils/util'
import { TSize } from '@/types'

export interface SpaceProps {
  size?: TSize | number
  children?: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  split?: React.ReactNode
}

const StyleSpace = styled('div')<SpaceProps>(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  rowGap: 8,
  columnGap: 8,
  variants: [
    {
      props: { size: 'md' },
      style: {
        rowGap: 16,
        columnGap: 16,
      },
    },
    {
      props: { size: 'lg' },
      style: {
        rowGap: 24,
        columnGap: 24,
      },
    },
  ],
}))

const SpaceItem: React.FC<SpaceProps> = ({ split, children }) => {
  return (
    <>
      <span>{split}</span>
      <div>{children}</div>
    </>
  )
}

const Space: React.FC<SpaceProps> = ({
  size,
  children,
  split,
  direction,
  wrap,
}) => {
  const style: React.CSSProperties = {
    gap: slsx(typeof size === 'number', size),
    flexDirection: slsx(direction === 'vertical', 'vertical'),
    flexWrap: slsx(wrap, 'wrap'),
  }
  return (
    <StyleSpace
      size={size}
      style={style}
    >
      {Children.map(children, (item, index) => (
        <SpaceItem split={index === 0 ? null : split}>{item}</SpaceItem>
      ))}
    </StyleSpace>
  )
}

export default Space
