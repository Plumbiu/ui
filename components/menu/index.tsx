import { clsx } from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MenuItemType, MenuProps } from './types'
import { horizontalCls, menuCls } from './styles'
import MenuItem from './MenuItem'
import { ActiveKeyContext, VisibleContext } from './context'

const Menu: React.FC<MenuProps> = ({
  items,
  className,
  mode = 'inline',
  onClick,
  inlineCollapsed = false,
  ...restProps
}) => {
  const [activeKey, setActiveKey] = useState<string>()
  const [closeAll, setCloseAll] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
      let param = item.children
      if (inlineCollapsed && !item.children && depth === 1) {
        param = [item]
      }
      const children =
        inlineCollapsed && !item.children && depth === 1
          ? render(param, depth + 1, keyPath, false)
          : render(
              param,
              item.type === undefined ? depth + 1 : depth,
              newKeyPath,
            )
      return (
        <MenuItem
          inlineCollapsed={inlineCollapsed}
          item={item}
          depth={depth}
          mode={mode}
          keyPath={keyPath}
          onClick={onClick}
          clickable={clickable}
          setActiveKey={setActiveKey}
          setCloseAll={setCloseAll}
        >
          {children}
        </MenuItem>
      )
    })

    return node
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
  }, [])
  const node = useMemo(() => {
    return render(items)
  }, [items])
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

export type { MenuItemType as MenuItem, MenuProps } from './types'
