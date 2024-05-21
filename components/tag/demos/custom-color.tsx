/**
 * @description 传递 hex 颜色值，@plumbiu/ui 会自动计算背景色等颜色
 * @title 自定义颜色
 */
import { Tag } from '@plumbiu/ui'

export default function Demo() {
  const colors = ['#f20', '#3450fe', '#9898a1', '#eff324'] as const
  return (
    <div className="tag-demo">
      {colors.map((color) => (
        <Tag key={color} color={color} fill>
          {color}
        </Tag>
      ))}
      <br />
      {colors.map((color) => (
        <Tag key={color} color={color}>
          {color}
        </Tag>
      ))}
    </div>
  )
}
