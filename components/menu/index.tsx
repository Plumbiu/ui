import { clsx } from 'clsx'
import { useMemo, useState } from 'react'
import { Divider } from '..'
import { MenuItem, MenuProps } from './types'
import { findAcitveArr } from './utils'
import {
  StyleMenuItem,
  labelCls,
  groupCls,
  activeCls,
  beforeCss,
  menuCls,
  iconCls,
  route90Cls,
  gridAnimationCls,
  gridAnimationItemCls,
} from './styles'
import { IconWrap, MaterialSymbolsKeyboardArrowDownRounded } from '@/icon'

const MenuItemCmp: React.FC<{
  setActiveMenuItem: React.Dispatch<React.SetStateAction<string[]>>
  activeMenuItem: string[]
  item: MenuItem
  depth: number
  shoudOpen: boolean
  children: React.ReactNode
}> = ({
  activeMenuItem,
  item,
  depth,
  setActiveMenuItem,
  shoudOpen,
  children,
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
          <IconWrap
            className={clsx(iconCls, {
              [route90Cls]: isOpen,
            })}
          >
            <MaterialSymbolsKeyboardArrowDownRounded fontSize={18} />
          </IconWrap>
        )}
      </div>
      <div
        className={clsx(gridAnimationCls, {
          [gridAnimationItemCls]: isOpen,
        })}
      >
        {children}
      </div>
    </StyleMenuItem>
  )
}

const Menu: React.FC<MenuProps> = ({ items, className, ...restProps }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string[]>([])

  function render(items: MenuItem[], depth = 1) {
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
