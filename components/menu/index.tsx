import { css, styled } from '@pigment-css/react'
import { clsx } from 'clsx'
import { useMemo, useState } from 'react'
import { Divider } from '..'
import { MenuItem, MenuProps } from './types'
import { findAcitveArr } from './utils'
import { IconWrap, MaterialSymbolsKeyboardArrowUpRounded } from '@/icon'

const menuCls = css(({ theme }) => ({
  borderRight: `1px solid ${theme.vars['info-5']}`,
}))

const StyleMenuItem = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  color: theme.vars['text-1'],
  lineHeight: 1.5,
  fontSize: 14,
  cursor: 'pointer',
}))

const labelCls = css(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 9,
  paddingRight: 16,
  paddingBottom: 9,
  borderRadius: 6,
  '&:hover': {
    backgroundColor: theme.vars['info-6'],
  },
}))

const activeCls = css(({ theme }) => ({
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

const MenuItemCmp: React.FC<{
  setActiveMenuItem: React.Dispatch<React.SetStateAction<string[]>>
  activeMenuItem: string[]
  item: MenuItem
  depth: number
  children: React.ReactNode
  shoudOpen: boolean
}> = ({
  activeMenuItem,
  item,
  depth,
  setActiveMenuItem,
  children,
  shoudOpen,
}) => {
  const [isOpen, setIsOpen] = useState(shoudOpen)
  if (item.type === 'divider') {
    return <Divider style={{ marginTop: 6, marginBottom: 6 }} />
  }
  const pl = depth * 24
  return (
    <StyleMenuItem>
      <div
        className={clsx({
          [labelCls]: item.type === undefined,
          [groupCls]: item.type === 'group',
          [activeCls]: item.key && activeMenuItem.includes(item.key),
        })}
        onClick={() => {
          const newActiveArr = item.key
            ? [...item._activeArr, item.key]
            : [...item._activeArr]
          setActiveMenuItem(newActiveArr)
          if (item.children) {
            setIsOpen(!isOpen)
          }
        }}
        style={{ paddingLeft: pl }}
      >
        <div>
          <IconWrap
            className={clsx({
              [beforeCss]: item.type === 'group',
            })}
          >
            {item.icon}
          </IconWrap>
          <span>{item.label}</span>
        </div>
        {item.children && item.type === undefined && (
          <IconWrap>
            <MaterialSymbolsKeyboardArrowUpRounded fontSize={18} />
          </IconWrap>
        )}
      </div>
      {isOpen && children}
    </StyleMenuItem>
  )
}

const Menu: React.FC<MenuProps> = ({ items, className, ...restProps }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string[]>([])

  function render(items: MenuItem[], depth = 1) {
    console.log(items)

    return items.map((item) => {
      return (
        <MenuItemCmp
          key={item.key}
          setActiveMenuItem={setActiveMenuItem}
          activeMenuItem={activeMenuItem}
          item={item}
          depth={depth}
          shoudOpen={item.type === 'group'}
        >
          {item.children &&
            render(item.children, item.type === 'group' ? depth : depth + 1)}
        </MenuItemCmp>
      )
    })
  }

  useMemo(() => {
    findAcitveArr(items)
  }, [items])

  const node = useMemo(() => {
    return render(items)
  }, [items, activeMenuItem])
  return (
    <div className={clsx(className, menuCls)} {...restProps}>
      {node}
    </div>
  )
}

export default Menu

export type { MenuItem, MenuProps } from './types'
