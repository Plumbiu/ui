/**
 * @order 1
 * @description 基本选择器
 * @title 基本
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
        disabled
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
