/**
 * @order 1
 * @description 基本间距
 * @title 基本
 */

import { Button, Space } from '@plumbiu/ui'

export default function Basic() {
  return (
    <Space>
      <Button>Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button borderless>Borderless Button</Button>
    </Space>
  )
}
