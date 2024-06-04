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
  chilrenBgcCls,
  labelWrapCls,
} from './styles'
import { IconWrap, MaterialSymbolsKeyboardArrowDownRounded } from '@/icon'

const MenuItemCmp: React.FC<{
  setActiveMenuItem: React.Dispatch<React.SetStateAction<string[]>>
  activeMenuItem: string[]
  item: MenuItem
  depth: number
  isOpen: boolean
  children: React.ReactNode
  cb: () => void
}> = ({
  activeMenuItem,
  item,
  depth,
  setActiveMenuItem,
  isOpen,
  children,
  cb,
}) => {
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
          if (item.children && item.type !== 'group') {
            cb()
          }
        }}
        style={{ paddingLeft: pl }}
      >
        <div className={labelWrapCls}>
          <IconWrap
            size="lg"
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
          [chilrenBgcCls]: item.type === undefined,
          [gridAnimationItemCls]: isOpen,
        })}
      >
        {children}
      </div>
    </StyleMenuItem>
  )
}

const MenuGroup: React.FC<{
  items: MenuItem[]
  setActiveMenuItem: React.Dispatch<React.SetStateAction<string[]>>
  activeMenuItem: string[]
  depth: number
  render(items: MenuItem[], depth?: number): React.ReactNode
  uniqueOpen: boolean
}> = ({
  items,
  setActiveMenuItem,
  activeMenuItem,
  depth,
  render,
  uniqueOpen,
}) => {
  const [openMenu, setOpenMenu] = useState<string[]>([])

  return items.map((item) => {
    return (
      <MenuItemCmp
        key={item.key}
        setActiveMenuItem={setActiveMenuItem}
        activeMenuItem={activeMenuItem}
        item={item}
        depth={depth}
        cb={() => {
          if (item.key === undefined) {
            return
          }
          if (uniqueOpen) {
            if (openMenu.includes(item.key)) {
              setOpenMenu([])
            } else {
              setOpenMenu([item.key])
            }
            return
          }
          if (openMenu.includes(item.key)) {
            setOpenMenu(openMenu.filter((menu) => menu !== item.key))
          } else {
            setOpenMenu([...openMenu, item.key])
          }
        }}
        isOpen={
          item.type === 'group' || (!!item.key && openMenu.includes(item.key))
        }
      >
        {item.children &&
          render(item.children, item.type === 'group' ? depth : depth + 1)}
      </MenuItemCmp>
    )
  })
}

const Menu: React.FC<MenuProps> = ({
  items,
  className,
  uniqueOpen = false,
  ...restProps
}) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string[]>([])

  const render = (items: MenuItem[], depth = 1) => {
    return (
      <MenuGroup
        setActiveMenuItem={setActiveMenuItem}
        activeMenuItem={activeMenuItem}
        uniqueOpen={uniqueOpen}
        items={items}
        depth={depth}
        render={render}
      />
    )
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
