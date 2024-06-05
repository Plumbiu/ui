import { clsx } from 'clsx'
import { HTMLAttributes, useMemo, useState } from 'react'
import { Divider } from '..'
import { MenuItem, MenuMode, MenuProps } from './types'
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
  isActive: boolean
  item: MenuItem
  depth: number
  isOpen: boolean
  render(items: MenuItem[], depth?: number): React.ReactNode
  mode: MenuMode
  cb: () => void
}> = ({ item, depth, isOpen, render, mode, cb, isActive }) => {
  if (item.type === 'divider') {
    return <Divider style={{ marginTop: 6, marginBottom: 6 }} />
  }
  const isHorizontal = mode === 'horizontal'
  const formatDepth = depth - (item.type === 'group' ? 1 : 0)
  const pl = formatDepth < 1 ? 8 : (isHorizontal ? 12 : 24) * formatDepth
  const isHorizontalActive = isHorizontal && isActive

  const props: HTMLAttributes<HTMLDivElement> = {}

  props.onClick = () => {
    cb()
  }
  const chilren = useMemo(() => {
    return (
      item.children &&
      isOpen &&
      render(item.children, item.type === 'group' ? depth : depth + 1)
    )
  }, [item, isOpen])

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
        {chilren}
      </div>
    </StyleMenuItem>
  )
}

const MenuGroup: React.FC<{
  items: MenuItem[]
  depth: number
  render(items: MenuItem[], depth?: number): React.ReactNode
  uniqueOpen: boolean
  mode: MenuMode
}> = ({ items, depth, render, uniqueOpen, mode }) => {
  const [openMenu, setOpenMenu] = useState<string[]>([])
  const [activeKey, setActiveKey] = useState<string | null>(null)

  return items.map((item) => {
    let isOpen =
      item.type === 'group' || (!!item.key && openMenu.includes(item.key))
    if (mode === 'horizontal' && depth > 1) {
      isOpen = false
    }
    return (
      <MenuItemCmp
        mode={mode}
        key={item.key}
        item={item}
        depth={depth}
        render={render}
        isActive={activeKey === item.key}
        cb={() => {
          if (item.key == null) {
            return
          }
          setActiveKey(item.key)
          if (uniqueOpen || mode === 'horizontal') {
            setOpenMenu(openMenu.includes(item.key) ? [] : [item.key])
            return
          }
          if (openMenu.includes(item.key)) {
            setOpenMenu(openMenu.filter((menu) => menu !== item.key))
          } else {
            setOpenMenu([...openMenu, item.key])
          }
        }}
        isOpen={isOpen}
      />
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
  const node = useMemo(() => {
    const render = (items: MenuItem[], depth = 1) => {
      return (
        <MenuGroup
          uniqueOpen={uniqueOpen}
          items={items}
          depth={depth}
          render={render}
          mode={mode}
        />
      )
    }
    return render(items)
  }, [items])
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
