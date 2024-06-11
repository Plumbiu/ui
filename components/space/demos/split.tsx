/**
 * @order 2
 * @description 指定分隔符
 * @title 分隔符
 */

import { Divider, Link, Space } from '@plumbiu/ui'

export default function Basic() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Link>Link</Link>
      <Link>Link</Link>
      <Link>Link</Link>
    </Space>
  )
}
