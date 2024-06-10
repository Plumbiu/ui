/**
 * @order 2
 * @description 基本选择器
 * @title duoxuan
 */

import { Select } from '@plumbiu/ui'

export default function Demo() {
  const handleChange = (value: number) => {
    console.log(value)
  }
  return (
    <div>
      <Select
        mode="multiple"
        defaultValue={[0]}
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
          {
            label: 'test',
            value: 3,
          },
        ]}
      />
    </div>
  )
}
