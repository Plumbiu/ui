import { IconWrap, MaterialSymbolsKeyboardArrowDownRounded } from '@/icon'
import clsx from 'clsx'
import { useContext } from 'react'
import { MenuContext } from './context'
import {
  StyleMenuItem,
  horizontalWrapperCls,
  activeHorizontalCls,
  disabledCls,
  labelCls,
  groupCls,
  activeCls,
  itemWrapCls,
  labelWrapCls,
  collapsecls,
  iconCls,
  route90Cls,
  gridAnimationItemCls,
  horizontalMenuItemCls,
  activeHorizontalOverflowCls,
  collapseChildencls,
  gridAnimationCls,
} from './styles'
import { MenuItemType, MenuMode, MenuProps } from './types'
import Divider from '@/divider'

interface MenuItemProps {
  item: MenuItemType
  depth: number
  children: React.ReactNode
  mode: MenuMode
  keyPath: string[]
  onClick: MenuProps['onClick']
  clickable: boolean
}

const MenuGroup: React.FC<
  MenuItemProps & {
    inlineCollapsed: boolean
  }
> = (props) => {
  const { item, depth, mode, inlineCollapsed, children } = props

  const isHorizontal = mode === 'horizontal'
  const pl = inlineCollapsed ? 12 : (isHorizontal ? 12 : 24) * depth
  return (
    <StyleMenuItem
      style={{
        position: isHorizontal ? 'relative' : undefined,
      }}
    >
      <div
        className={groupCls}
        style={{
          paddingLeft: pl,
        }}
      >
        <div className={itemWrapCls}>
          {item.icon && <IconWrap size="lg">{item.icon}</IconWrap>}
          <div className={labelWrapCls}>
            <span style={{ flex: 1 }}>{item.label}</span>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </StyleMenuItem>
  )
}

const InlineMenuItem: React.FC<MenuItemProps> = (props) => {
  const { item, depth, mode, keyPath, children, onClick, clickable } = props
  const { openKeys, activeKey, setActiveKey, setOpenKeys } =
    useContext(MenuContext)!

  const isActive = activeKey === item.key
  const isOpen = item.key && openKeys.includes(item.key)
  const pl = 12
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!item.key) {
      return
    }
    e.stopPropagation()
    if (item.children) {
      if (depth === 1) {
        setOpenKeys([item.key])
      } else {
        setOpenKeys([...openKeys, item.key])
      }
    } else {
      setOpenKeys([])
    }
    if (depth === 1) {
      setActiveKey(item.key)
    }

    if (clickable) {
      onClick?.({ key: item.key, keyPath, domEvent: e })
    }
  }
  return (
    <StyleMenuItem
      className={clsx({
        [disabledCls]: item.disabled,
      })}
      style={{
        position: 'relative',
      }}
    >
      <div
        className={clsx({
          [labelCls]: item.type === undefined,
          [activeCls]: mode === 'inline' && isActive,
        })}
        style={{
          paddingLeft: pl,
          pointerEvents: item.disabled ? 'none' : undefined,
        }}
        onClick={clickHandler}
      >
        <div className={itemWrapCls}>
          {item.icon && <IconWrap size="lg">{item.icon}</IconWrap>}
          <div className={clsx(labelWrapCls, { [collapsecls]: depth === 1 })}>
            <span style={{ flex: 1 }}>{item.label}</span>
          </div>
          {item.children && depth > 1 && (
            <IconWrap
              className={clsx(iconCls, {
                [route90Cls]: isOpen,
              })}
            >
              <MaterialSymbolsKeyboardArrowDownRounded fontSize={20} />
            </IconWrap>
          )}
        </div>
      </div>
      <div className={collapseChildencls}>{isOpen && children}</div>
    </StyleMenuItem>
  )
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { item, depth, mode, keyPath, children, onClick, clickable } = props
  const { openKeys, activeKey, setActiveKey, setOpenKeys, inlineCollapsed } =
    useContext(MenuContext)!
  if (item.type === 'divider') {
    return <Divider style={{ marginTop: 6, marginBottom: 6 }} />
  }
  if (item.type === 'group') {
    return <MenuGroup {...props} inlineCollapsed={inlineCollapsed} />
  }
  if (inlineCollapsed) {
    return <InlineMenuItem {...props} />
  }

  const isActive = activeKey === item.key
  const isOpen = item.key && openKeys.includes(item.key)
  const isHorizontal = mode === 'horizontal'
  const pl = (isHorizontal ? 12 : 24) * depth
  const isHorizontalActive = isHorizontal && isActive
  const isHorizontalOpen = isHorizontal && isOpen

  const commonHandler = () => {
    if (!item.key) {
      return
    }
    if (openKeys.includes(item.key)) {
      setOpenKeys(openKeys.filter((key) => key !== item.key))
    } else {
      setOpenKeys([...openKeys, item.key])
    }
  }
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (clickable && item.children) {
      onClick?.({ key: item.key, keyPath, domEvent: e })
    }
    setActiveKey(item.key)
    if (mode === 'horizontal') {
      if (item.children) {
        commonHandler()
      } else {
        setOpenKeys([])
      }
    } else {
      commonHandler()
    }
  }
  return (
    <StyleMenuItem
      className={clsx({
        [horizontalWrapperCls]: isHorizontal && depth === 1,
        [activeHorizontalCls]:
          isHorizontalActive && depth === 1 && !item.disabled,
        [disabledCls]: item.disabled,
      })}
      style={{
        position: isHorizontal ? 'relative' : undefined,
      }}
    >
      <div
        className={clsx({
          [labelCls]: item.type === undefined,
          [activeCls]: mode === 'inline' && isActive,
        })}
        style={{
          paddingLeft: pl,
          pointerEvents: item.disabled ? 'none' : undefined,
        }}
        onClick={clickHandler}
      >
        <div className={itemWrapCls}>
          {item.icon && <IconWrap size="lg">{item.icon}</IconWrap>}
          <div className={labelWrapCls}>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.children && (
              <IconWrap
                className={clsx(iconCls, {
                  [route90Cls]: isOpen,
                })}
              >
                <MaterialSymbolsKeyboardArrowDownRounded fontSize={20} />
              </IconWrap>
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(gridAnimationCls, {
          [gridAnimationItemCls]: isOpen,
          [horizontalMenuItemCls]: depth === 1 && isHorizontalOpen,
          [activeHorizontalOverflowCls]: isHorizontalOpen,
        })}
      >
        {isOpen && children}
      </div>
    </StyleMenuItem>
  )
}

export default MenuItem
