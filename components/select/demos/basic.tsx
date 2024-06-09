/**
 * @order 1
 * @description 基本选择器
 * @title 基本
 */

import { Select } from '@plumbiu/ui'

export default function Demo() {
  const handleChange = (value: number) => {
    console.log(value)
  }
  return (
    <div>
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
      <br />
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
      <br />
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
    </div>
  )
}
