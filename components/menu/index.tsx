import { clsx } from 'clsx'
import { HTMLAttributes, useContext, useEffect, useMemo, useState } from 'react'
import Divider from '../divider'
import { MenuItem, MenuMode, MenuOnClickParams, MenuProps } from './types'
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
  labelWrapCls,
  horizontalCls,
  horizontalMenuItemCls,
  activeHorizontalOverflowCls,
  activeHorizontalCls,
  horizontalWrapperCls,
  disabledCls,
  itemWrapCls,
  collapsecls,
  collapseChildencls,
} from './styles'
import { IconWrap, MaterialSymbolsKeyboardArrowDownRounded } from '@/icon'
import { ActiveKeyContext } from './context'

const MenuItemCmp: React.FC<{
  isActive: boolean
  item: MenuItem
  depth: number
  isOpen: boolean
  render(items: MenuItem[], depth?: number, keyPath?: string[]): React.ReactNode
  mode: MenuMode
  keyPath: string[]
  cb: (e: MenuOnClickParams) => void
  inlineCollapsed: boolean
}> = ({
  item,
  depth,
  isOpen,
  render,
  mode,
  cb,
  isActive,
  keyPath,
  inlineCollapsed,
}) => {
  if (item.type === 'divider') {
    return <Divider style={{ marginTop: 6, marginBottom: 6 }} />
  }

  if (inlineCollapsed && item.type === 'group') {
    return null
  }

  const newKeyPath =
    item.key && item.type === undefined ? [...keyPath, item.key] : keyPath
  const isHorizontal = mode === 'horizontal'
  const formatDepth = depth - (item.type === 'group' ? 1 : 0)
  const pl = inlineCollapsed
    ? 12
    : formatDepth < 1
    ? 8
    : (isHorizontal ? 12 : 24) * formatDepth
  const isHorizontalActive = isHorizontal && isActive

  const props: HTMLAttributes<HTMLDivElement> = {}

  props.onClick = (e) => {
    if (item.type === undefined) {
      cb({ key: item.key, keyPath: newKeyPath, domEvent: e })
    }
  }

  const chilren = useMemo(() => {
    return (
      item.children &&
      isOpen &&
      render(
        item.children,
        item.type === 'group' ? depth : depth + 1,
        newKeyPath,
      )
    )
  }, [item, isOpen])

  return (
    <StyleMenuItem
      className={clsx({
        [horizontalWrapperCls]: isHorizontal && depth === 1,
        [activeHorizontalCls]:
          isHorizontal && depth === 1 && isActive && !item.disabled,
        [disabledCls]: item.disabled,
      })}
      style={{
        position: inlineCollapsed ? 'relative' : undefined,
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
          pointerEvents: item.disabled ? 'none' : undefined,
        }}
        {...props}
      >
        <div className={itemWrapCls}>
          <IconWrap size="lg">{item.icon}</IconWrap>
          {!!inlineCollapsed && <div
            className={clsx(labelWrapCls, {
              [collapsecls]: inlineCollapsed && depth === 1,
            })}
          >
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.children && item.type === undefined && (
              <IconWrap
                className={clsx(iconCls, {
                  [route90Cls]: isOpen,
                })}
              >
                <MaterialSymbolsKeyboardArrowDownRounded fontSize={20} />
              </IconWrap>
            )}
          </div>}
        </div>
      </div>
      <div
        className={clsx({
          [gridAnimationItemCls]: isOpen,
          [horizontalMenuItemCls]: depth === 1 && isHorizontal,
          [activeHorizontalOverflowCls]: isHorizontalActive,
          [collapseChildencls]: inlineCollapsed,
          [gridAnimationCls]: !inlineCollapsed,
        })}
      >
        {chilren}
      </div>
    </StyleMenuItem>
  )
}

const MenuGroup: React.FC<{
  setActiveKey: React.Dispatch<React.SetStateAction<string | undefined>>
  items: MenuItem[]
  depth: number
  render(items: MenuItem[], depth?: number, keyPath?: string[]): React.ReactNode
  uniqueOpen: boolean
  mode: MenuMode
  keyPath: string[]
  clickEvent: MenuProps['onClick']
  inlineCollapsed: boolean
}> = ({
  items,
  depth,
  render,
  uniqueOpen,
  mode,
  setActiveKey,
  keyPath,
  clickEvent,
  inlineCollapsed,
}) => {
  const [openMenu, setOpenMenu] = useState<string[]>([])
  const activeKey = useContext(ActiveKeyContext)

  return items.map((item) => {
    let isOpen =
      item.type === 'group' || (!!item.key && openMenu.includes(item.key))
    if (mode === 'horizontal' && depth > 1) {
      isOpen = true
    }
    return (
      <MenuItemCmp
        inlineCollapsed={inlineCollapsed}
        mode={mode}
        key={item.key}
        item={item}
        depth={depth}
        render={render}
        isActive={activeKey === item.key}
        keyPath={keyPath}
        cb={(e: MenuOnClickParams) => {
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
          clickEvent?.(e)
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
  onClick,
  inlineCollapsed = false,
  ...restProps
}) => {
  const [activeKey, setActiveKey] = useState<string>()
  const render = (items: MenuItem[], depth = 1, keyPath: string[] = []) => {
    return (
      <MenuGroup
        inlineCollapsed={inlineCollapsed}
        setActiveKey={setActiveKey}
        uniqueOpen={inlineCollapsed || uniqueOpen}
        items={items}
        depth={depth}
        clickEvent={onClick}
        render={render}
        mode={mode}
        keyPath={keyPath}
      />
    )
  }
  const style: React.CSSProperties = {
    width: restProps?.style?.width,
  }
  if (inlineCollapsed) {
    style.width = 48
  }
  useEffect(() => {
    window.addEventListener('click', (e) => {})
  }, [])
  const node = useMemo(() => {
    return render(items)
  }, [items, activeKey])
  return (
    <ActiveKeyContext.Provider value={activeKey}>
      <div
        className={clsx(className, menuCls, {
          [horizontalCls]: mode === 'horizontal',
        })}
        {...restProps}
        style={style}
      >
        {node}
      </div>
    </ActiveKeyContext.Provider>
  )
}

export default Menu

export type { MenuItem, MenuProps } from './types'
