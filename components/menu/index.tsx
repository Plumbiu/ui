import { clsx } from 'clsx'
import { HTMLAttributes, useMemo, useState } from 'react'
import { Divider } from '..'
import { MenuItem, MenuMode, MenuProps } from './types'
import { findAcitveArr } from './utils'
import {
  StyleMenuItem,
  labelCls,
  groupCls,
  activeCls,
  menuCls,
  iconCls,
  route90Cls,
  gridAnimationCls,
  gridAnimationItemCls,
  chilrenBgcCls,
  labelWrapCls,
  horizontalCls,
  horizontalMenuItemCls,
  activeHorizontalOverflowCls,
  activeHorizontalCls,
  horizontalWrapperCls,
} from './styles'
import { IconWrap, MaterialSymbolsKeyboardArrowDownRounded } from '@/icon'

const MenuItemCmp: React.FC<{
  setActiveMenuItem: React.Dispatch<React.SetStateAction<string[]>>
  activeMenuItem: string[]
  item: MenuItem
  depth: number
  isOpen: boolean
  children: React.ReactNode
  mode: MenuMode
  cb: () => void
}> = ({
  activeMenuItem,
  item,
  depth,
  setActiveMenuItem,
  isOpen,
  children,
  mode,
  cb,
}) => {
  if (item.type === 'divider') {
    return <Divider style={{ marginTop: 6, marginBottom: 6 }} />
  }
  const isHorizontal = mode === 'horizontal'
  const formatDepth = depth - (item.type === 'group' ? 1 : 0)
  const pl =
    formatDepth < 1 ? 8 : (isHorizontal ? 12 : 24) * formatDepth

  const isActive = item.key && activeMenuItem.includes(item.key)
  const isHorizontalActive = isOpen && isHorizontal && isActive

  const props: HTMLAttributes<HTMLDivElement> = {}

  props.onClick = () => {
    const newActiveArr = item.key
      ? [...item._activeArr, item.key]
      : [...item._activeArr]
    setActiveMenuItem(newActiveArr)
    cb()
  }

  return (
    <StyleMenuItem
      className={clsx({
        [horizontalWrapperCls]: isHorizontal && depth === 1,
        [activeHorizontalCls]: isHorizontal && depth === 1 && isActive,
      })}
      style={{
        position: isHorizontal ? 'relative' : undefined,
      }}
    >
      <div
        className={clsx({
          [labelCls]: item.type === undefined,
          [groupCls]: item.type === 'group',
          [activeCls]: mode === 'inline' && isActive,
        })}
        style={{
          paddingLeft: pl,
        }}
        {...props}
      >
        <div className={labelWrapCls}>
          <IconWrap size="lg">{item.icon}</IconWrap>
          <span>{item.label}</span>
        </div>
        {item.children && item.type === undefined && (
          <IconWrap
            className={clsx(iconCls, {
              [route90Cls]: isOpen,
            })}
          >
            <MaterialSymbolsKeyboardArrowDownRounded fontSize={20} />
          </IconWrap>
        )}
      </div>
      <div
        className={clsx(gridAnimationCls, {
          [chilrenBgcCls]: item.type === undefined,
          [gridAnimationItemCls]: isOpen,
          [horizontalMenuItemCls]: depth === 1 && isHorizontal,
          [activeHorizontalOverflowCls]: isHorizontalActive,
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
  mode: MenuMode
}> = ({
  items,
  setActiveMenuItem,
  activeMenuItem,
  depth,
  render,
  uniqueOpen,
  mode,
}) => {
  const [openMenu, setOpenMenu] = useState<string[]>([])

  return items.map((item) => {
    return (
      <MenuItemCmp
        mode={mode}
        key={item.key}
        setActiveMenuItem={setActiveMenuItem}
        activeMenuItem={activeMenuItem}
        item={item}
        depth={depth}
        cb={() => {
          if (item.key === undefined) {
            return
          }
          if (uniqueOpen || mode === 'horizontal') {
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
  mode = 'inline',
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
        mode={mode}
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
    <div
      className={clsx(className, menuCls, {
        [horizontalCls]: mode === 'horizontal',
      })}
      {...restProps}
    >
      {node}
    </div>
  )
}

export default Menu

export type { MenuItem, MenuProps } from './types'
