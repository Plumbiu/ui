/**
 * @description 标签大小
 * @title 大小
 */
import { TSize, Tag } from '@plumbiu/ui'

export default function Demo() {
  const sizes: TSize[] = ['sm', 'md', 'lg']
  return (
    <div className="tag-demo">
      {sizes.map((size) => (
        <Tag key={size} size={size}>
          {size} Tag
        </Tag>
      ))}
    </div>
  )
}
