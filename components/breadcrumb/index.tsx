import { css } from '@pigment-css/react'
import { Fragment } from 'react/jsx-runtime'
import { clsx } from 'clsx'
import { BreadcrumbProps } from './types'

const olCls = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  fontSize: 14,
  listStyle: 'none',
  color: theme.vars['text-1'],
  lineHeight: 1.525,
  '& a': {
    display: 'inline-block',
    boxSizing: 'border-box',
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 4,
    transition: '0.2s',
    '&:hover': {
      backgroundColor: theme.vars['info-4'],
      color: theme.vars['text-3'],
    },
  },
}))

const liCls = css({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
})

const separatorCls = css({
  marginLeft: 6,
  marginRight: 6,
})

const grayColor = css(({ theme }) => ({
  color: theme.vars['text-4'],
  '& a': {
    color: theme.vars['text-4'],
  },
}))

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
