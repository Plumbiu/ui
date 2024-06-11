/**
 * @order 3
 * @description Select 选择器有上下两种弹出位置
 * @title 弹出位置
 */

import { Select, Space } from '@plumbiu/ui'

export default function Demo() {
  const handleChange = (value: number) => {
    console.log(value)
  }
  return (
    <Space>
      <Select
        defaultValue={0}
        placement="top"
        onChange={handleChange}
        options={[
          {
            label: 'foo',
            value: 0,
          },
          {
            label: 'bar',
            value: 1,
          },
          {
            label: 'baz',
            value: 2,
          },
        ]}
      />
      <Select
        allowClear
        defaultValue={0}
        onChange={handleChange}
        options={[
          {
            label: 'foo',
            value: 0,
          },
          {
            label: 'bar',
            value: 1,
          },
          {
            label: 'baz',
            value: 2,
          },
        ]}
      />
    </Space>
  )
}
