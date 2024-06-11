/**
 * @order 2
 * @description 通过 size 属性控制大小
 * @title 大小
 */
import { Link, Space } from '@plumbiu/ui'

export default function Demo() {
  return (
    <Space>
      <Link size="sm">Link</Link>
      <Link size="md">Link</Link>
      <Link size="lg">Link</Link>
    </Space>
  )
}
