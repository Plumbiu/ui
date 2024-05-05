/**
 * @description 基本标签
 * @title 基本
 */
import { TBaseColor, Tag } from '@plumbiu/ui'

export default function Demo() {
  const colors: TBaseColor[] = [
    'primary',
    'success',
    'warning',
    'danger',
    'info',
  ]
  return (
    <div className="tag-demo">
      {colors.map((color) => (
        <Tag key={color} color={color}>
          {color}
        </Tag>
      ))}
      <br />
      {colors.map((color) => (
        <Tag fill={true} key={color} color={color}>
          {color}
        </Tag>
      ))}
    </div>
  )
}
