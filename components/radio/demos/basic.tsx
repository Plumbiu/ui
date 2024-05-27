/**
 * @order 1
 * @description 基本多选框
 * @title 基本
 */
import { Radio } from '@plumbiu/ui'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Radio />
      {/* <Radio checked /> */}
      <Radio checked={false} />
      <Radio disabled />
      <Radio checked disabled />
    </div>
  )
}
