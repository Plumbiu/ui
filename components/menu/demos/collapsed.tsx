/**
 * @order 4
 * @description 菜单收起
 * @title 折叠菜单
 */
import React, { useState } from 'react'
import { type MenuItem, Menu, Button } from '@plumbiu/ui'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons'

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
  { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
]

const App: React.FC = () => {
  const [inlineCollapsed, setInlineCollapsed] = useState(true)
  return (
    <>
      <Button onClick={() => setInlineCollapsed(!inlineCollapsed)}>点击</Button>
      <Menu
        inlineCollapsed={inlineCollapsed}
        onClick={(e) => console.log(e)}
        style={{ width: 250 }}
        items={items}
      />
    </>
  )
}

export default App
