import { IconWrap, MaterialSymbolsKeyboardArrowDownRounded } from '@/icon'
import clsx from 'clsx'
import { useContext, useState, useRef, HTMLAttributes, useEffect } from 'react'
import { VisibleContext, ActiveKeyContext } from './context'
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
  inlineCollapsed: boolean
  clickable: boolean
  setActiveKey: React.Dispatch<React.SetStateAction<string | undefined>>
  setCloseAll: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  depth,
  mode,
  keyPath,
  inlineCollapsed,
  children,
  onClick,
  clickable,
  setActiveKey,
  setCloseAll,
}) => {
  if (item.type === 'divider') {
    return <Divider style={{ marginTop: 6, marginBottom: 6 }} />
  }
  const alwaysOpenItem =
    item.type === 'group' || (mode === 'horizontal' && depth > 1)
  const closeAll = useContext(VisibleContext)
  const activeKey = useContext(ActiveKeyContext)

  let defaultOpen = false
  if (alwaysOpenItem) {
    defaultOpen = true
  }
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const isActive = activeKey === item.key

  const ref = useRef<HTMLDivElement>(null)
  const isHorizontal = mode === 'horizontal'
  const formatDepth = depth - (item.type === 'group' ? 1 : 0)
  const pl = inlineCollapsed
    ? 12
    : formatDepth < 1
    ? 8
    : (isHorizontal ? 12 : 24) * formatDepth
  const isHorizontalActive = isHorizontal && isActive
  const isHorizontalOpen = isHorizontal && isOpen

  const props: HTMLAttributes<HTMLDivElement> = {}

  useEffect(() => {
    if (closeAll && defaultOpen === false) {
      setIsOpen(false)
    }
  }, [closeAll])

  props.onClick = (e) => {
    if (item.type) {
      return
    }
    e.stopPropagation()
    if (mode === 'horizontal' || inlineCollapsed) {
      if (item.children) {
        setCloseAll(false)
        setIsOpen(true)
      } else {
        setCloseAll(true)
      }
    } else {
      setIsOpen(!isOpen)
    }

    setActiveKey(item.key)
    if (clickable) {
      onClick?.({ key: item.key, keyPath, domEvent: e })
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
        position:
          inlineCollapsed || mode === 'horizontal' ? 'relative' : undefined,
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
        ref={ref}
        {...props}
      >
        <div className={itemWrapCls}>
          <IconWrap size="lg">{item.icon}</IconWrap>
          <div
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
          </div>
        </div>
      </div>
      <div
        className={clsx({
          [gridAnimationItemCls]: isOpen,
          [horizontalMenuItemCls]: depth === 1 && isHorizontalOpen,
          [activeHorizontalOverflowCls]: isHorizontalOpen,
          [collapseChildencls]: inlineCollapsed,
          [gridAnimationCls]: !inlineCollapsed,
        })}
      >
        {isOpen && children}
      </div>
    </StyleMenuItem>
  )
}

export default MenuItem
