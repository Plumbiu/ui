import { clsx } from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MenuItemType, MenuProps } from './types'
import { horizontalCls, menuCls } from './styles'
import MenuItem from './MenuItem'
import { MenuContext } from './context'

const Menu: React.FC<MenuProps> = ({
  items,
  className,
  mode = 'inline',
  onClick,
  inlineCollapsed = false,
  defaultOpenKeys,
  ...restProps
}) => {
  const [activeKey, setActiveKey] = useState<string>()
  const ref = useRef<HTMLDivElement>(null)
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys || [])

  const render = (
    items: MenuItemType[] | undefined,
    depth = 1,
    keyPath: string[] = [],
    clickable = true,
  ) => {
    if (!items) {
      return null
    }
    const node = items.map((item) => {
      const newKeyPath =
        item.key && item.type === undefined ? [...keyPath, item.key] : keyPath
      const children =
        inlineCollapsed && !item.children && depth === 1
          ? render([item], depth + 1, keyPath, false)
          : render(
              item.children,
              item.type === undefined ? depth + 1 : depth,
              newKeyPath,
            )
      return (
        <MenuItem
          item={item}
          depth={depth}
          mode={mode}
          keyPath={keyPath}
          onClick={onClick}
          clickable={clickable}
        >
          {children}
        </MenuItem>
      )
    })

    return node
  }

  const node = useMemo(() => {
    return render(items)
  }, [items])

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
      setOpenKeys([])
    }
  }

  useEffect(() => {
    if (shouldListenWindows) {
      window.addEventListener('click', handleCloseAll)
    }
    return () => {
      shouldListenWindows && window.removeEventListener('click', handleCloseAll)
    }
  }, [])

  return (
    <MenuContext.Provider
      value={{
        openKeys,
        setActiveKey,
        activeKey,
        setOpenKeys,
        inlineCollapsed,
      }}
    >
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
    </MenuContext.Provider>
  )
}

export default Menu

export type { MenuItemType as MenuItem, MenuProps } from './types'
