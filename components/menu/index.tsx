import { IconWrap } from '@/icon'
import { css, styled } from '@pigment-css/react'
import clsx from 'clsx'
import { MenuProps } from './types'
import { Divider } from '..'
import { flatMenuItems } from './utils'
import { useMemo, useState } from 'react'

const menuCls = css(({ theme }) => ({
  borderRight: `1px solid ${theme.vars['info-5']}`,
}))

const depths = [2, 3, 4, 5, 6]

const StyleMenuItem = styled('div')<{
  depth: number
}>(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  color: theme.vars['text-1'],
  lineHeight: 1.5,
  fontSize: 14,
  flexDirection: 'column',
  variants: [
    ...depths.map((depth) => ({
      props: { depth },
      style: {
        backgroundColor: theme.vars[`${9 - depth}`],
      },
    })),
  ],
}))

const labelCls = css(({ theme }) => ({
  paddingTop: 8,
  paddingBottom: 8,
  marginTop: 2,
  marginBottom: 2,
  borderRadius: 6,
  cursor: 'pointer',
  transition: '0.15s',
  '&:hover': {
    backgroundColor: theme.vars['info-6'],
  },
}))

const activeLabelCls = css(({ theme }) => ({
  backgroundColor: theme.vars['primary-6'],
  color: theme['primary'],
  '&:hover': {
    backgroundColor: theme.vars['primary-5'],
  },
}))

const groupCls = css(({ theme }) => ({
  marginTop: 8,
  marginBottom: 8,
  color: theme['primary'],
  fontWeight: 500,
}))

const beforeCss = css(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -24,
    bottom: 0,
    width: 4,
    borderRadius: 4,
    background: theme['primary'],
  },
}))

const Menu: React.FC<MenuProps> = ({ items, className, ...restProps }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string[]>([])
  const flat = useMemo(() => flatMenuItems(items), [items])

  return (
    <div className={clsx(menuCls, className)} {...restProps}>
      {flat.map(({ item, depth, activeArr }) => {
        if (item.type === 'divider') {
          return <Divider style={{ marginTop: 6, marginBottom: 6 }} />
        }
        const pl = depth * 24
        return (
          <StyleMenuItem
            depth={depth}
            onClick={() => {
              const newActiveArr = item.key
                ? [...activeArr, item.key]
                : [...activeArr]
              setActiveMenuItem(newActiveArr)
            }}
            key={item.key}
          >
            <div
              className={clsx({
                [labelCls]: item.type === undefined,
                [groupCls]: item.type === 'group',
                [activeLabelCls]: item.key && activeMenuItem.includes(item.key),
              })}
              style={{ paddingLeft: pl }}
            >
              <IconWrap
                className={clsx({
                  [beforeCss]: item.type === 'group',
                })}
              >
                {item.icon}
              </IconWrap>
              <span>{item.label}</span>
            </div>
          </StyleMenuItem>
        )
      })}
    </div>
  )
}

export default Menu

export type { MenuItem, MenuProps } from './types'
