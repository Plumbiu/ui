import { IconWrap } from '@/icon'
import { css, styled } from '@pigment-css/react'
import { HTMLAttributes, useMemo } from 'react'

interface MenuItem {
  label?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  key?: React.Key
  children?: MenuItem[]
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
}

const menuCls = css(({ theme }) => ({
  borderRight: `1px solid ${theme.vars['info-5']}`,
}))

const StyleMenuItem = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  lineHeight: 1.5,
  fontSize: 14,
  flexDirection: 'column',
}))

const labelCls = css(({ theme }) => ({
  paddingTop: 9,
  paddingBottom: 9,
  borderRadius: 6,
  cursor: 'pointer',
  transition: '0.15s',
  '&:hover': {
    backgroundColor: theme.vars['info-4'],
  },
}))

const Menu: React.FC<MenuProps> = ({ items, ...restProps }) => {
  const render = (chilren: MenuItem[], depth = 1) => {
    return chilren.map((item) => {
      return (
        <StyleMenuItem key={item.key}>
          <div className={labelCls} style={{ paddingLeft: depth * 24 }}>
            <IconWrap>{item.icon}</IconWrap>
            <span>{item.label}</span>
          </div>
          <div>{item.children && render(item.children, depth + 1)}</div>
        </StyleMenuItem>
      )
    })
  }

  const node = useMemo(() => render(items), [items])

  return (
    <div className={menuCls} {...restProps}>
      {node}
    </div>
  )
}

export default Menu
