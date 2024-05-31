/**
 * @order 1
 * @description 切换暗色和亮色主题
 * @title 基本
 */
import { Button, Tag, useToggleTheme, Divider, Input, Alert } from '@plumbiu/ui'

export default function Demo() {
  const [toggle, isDark] = useToggleTheme()
  const prefix = isDark ? 'Dark' : 'Light'
  const colors = ['primary', 'success', 'warning', 'danger', 'info']

  return (
    <div style={{ backgroundColor: isDark ? '#000' : '#fff', padding: 24 }}>
      <Button type="primary" onClick={toggle}>
        切换主题
      </Button>
      <Divider />
      <Tag>{prefix} Tag</Tag>
      <Divider type="vertical" />
      <Input placeholder={`${prefix} Input`} />
      <Divider />
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      >
        {colors.map((color) => (
          <Alert key={color} color={color}>
            {prefix} Alert
          </Alert>
        ))}
      </div>
    </div>
  )
}
