/**
 * @order 1
 * @description 基本选择器
 * @title 基本
 */

import { Select } from '@plumbiu/ui'

export default function Demo() {
  return (
    <div>
      <Select
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
