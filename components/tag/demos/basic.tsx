/**
 * @description 基本标签
 * @title 基本
 */
import { Space, TBaseColor, Tag } from '@plumbiu/ui'

export default function Demo() {
  const colors: TBaseColor[] = [
    'primary',
    'success',
    'warning',
    'danger',
    'info',
  ]
  return (
    <Space>
      {colors.map((color) => (
        <Tag key={color} color={color}>
          {color}
        </Tag>
      ))}
      <br />
      {colors.map((color) => (
        <Tag fill key={color} color={color}>
          {color}
        </Tag>
      ))}
    </Space>
  )
}
