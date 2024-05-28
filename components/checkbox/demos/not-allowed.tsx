/**
 * @order 2
 * @description 禁用状态
 * @title 不可用
 */
import { Checkbox } from '@plumbiu/ui'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Checkbox disabled />
      <Checkbox indeterminate disabled />
      <Checkbox checked disabled />
    </div>
  )
}
