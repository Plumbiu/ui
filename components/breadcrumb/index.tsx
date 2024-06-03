import { Fragment } from 'react/jsx-runtime'
import { clsx } from 'clsx'
import { BreadcrumbProps } from './types'
import { olCls, liCls, grayColor, separatorCls } from './styles'

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
  return (
    <nav>
      <ol className={olCls}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={index}>
              <li
                className={clsx(liCls, {
                  [grayColor]: !isLast,
                })}
              >
                {item.title}
              </li>
              {!isLast && (
                <li
                  className={clsx(liCls, separatorCls, {
                    [grayColor]: !isLast,
                  })}
                >
                  <span>{separator}</span>
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb

export type { BreadcrumbProps } from './types'
