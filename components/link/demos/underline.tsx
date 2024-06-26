/**
 * @order 3
 * @description 通过 underline 属性控制下划线是否显示
 * @title 大小
 */
import { Link, Space } from '@plumbiu/ui'

export default function Demo() {
  return (
    <Space>
      <Link underline={false}>Link</Link>
      <Link underline>Link</Link>
    </Space>
  )
}
