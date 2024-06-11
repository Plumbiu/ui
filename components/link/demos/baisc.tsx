/**
 * @order 1
 * @description 基本链接
 * @title 基本
 */
import { Link, Space } from '@plumbiu/ui'

export default function Demo() {
  return (
    <Space>
      <Link>Link</Link>
      <Link color="success">Link</Link>
      <Link color="warning">Link</Link>
      <Link color="danger">Link</Link>
      <Link disabled>Link</Link>
    </Space>
  )
}
