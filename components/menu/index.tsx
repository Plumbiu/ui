import { clsx } from 'clsx'
import {
  HTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
import { ActiveKeyContext, VisibleContext } from './context'

const MenuItemCmp: React.FC<{
  isActive: boolean
  item: MenuItem
  depth: number
  isOpen: boolean
  render(
    items: MenuItem[],
    depth?: number,
    keyPath?: string[],
    clickable?: boolean,
  ): React.ReactNode
  mode: MenuMode
  keyPath: string[]
  cb: (e: MenuOnClickParams, open?: boolean) => void
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
  const ref = useRef<HTMLDivElement>(null)
  const newKeyPath =
    item.key && item.type === undefined ? [...keyPath, item.key] : keyPath
  const isHorizontal = mode === 'horizontal'
  const formatDepth = depth - (item.type === 'group' ? 1 : 0)
  const pl = inlineCollapsed
    ? 12
    : formatDepth < 1
    ? 8
    : (isHorizontal ? 12 : 24) * formatDepth
  const isHorizontalOpen = isHorizontal && isOpen

  const props: HTMLAttributes<HTMLDivElement> = {}

  props.onClick = (e) => {
    e.stopPropagation()
    if (item.type === undefined) {
      let closeAll = false
      if (depth > 1) {
        if (inlineCollapsed && !item.children) {
          closeAll = true
        } else if (isHorizontal) {
          closeAll = true
        }
      }
      cb({ key: item.key, keyPath: newKeyPath, domEvent: e }, closeAll)
    }
  }

  const chilren = useMemo(() => {
    if (isHorizontal && !isHorizontalOpen) {
      return null
    }
    if (!isOpen) {
      return null
    }
    // if inlineCollapsed === true, show children itself
    if (inlineCollapsed && !item.children && depth === 1) {
      return render([item], depth + 1, newKeyPath, false)
    }
    return (
      item.children &&
      render(
        item.children,
        item.type === 'group' ? depth : depth + 1,
        newKeyPath,
      )
    )
  }, [item, isOpen, inlineCollapsed, isHorizontalOpen, isHorizontal])

  return (
    <StyleMenuItem
      className={clsx({
        [horizontalWrapperCls]: isHorizontal && depth === 1,
        [activeHorizontalCls]:
          isHorizontalOpen && depth === 1 && !item.disabled,
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
        {chilren}
      </div>
    </StyleMenuItem>
  )
}

const MenuGroup: React.FC<{
  setActiveKey: React.Dispatch<React.SetStateAction<string | undefined>>
  items: MenuItem[]
  depth: number
  render(
    items: MenuItem[],
    depth?: number,
    keyPath?: string[],
    clickable?: boolean,
  ): React.ReactNode
  uniqueOpen: boolean
  mode: MenuMode
  keyPath: string[]
  clickEvent: MenuProps['onClick']
  inlineCollapsed: boolean
  setCloseAll: React.Dispatch<React.SetStateAction<boolean>>
  clickable: boolean
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
  setCloseAll,
  clickable,
}) => {
  const activeKey = useContext(ActiveKeyContext)
  const closeAll = useContext(VisibleContext)
  const [openMenu, setOpenMenu] = useState<string[]>([])

  useEffect(() => {
    if (closeAll) {
      setOpenMenu([])
    }
  }, [closeAll])

  const node = useMemo(() => {
    return items.map((item) => {
      const isOpen =
        item.type === 'group' || (!!item.key && openMenu.includes(item.key))
      
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
          cb={(e: MenuOnClickParams, closeAll = false) => {
            if (item.key == null || !clickable) {
              return
            }
            if (!item.children) {
              clickEvent?.(e)
            }
            if (closeAll && !item.children) {
              setCloseAll(true)
              return
            }
            setCloseAll(false)
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
  }, [items, openMenu])

  return node
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
  const [closeAll, setCloseAll] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const render = (
    items: MenuItem[],
    depth = 1,
    keyPath: string[] = [],
    clickable = true,
  ) => {
    return (
      <MenuGroup
        setCloseAll={setCloseAll}
        inlineCollapsed={inlineCollapsed}
        setActiveKey={setActiveKey}
        uniqueOpen={inlineCollapsed || uniqueOpen}
        items={items}
        depth={depth}
        clickEvent={onClick}
        render={render}
        mode={mode}
        keyPath={keyPath}
        clickable={clickable}
      />
    )
  }
  const style: React.CSSProperties = {
    width: restProps?.style?.width,
  }
  if (inlineCollapsed) {
    style.width = 48
  }

  const shouldListenWindows = inlineCollapsed || mode === 'horizontal'

  function handleCloseAll(e: MouseEvent) {
    const current = ref.current
    if (!current || !e.target) {
      return
    }
    if (!current.contains(e.target as Node)) {
      setCloseAll(true)
    }
  }

  useEffect(() => {
    if (shouldListenWindows) {
      window.addEventListener('click', handleCloseAll)
    }
    return () => {
      shouldListenWindows && window.removeEventListener('click', handleCloseAll)
    }
  }, [ref])
  const node = useMemo(() => {
    return render(items)
  }, [items, activeKey])
  return (
    <ActiveKeyContext.Provider value={activeKey}>
      <VisibleContext.Provider value={closeAll}>
        <div
          ref={ref}
          className={clsx(className, menuCls, {
            [horizontalCls]: mode === 'horizontal',
          })}
          {...restProps}
          style={style}
        >
          {node}
        </div>
      </VisibleContext.Provider>
    </ActiveKeyContext.Provider>
  )
}

export default Menu

export type { MenuItem, MenuProps } from './types'
